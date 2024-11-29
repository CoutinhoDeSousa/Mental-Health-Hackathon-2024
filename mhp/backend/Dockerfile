FROM python:3.11-slim

WORKDIR /app

# Systemabhängigkeiten installieren
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Kopiere requirements.txt
COPY requirements.txt .

# Installiere Python-Abhängigkeiten
RUN pip install --no-cache-dir -r requirements.txt

# Erstelle Verzeichnisse
RUN mkdir -p /app/data/results

# Kopiere den gesamten Backend-Code
COPY . .

EXPOSE 5000

# Starte die Flask-App
CMD ["python", "app.py"]