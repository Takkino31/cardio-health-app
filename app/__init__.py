from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../instance/config.py')

    from . import routes
    app.register_blueprint(routes.bp)

    return app
