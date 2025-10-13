# app.py
from flask import Flask
from flask_cors import CORS
from flask_session import Session
from db import db
from routes.auth import auth_bp
from routes.rewards import rewards_bp
from routes.profile import profile_bp
import os

def create_app():
    app = Flask(__name__)
    # Update these for your environment
    app.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY", "change-me-in-prod")
    app.config.update(
        SESSION_COOKIE_SAMESITE="None",   # allow cross-site cookies
        SESSION_COOKIE_SECURE=False,      # set True if using https
    )

    app.config["SESSION_TYPE"] = "filesystem"  
    app.config["SESSION_PERMANENT"] = False  
    Session(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:hellooviya@localhost:5432/dotlearn"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # CORS: allow frontend origin, and enable credentials so session cookie is sent
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": ["http://localhost:3000"]}})

    db.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(rewards_bp, url_prefix="/api")
    app.register_blueprint(profile_bp, url_prefix="/api")


    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
