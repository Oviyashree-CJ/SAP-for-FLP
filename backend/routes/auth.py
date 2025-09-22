from flask import Blueprint, request, jsonify, session
from extensions import db, bcrypt
from models import User
from datetime import datetime
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# --- REGISTER ---
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"error": "Username or email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        login="no",
        firstname=data.get("firstname", ""),
        lastname=data.get("lastname", ""),
        phone_no=data.get("phone_no", ""),
        year=data.get("year"),
        department=data.get("department", ""),
        datetime=None,
        max_spent=0.0
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# --- LOGIN ---
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(username=data["username"]).first()

    if user and bcrypt.check_password_hash(user.password, data["password"]):
        user.login = "yes"
        user.datetime = datetime.now()
        db.session.commit()

        # Create JWT token
        access_token = create_access_token(identity=user.user_id)
        session['user_id'] = user.id
        return jsonify({
            "access_token": access_token,
            "user_id": user.user_id,
            "message": "Login successful!"
        }), 200
    

    return jsonify({"message": "Invalid credentials"}), 401


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    user.login = "no"
    db.session.commit()
    return jsonify({"success": True, "message": "Logout successful"}), 200

# --- RESET PASSWORD ---
@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    username = data.get("username")
    new_password = data.get("new_password")

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


# --- PROFILE ---
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "username": user.username,
        "email": user.email,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "phone_no": user.phone_no
    }), 200


# --- UPDATE PROFILE ---
@auth_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    user.firstname = data.get("firstname", user.firstname)
    user.lastname = data.get("lastname", user.lastname)
    user.email = data.get("email", user.email)
    user.phone_no = data.get("phone_no", user.phone_no)

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200
