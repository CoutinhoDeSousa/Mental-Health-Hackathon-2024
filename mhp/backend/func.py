import json
import zlib
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
    Verschlüsselt und komprimiert die JSON-Daten für QR-Code

    Args:
        data: JSON-String mit Fragebogendaten
    """
    # Komprimiere die Daten
    compressed = zlib.compress(data.encode())
    # Verschlüssele die komprimierten Daten
    encrypted_data = cipher_suite.encrypt(compressed)
    return b64encode(encrypted_data).decode()


def decrypt_qr_data(encrypted_data: str) -> str:
    """
    Entschlüsselt und dekomprimiert die QR-Code-Daten

    Args:
        encrypted_data: Verschlüsselter String aus QR-Code
    """
    try:
        decoded_data = b64decode(encrypted_data.encode())
        decrypted_data = cipher_suite.decrypt(decoded_data)
        # Dekomprimiere die Daten
        decompressed = zlib.decompress(decrypted_data)
        return decompressed.decode()
    except Exception as e:
        raise ValueError(f"Ungültige verschlüsselte Daten: {str(e)}")


def generate_qr_code(data: str) -> bytes:
    """
    Generiert einen QR-Code aus dem übergebenen String und gibt ihn als Bytes zurück
    """
    qr = qrcode.QRCode(
        version=None,  # Automatische Version-Auswahl
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)  # Passt die Version automatisch an die Datenmenge an

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


def get_results_with_qr(questionnaire_data: list, base_url: str) -> dict:
    """
    Verarbeitet mehrere Fragebögen und erstellt eine Gesamtauswertung mit QR-Code-URL

    Args:
        questionnaire_data: Liste der Fragebogendaten
        base_url: Basis-URL des Servers
    """
    with open("data/result_.json", "r") as file:
        all_results = json.load(file)

    results = {"questionnaires": []}

    for item in questionnaire_data:
        questionnaire_id = item["questionnaire_id"].split("_")[0]
        result_string = item["result_string"]

        result = next(
            (r for r in all_results if r["questionnaire"] == questionnaire_id), None
        )
        if result:
            score = calculate_score(result_string)
            result_copy = {
                "category": result["category"],
                "questionnaire": result["questionnaire"],
                "score": score,
                "ranges": [
                    {"label": r["label"], "range": r["range"]} for r in result["ranges"]
                ],
            }

            for range_item in result["ranges"]:
                if range_item["range"][0] <= score <= range_item["range"][1]:
                    result_copy["current_range"] = range_item
                    break

            results["questionnaires"].append(result_copy)

    # Generiere die URL für den QR-Code mit der übergebenen Basis-URL
    encrypted_data = encrypt_qr_data(json.dumps(questionnaire_data))
    qr_code_url = f"{base_url}/create_qr?data={encrypted_data}"
    results["qr_code_url"] = qr_code_url

    return results
