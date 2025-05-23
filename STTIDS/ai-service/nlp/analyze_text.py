from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text", "")
    
    labels = ["terrorism", "violence", "explosives", "weapons", "safe"]
    result = classifier(text, candidate_labels=labels)
    
    return jsonify({
        "text": text,
        "labels": result["labels"],
        "scores": result["scores"],
        "is_suspicious": result["labels"][0] != "safe"
    })

if __name__ == "__main__":
    app.run(port=5001)
