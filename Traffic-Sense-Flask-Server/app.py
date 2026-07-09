from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image

app = Flask(__name__)
modelObjectDetection = YOLO('models/object-detection.pt')

@app.route('/sense-images', methods=['POST'])
def process_image():
    try:
        uploaded_file = request.files['file']

        if uploaded_file and uploaded_file.filename.endswith(('.jpg', '.jpeg', '.png', '.bmp')):
            
            image = Image.open(uploaded_file)
            image = image.convert('RGB')  
            result = modelObjectDetection.predict(image, conf=0.02)[0]
            detected = len(result)

            response = {
                'message': 'Image processed successfully',
                'detected_objects': detected
            }

            return jsonify(response), 200
        else:
            return jsonify({'error': 'Unsupported image format'}), 400

    except Exception as e:
        response = {
            'error': str(e)
        }
        return jsonify(response), 400
