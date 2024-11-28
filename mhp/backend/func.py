import json
import os


def get_filtered_results(questionnaire_id, result_string):
    """Filtert Ergebnisse nach Fragebogen ID und Ergebnisstring"""
    try:
        file_path = f"data/results/{questionnaire_id}.json"

        if not os.path.exists(file_path):
            return {
                "error": "Results not found",
                "message": "No results found for questionnaire ID",
            }

        with open(file_path, "r") as file:
            results = json.load(file)

        filtered_results = [
            result for result in results if result["result_string"] == result_string
        ]
        return filtered_results

    except Exception as e:
        return {"error": "Internal server error", "message": str(e)}
