from flask import Blueprint, jsonify, request, current_app as app
from extensions import db
from models import Reward, Badge
import jwt
from functools import wraps

rewards_bp = Blueprint("rewards", __name__)

# JWT decorator to get current user
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]  # Bearer <token>
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data["user_id"]
        except:
            return jsonify({"message": "Token is invalid!"}), 401
        return f(current_user_id, *args, **kwargs)
    return decorated

# Rewards route
@rewards_bp.route("/", methods=["GET"])
@token_required
def get_rewards(current_user_id):
    reward = Reward.query.filter_by(user_id=current_user_id).first()
    if not reward:
        return jsonify({"points": 0, "badges_count": 0, "badges": []})

    # Determine earned badges
    badges = Badge.query.all()
    earned = [b.badge_name for b in badges if reward.points >= b.badge_points]

    return jsonify({
        "points": reward.points,
        "badges_count": reward.badges_count,
        "badges": earned
    }), 200
