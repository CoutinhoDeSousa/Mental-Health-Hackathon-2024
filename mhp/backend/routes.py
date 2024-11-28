import io
import json
import os

from flask import Blueprint, jsonify, request, send_file
from func import decrypt_qr_data, get_qr_code, get_results_with_qr

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


@routes.route("/results")
def get_results():
    """Route für gefilterte Ergebnisse"""
    try:
        questionnaire_id = request.args.get("questionnaire_id")
        result_string = request.args.get("result_string")

        if not questionnaire_id or not result_string:
            with open("data/result.json", "r") as file:
                result_data = json.load(file)
            return jsonify(result_data)

        results = get_results_with_qr(questionnaire_id, result_string)
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@routes.route("/qr")
def get_qr_results():
    """Route für QR-Code Ergebnisse"""
    try:
        encrypted_data = request.args.get("data")

        if not encrypted_data:
            return jsonify({"error": "Missing data parameter"}), 400

        questionnaire_id, result_string = decrypt_qr_data(encrypted_data)
        results = get_results_with_qr(questionnaire_id, result_string)
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
