# from flask import Flask, Response, request
# from flask_cors import CORS
# import cv2
# import numpy as np
# from deepface import DeepFace
# import base64

# app = Flask(__name__)
# CORS(app)

# # Load DEEPFACE model
# model = DeepFace.build_model('Emotion')

# # Define emotion labels
# emotion_labels = ['You are angry', 'disgust', 'fear', 'You are happy', 'You are sad', 'You are surprise', 'neutral']

# def generate_frames():
#     cap = cv2.VideoCapture(0)
#     while True:
#         ret, frame = cap.read()
        
#         if not ret:
#             break
        
#         resized_frame = cv2.resize(frame, (48, 48), interpolation=cv2.INTER_AREA)
#         gray_frame = cv2.cvtColor(resized_frame, cv2.COLOR_BGR2GRAY)
        
#         img = gray_frame.astype('float32') / 255.0
#         img = np.expand_dims(img, axis=-1)
#         img = np.expand_dims(img, axis=0)
        
#         preds = model.predict(img)
#         emotion_idx = np.argmax(preds)
#         emotion = emotion_labels[emotion_idx]
        
#         cv2.rectangle(frame, (0, 0), (200, 30), (0, 0, 0), -1)
#         cv2.putText(frame, emotion, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        
#         ret, buffer = cv2.imencode('.jpg', frame)
#         frame = buffer.tobytes()
        
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# @app.route('/video_feed', methods=['POST'])
# def video_feed():
#     image_base64 = request.json.get('image')
    
#     image_data = base64.b64decode(image_base64)
#     image_array = np.frombuffer(image_data, dtype=np.uint8)
#     image = cv2.imdecode(image_array, flags=cv2.IMREAD_COLOR)
    
#     resized_frame = cv2.resize(image, (48, 48), interpolation=cv2.INTER_AREA)
#     gray_frame = cv2.cvtColor(resized_frame, cv2.COLOR_BGR2GRAY)
    
#     img = gray_frame.astype('float32') / 255.0
#     img = np.expand_dims(img, axis=-1)
#     img = np.expand_dims(img, axis=0)
    
#     preds = model.predict(img)
#     emotion_idx = np.argmax(preds)
#     emotion = emotion_labels[emotion_idx]
    
#     cv2.rectangle(image, (0, 0), (200, 30), (0, 0, 0), -1)
#     cv2.putText(image, emotion, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
    
#     ret, buffer = cv2.imencode('.jpg', image)
#     frame = buffer.tobytes()
    
#     return Response(frame, mimetype='image/jpeg')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, request, Response
from flask_cors import CORS
import cv2
import numpy as np
from deepface import DeepFace
import base64

app = Flask(__name__)
CORS(app)

# Load DEEPFACE model
model = DeepFace.build_model('Emotion')

# Define emotion labels
emotion_labels = ['You are angry', 'disgust', 'fear', 'You are happy', 'You are sad', 'surprise', 'neutral']

@app.route('/video_feed', methods=['POST'])
def video_feed():
    try:
        image_base64 = request.json.get('image')
        image_data = base64.b64decode(image_base64)
        image_array = np.frombuffer(image_data, dtype=np.uint8)
        image = cv2.imdecode(image_array, flags=cv2.IMREAD_COLOR)

        resized_frame = cv2.resize(image, (48, 48), interpolation=cv2.INTER_AREA)
        gray_frame = cv2.cvtColor(resized_frame, cv2.COLOR_BGR2GRAY)

        img = gray_frame.astype('float32') / 255.0
        img = np.expand_dims(img, axis=-1)
        img = np.expand_dims(img, axis=0)

        preds = model.predict(img)
        emotion_idx = np.argmax(preds)
        emotion = emotion_labels[emotion_idx]

        response = Response(emotion)
        response.headers['x-emotion'] = emotion  # Include the detected emotion in response headers

        return response

    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
