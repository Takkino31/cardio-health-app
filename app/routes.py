from flask import Blueprint, request, jsonify, render_template
import cv2
import numpy as np
from .utils import calculate_heart_rate

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/process_video', methods=['POST'])
def process_video():
    file = request.files['video']
    video_data = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(video_data, cv2.IMREAD_COLOR)

    heart_rate = calculate_heart_rate(image)
    return jsonify({'heart_rate': heart_rate})
