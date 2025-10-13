# routes/auth.py
from flask import Blueprint, request, jsonify, session, current_app
from datetime import datetime
from db import db
from models import User, Progress, Reward
from sqlalchemy import func

auth_bp = Blueprint("auth", __name__)

def update_user_max_spent(user):
    """
    Calculate the max daily total timespent for the user using the progress table
    and update user.max_spent accordingly.
    """
    # Sum timespent per date and get the maximum among them for this user
    # It's equivalent to: SELECT date, SUM(timespent) FROM progress WHERE user_id = X GROUP BY date
    # then take the max of the summed times.
    daily_sums = (
        db.session.query(Progress.date, func.sum(Progress.timespent).label("daily_total"))
        .filter(Progress.user_id == user.user_id)
        .group_by(Progress.date)
        .all()
    )
    if not daily_sums:
        return

    max_total = max([row.daily_total for row in daily_sums]) if daily_sums else 0
    if user.max_spent is None or max_total > user.max_spent:
        user.max_spent = int(max_total)
        db.session.commit()

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if not data:
        return jsonify({"message": "No input provided"}), 400

    # Required fields check
    required_fields = ["firstname", "lastname", "email", "phone_no",
                       "year", "department", "username", "password"]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"{field} is required"}), 400

    # Check if username already exists
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"message": "Username already taken"}), 400

    # Check if email already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already registered"}), 400

    # Create new user
    new_user = User(
        username=data["username"],
        password=data["password"],
        firstname=data["firstname"],
        lastname=data["lastname"],
        email=data["email"],
        phone_no=data["phone_no"],
        year=int(data["year"]),
        department=data["department"],
        login="no",
        datetime=datetime.utcnow(),
        max_spent=0
    )

    db.session.add(new_user)
    db.session.commit()

    # Initialize rewards row for this user
    reward = Reward(user_id=new_user.user_id, points=0, badges_count=0)
    db.session.add(reward)
    db.session.commit()

    return jsonify({"message": "Signup successful", "user_id": new_user.user_id}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required."}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials."}), 401

    # set session
    session["user_id"] = user.user_id

    # update login status and datetime
    user.login = "yes"
    user.datetime = datetime.utcnow()
    db.session.commit()

    # Update max_spent using progress table
    try:
        update_user_max_spent(user)
    except Exception as e:
        current_app.logger.error("Failed to update max_spent: %s", e)

    return jsonify({
        "message": "Login successful!",
        "user_id": user.user_id
    }), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "No user logged in"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # update user status
    user.login = "no"
    user.datetime = datetime.utcnow()  # store logout time
    db.session.commit()

    # clear session
    session.clear()

    return jsonify({"success": True, "message": "Logout successful"})


@auth_bp.route("/me", methods=["GET"])
def me():
    uid = session.get("user_id")
    if not uid:
        return jsonify({"authenticated": False}), 200

    user = User.query.get(uid)
    if not user:
        return jsonify({"authenticated": False}), 200

    # Return the fields you want on frontend
    return jsonify({
        "authenticated": True,
        "user": {
            "user_id": user.user_id,
            "username": user.username,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            "year": user.year,
            "department": user.department,
            "datetime": user.datetime.isoformat() if user.datetime else None,
            "max_spent": user.max_spent or 0,
            "login": user.login
        }
    }), 200
