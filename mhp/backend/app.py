from flask import Flask
from flask_cors import CORS
from routes import routes

app = Flask(__name__)
app.register_blueprint(routes)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def root():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
