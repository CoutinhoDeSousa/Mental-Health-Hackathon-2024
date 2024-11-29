FROM python:3.11-slim

WORKDIR /app

# Kopiere requirements.txt
COPY requirements.txt .

# Installiere Python-Abhängigkeiten
RUN pip install --no-cache-dir -r requirements.txt

# Kopiere den gesamten Backend-Code
COPY . .

EXPOSE 5000

# Starte die Flask-App
CMD ["python", "app.py"]