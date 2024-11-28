import json


def calculate_score(result_string):
    scores = [int(char) for char in result_string if char.isdigit()]
    return sum(scores)


def get_recommendation(score, questionnaire, result_file="result.json"):
    with open(result_file, "r") as file:
        data = json.load(file)

    for entry in data[questionnaire]:
        start, end = map(int, entry["range"].split("-"))
        if start <= score <= end:
            return {
                "description": entry["description"],
                "recommendation": entry["recommendation"],
            }
