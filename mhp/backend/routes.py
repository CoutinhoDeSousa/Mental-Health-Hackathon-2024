import json
import os

from flask import Blueprint, jsonify, request
from func import calculate_score, decrypt_qr_data, get_qr_code, get_recommendation

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

        score = calculate_score(result_string)
        results = get_recommendation(score, questionnaire_id)
        results["qr_code"] = get_qr_code(questionnaire_id, result_string)
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
        score = calculate_score(result_string)
        results = get_recommendation(score, questionnaire_id)
        results["qr_code"] = get_qr_code(questionnaire_id, result_string)
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500
