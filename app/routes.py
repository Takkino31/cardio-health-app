from flask import Blueprint, render_template

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
