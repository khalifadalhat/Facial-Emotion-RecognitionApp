from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from deepface import DeepFace

app = Flask(__name__)
CORS(app)

@app.route('/video_feed', methods=['POST'])
def video_feed():
    try:
        if not request.json or 'image' not in request.json:
            return jsonify({'error': 'No image provided'}), 400

        image_base64 = request.json.get('image')
        if not image_base64 or not isinstance(image_base64, str):
            return jsonify({'error': 'Invalid image data'}), 400

        try:
            # Decode base64 image
            image_data = base64.b64decode(image_base64.split(',')[-1])
            image_array = np.frombuffer(image_data, dtype=np.uint8)
            image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

            if image is None:
                return jsonify({'error': 'Could not decode image'}), 400

            # Analyze emotion using DeepFace
            result = DeepFace.analyze(img_path=image, actions=['emotion'], enforce_detection=False)

            # Extract top emotion
            emotion = result[0]['dominant_emotion']

            return jsonify({'emotion': emotion}), 200

        except Exception as e:
            return jsonify({'error': f'Error processing image: {str(e)}'}), 400

    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
