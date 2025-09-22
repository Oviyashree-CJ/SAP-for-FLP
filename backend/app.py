from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager

# After initializing app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, support_credentials=True)

# Init extensions
db.init_app(app)

# ✅ Initialize JWT
jwt = JWTManager(app)

# Import models
from models import User, Badge, Reward, Progress, Summary

# Import routes
from routes.auth import auth_bp
from routes.progress import progress_bp
from routes.rewards import rewards_bp
#from routes.summaries import summaries_bp
#from routes.chatbot import chatbot_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(progress_bp, url_prefix="/api/progress")
app.register_blueprint(rewards_bp, url_prefix="/api/rewards")
#app.register_blueprint(summaries_bp, url_prefix="/api/summaries")
#app.register_blueprint(chatbot_bp, url_prefix="/api/chatbot")


if __name__ == "__main__":
    app.run(debug=True, host="localhost")
