from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import base64
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

model = YOLO("yolov8n.pt")  # or yolov8s.pt / yolov8m.pt based on your setup

@app.route("/detect", methods=["POST"])
def detect_objects():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    image_bytes = file.read()
    npimg = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    results = model(img)[0]

    # Extract detected objects
    detected_objects = []
    for box in results.boxes:
        cls_id = int(box.cls[0])
        label = model.names[cls_id]
        confidence = float(box.conf[0])
        detected_objects.append({
            "label": label,
            "confidence": round(confidence, 2)
        })

    # Draw bounding boxes on the image
    annotated_img = results.plot()  # draws boxes and labels

    # Encode image to base64
    _, buffer = cv2.imencode('.jpg', annotated_img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        "objects": detected_objects,
        "image": img_base64
    })

if __name__ == "__main__":
    app.run(port=5002, debug=True)





# # detect_image.py
# from flask import Flask, request, jsonify
# import os

# app = Flask(__name__)
# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# def fake_detect(image_path):
#     return {
#         "image": os.path.basename(image_path),
#         "objects": [
#             {"name": "car", "confidence": 0.91},
#             {"name": "person", "confidence": 0.87}
#         ]
#     }

# @app.route('/detect', methods=['POST'])
# def detect():
#     print(">>> /detect called")

#     if 'file' not in request.files:
#         print(">>> No file found in request.files")
#         return jsonify({'error': 'No file provided'}), 400

#     file = request.files['file']
#     print(f">>> Received file: {file.filename}")

#     try:
#         path = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(path)
#         print(f">>> Saved to: {path}")

#         result = fake_detect(path)
#         os.remove(path)
#         print(">>> File processed and deleted")

#         return jsonify(result)
#     except Exception as e:
#         print(">>> Exception occurred:", str(e))
#         return jsonify({'error': str(e)}), 500


# if __name__ == '__main__':
#     app.run(port=5001, debug=True)
