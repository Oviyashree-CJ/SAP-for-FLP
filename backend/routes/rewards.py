# routes/rewards.py
from flask import Blueprint, jsonify, session
from db import db
from models import Reward, User

rewards_bp = Blueprint("api", __name__)

@rewards_bp.route("/rewards", methods=["GET"])
def get_rewards():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    reward = Reward.query.filter_by(user_id=user_id).first()
    if not reward:
        # create a record if none exists
        reward = Reward(user_id=user_id, points=0)
        db.session.add(reward)
        db.session.commit()

    return jsonify({"points": reward.points})
