# routes/profile.py
from flask import Blueprint, jsonify, request, session
from db import db
from models import User

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/profile", methods=["GET"])
def get_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "username": user.username,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "phone_no": user.phone_no,
        "year": user.year,
        "department": user.department
    })

@profile_bp.route("/profile", methods=["PUT"])
def update_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401
    
    data = request.json
    user = User.query.get(user_id)

    user.firstname = data.get("firstname", user.firstname)
    user.lastname = data.get("lastname", user.lastname)
    user.email = data.get("email", user.email)
    user.phone_no = data.get("phone_no", user.phone_no)

    db.session.commit()

    return jsonify({"message": "Profile updated successfully!"})
