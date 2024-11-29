import io
import json
import os
from base64 import b64decode

from flask import Blueprint, jsonify, request, send_file
from func import decrypt_qr_data, encrypt_qr_data, get_qr_code, get_results_with_qr

routes = Blueprint("routes", __name__)


@routes.route("/questionnaire/<id>")
def get_questionnaire(id):
    """Route für Fragenbogen abrufen"""
    try:
        file_path = f"data/questionnaire/{id}.json"

        if not os.path.exists(file_path):
            return (
                jsonify(
                    {
                        "error": "Questionnaire not found",
                        "message": f"No questionnaire found for ID {id}",
                    }
                ),
                404,
            )

        with open(file_path, "r") as file:
            questionnaire_data = json.load(file)
            return jsonify(questionnaire_data)

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@routes.route("/results", methods=["POST", "GET"])
def handle_results():
    """Route für Fragebogen-Auswertungen und gespeicherte Ergebnisse"""
    try:
        base_url = request.host_url.rstrip("/")  # Entfernt trailing slash

        if request.method == "GET":
            save_id = request.args.get("save_id")
            if not save_id:
                return jsonify({"error": "Missing save_id parameter"}), 400

            file_path = f"data/results/{save_id}.txt"
            print(f"Trying to read from: {file_path}")

            if not os.path.exists(file_path):
                return (
                    jsonify(
                        {
                            "error": "Result not found",
                            "message": f"No result found for ID {save_id}",
                        }
                    ),
                    404,
                )

            with open(file_path, "r") as f:
                result = json.load(f)

            # QR-Code als PNG generieren
            if "qr_code" in result:
                qr_code = get_qr_code(result["qr_code"])  # Direkt den String verwenden
                return send_file(
                    io.BytesIO(qr_code),
                    mimetype="image/png",
                    as_attachment=True,
                    download_name=f"{save_id}_qr.png",
                )
            else:
                return jsonify({"error": "No QR code found in result"}), 404

        # POST Request für neue Auswertungen
        data = request.get_json()
        if not data or not isinstance(data, list):
            return jsonify({"error": "Invalid input format"}), 400

        results = get_results_with_qr(data, base_url)

        # Wenn query parameter vorhanden, speichere Ergebnis
        save_id = request.args.get("save_id")
        if save_id:
            print(f"Saving results for ID: {save_id}")

            try:
                os.makedirs("data/results", exist_ok=True)
                file_path = f"data/results/{save_id}.txt"
                print(f"Writing to: {file_path}")

                with open(file_path, "w") as f:
                    json.dump(results, f)
                print(f"Successfully saved to {file_path}")

            except Exception as e:
                print(f"Error saving file: {str(e)}")
                return (
                    jsonify(
                        {
                            "error": "Save failed",
                            "message": f"Could not save results: {str(e)}",
                        }
                    ),
                    500,
                )

        # Bei POST immer das JSON zurückgeben
        return jsonify(results)

    except Exception as e:
        print(f"General error: {str(e)}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@routes.route("/results/list", methods=["GET"])
def list_saved_results():
    """Route für Liste aller gespeicherten Ergebnisse"""
    try:
        results_dir = "data/results"
        if not os.path.exists(results_dir):
            return jsonify([])

        # Liste alle JSON-Dateien und entferne die .json Endung
        saved_ids = [
            f.replace(".txt", "") for f in os.listdir(results_dir) if f.endswith(".txt")
        ]

        return jsonify(saved_ids)

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@routes.route("/qr")
def get_qr_results():
    """Route für QR-Code Ergebnisse"""
    try:
        encrypted_data = request.args.get("data")
        if not encrypted_data:
            return jsonify({"error": "Missing data parameter"}), 400

        base_url = request.host_url.rstrip("/")  # Entfernt trailing slash

        # Entschlüssele die Daten
        decrypted_data = decrypt_qr_data(encrypted_data)
        questionnaire_data = json.loads(decrypted_data)

        # Verwende die gleiche Funktion wie bei der normalen Auswertung
        results = get_results_with_qr(questionnaire_data, base_url)

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@routes.route("/create_qr")
def create_qr_code():
    """Route für QR-Code erstellen"""
    try:
        data = request.args.get("data")

        if not data:
            return jsonify({"error": "Missing data parameter"}), 400

        qr_code = get_qr_code(data)

        return send_file(io.BytesIO(qr_code), mimetype="image/png")

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500
