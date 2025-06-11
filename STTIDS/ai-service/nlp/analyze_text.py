from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    input_text = data.get('text', '')

    # Simulated labels for demonstration
    possible_labels = ['phishing', 'malware', 'spam', 'safe']

    # Dummy logic to simulate model prediction
    if not input_text.strip():
        return jsonify({'error': 'Empty input'}), 400

    random_scores = [round(random.uniform(0.1, 1.0), 2) for _ in possible_labels]
    is_suspicious = random_scores[0] > 0.6 or random_scores[1] > 0.6 or random_scores[2] > 0.6  # if any threat is high

    return jsonify({
        'is_suspicious': is_suspicious,
        'labels': possible_labels,
        'scores': random_scores
    })

if __name__ == '__main__':
    app.run(port=5001)
