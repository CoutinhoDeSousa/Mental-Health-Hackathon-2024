import json
import os

from flask import Blueprint, jsonify, request
from func import get_filtered_results

routes = Blueprint("routes", __name__)


@routes.route("/questionnaire/<id>")
def get_questionnaire(id):
    """Route für Fragenbogen abrufen"""
    try:
        file_path = f"data/questionsheet/{id}.json"

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
            return (
                jsonify(
                    {
                        "error": "Missing parameters",
                        "message": "Both questionnaire_id and result_string are required",
                    }
                ),
                400,
            )

        results = get_filtered_results(questionnaire_id, result_string)
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500
