from flask import Blueprint, request, jsonify, render_template
import cv2
import numpy as np
import os
import json

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/login')
def login():
    return render_template('login.html')

@bp.route('/register')
def register():
    return render_template('register.html')

@bp.route('/nutrition')
def nutrition():
    return render_template('nutrition.html')

@bp.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@bp.route('/video_capture')
def video_capture():
    return render_template('video_capture.html')

@bp.route('/process_video', methods=['POST'])
def process_video():
    file = request.files['video']
    video_path = os.path.join('instance', 'temp_video.webm')
    file.save(video_path)

    # Traitement vidéo avec OpenCV
    heart_rate = calculate_heart_rate(video_path)

    # Supprimer la vidéo temporaire
    os.remove(video_path)

    return jsonify({'heart_rate': heart_rate})

def calculate_heart_rate(video_path):
    # Logique simplifiée pour calculer la fréquence cardiaque
    cap = cv2.VideoCapture(video_path)

    # Place your video processing logic here
    # This is just a placeholder logic
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame_count += 1
        # Add your signal processing and heart rate calculation logic here

    cap.release()
    return 70  # valeur de fréquence cardiaque simulée
