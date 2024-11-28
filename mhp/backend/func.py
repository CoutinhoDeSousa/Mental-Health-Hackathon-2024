import json
from base64 import b64decode, b64encode
from io import BytesIO

import qrcode
from cryptography.fernet import Fernet

# Fester 32-Byte Base64-kodierter Schlüssel
ENCRYPTION_KEY = b"vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3KL5BLyHY5M8="
cipher_suite = Fernet(ENCRYPTION_KEY)


def calculate_score(result_string: str) -> int:
    """
    Berechnet den Score aus dem Ergebnis-String
    """
    scores = [int(char) for char in result_string if char.isdigit()]
    return sum(scores)


def get_recommendation(score, questionnaire, result_file="data/result.json"):
    with open(result_file, "r") as file:
        data = json.load(file)

    for entry in data[questionnaire]:
        start, end = map(int, entry["range"].split("-"))
        if start <= score <= end:
            return {
                "description": entry["description"],
                "recommendation": entry["recommendation"],
            }


def encrypt_qr_data(data: str) -> str:
    """
    Verschlüsselt die JSON-Daten für QR-Code

    Args:
        data: JSON-String mit Fragebogendaten
    """
    encrypted_data = cipher_suite.encrypt(data.encode())
    return b64encode(encrypted_data).decode()


def decrypt_qr_data(encrypted_data: str) -> str:
    """
    Entschlüsselt die QR-Code-Daten und gibt JSON-String zurück

    Args:
        encrypted_data: Verschlüsselter String aus QR-Code
    """
    try:
        decoded_data = b64decode(encrypted_data.encode())
        decrypted_data = cipher_suite.decrypt(decoded_data).decode()
        return decrypted_data
    except Exception as e:
        raise ValueError(f"Ungültige verschlüsselte Daten: {str(e)}")


def generate_qr_code(data: str) -> bytes:
    """
    Generiert einen QR-Code aus dem übergebenen String und gibt ihn als Bytes zurück
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img_buffer = BytesIO()
    img.save(img_buffer, format="PNG")
    return img_buffer.getvalue()


def get_qr_code(data: str) -> bytes:
    """
    Generiert einen QR-Code aus den JSON-Daten

    Args:
        data: JSON-String mit Fragebogendaten
    """
    encrypted_data = encrypt_qr_data(data)
    return generate_qr_code(encrypted_data)


def get_results_with_qr(questionnaire_data: list) -> dict:
    """
    Verarbeitet mehrere Fragebögen und erstellt eine Gesamtauswertung mit QR-Code

    Args:
        questionnaire_data: Liste von Dictionaries mit questionnaire_id und result_string
        [{"questionnaire_id": "GAD-7", "result_string": "1234"}, ...]
    """
    with open("data/result_.json", "r") as file:
        all_results = json.load(file)

    results = {"questionnaires": []}

    for item in questionnaire_data:
        questionnaire_id = item["questionnaire_id"].split("_")[0]
        result_string = item["result_string"]

        # Finde den passenden Fragebogen
        result = next(
            (r for r in all_results if r["questionnaire"] == questionnaire_id), None
        )
        if result:
            score = calculate_score(result_string)
            result_copy = result.copy()
            result_copy["score"] = score

            # Finde die passende Empfehlung
            for range_item in result_copy["ranges"]:
                if range_item["range"][0] <= score <= range_item["range"][1]:
                    result_copy["current_range"] = range_item
                    break

            results["questionnaires"].append(result_copy)

    # Erstelle einen einzigen QR-Code für alle Ergebnisse
    encoded_data = encrypt_qr_data(json.dumps(questionnaire_data))
    results["qr_code"] = encoded_data

    return results
