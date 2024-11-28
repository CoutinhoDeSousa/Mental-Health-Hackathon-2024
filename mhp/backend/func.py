import json
import os
from base64 import b64decode, b64encode
from io import BytesIO

import qrcode
from cryptography.fernet import Fernet

ENCRYPTION_KEY = os.getenv(
    "ENCRYPTION_KEY", Fernet(b"abcdefghijklmnopqrstuvwxyz123456")
)
cipher_suite = Fernet(ENCRYPTION_KEY)


def calculate_score(result_string):
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


def encrypt_qr_data(questionnaire_id: str, result_string: str) -> str:
    """
    Verschlüsselt questionnaire_id und result_string für QR-Code
    """
    data = f"{questionnaire_id}:{result_string}"
    encrypted_data = cipher_suite.encrypt(data.encode())
    return b64encode(encrypted_data).decode()


def decrypt_qr_data(encrypted_data: str) -> tuple[str, str]:
    """
    Entschlüsselt die QR-Code-Daten und gibt questionnaire_id und result_string zurück
    """
    try:
        decoded_data = b64decode(encrypted_data.encode())
        decrypted_data = cipher_suite.decrypt(decoded_data).decode()
        questionnaire_id, result_string = decrypted_data.split(":")
        return questionnaire_id, result_string
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


def get_qr_code(questionnaire_id: str, result_string: str) -> bytes:
    """
    Generiert einen QR-Code aus questionnaire_id und result_string und gibt ihn als Bytes zurück
    """
    return generate_qr_code(encrypt_qr_data(questionnaire_id, result_string))


def get_results_with_qr(questionnaire_id: str, result_string: str) -> dict:
    """
    Berechnet Score, holt Empfehlungen und fügt QR-Code hinzu

    Args:
        questionnaire_id: ID des Fragebogens
        result_string: String mit den Antworten

    Returns:
        dict: Ergebnisse mit Score, Empfehlungen und QR-Code
    """
    score = calculate_score(result_string)
    results = get_recommendation(score, questionnaire_id)
    results["qr_code"] = get_qr_code(questionnaire_id, result_string)
    results["score"] = score
    return results
