# detect_image.py
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def fake_detect(image_path):
    return {
        "image": os.path.basename(image_path),
        "objects": [
            {"name": "car", "confidence": 0.91},
            {"name": "person", "confidence": 0.87}
        ]
    }

@app.route('/detect', methods=['POST'])
def detect():
    print(">>> /detect called")

    if 'file' not in request.files:
        print(">>> No file found in request.files")
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    print(f">>> Received file: {file.filename}")

    try:
        path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)
        print(f">>> Saved to: {path}")

        result = fake_detect(path)
        os.remove(path)
        print(">>> File processed and deleted")

        return jsonify(result)
    except Exception as e:
        print(">>> Exception occurred:", str(e))
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)
