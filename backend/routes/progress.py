from flask import Blueprint, request, jsonify
from datetime import date
from extensions import db
from models import Progress, User, Reward, Badge

progress_bp = Blueprint("progress", __name__)

def calculate_points(total_minutes, unique_subjects):
    # Time-based points
    if total_minutes < 30:
        time_points = 0
    elif total_minutes < 60:
        time_points = 10
    elif total_minutes < 120:
        time_points = 25
    elif total_minutes < 240:
        time_points = 50
    else:
        time_points = 100

    # Subject variety points
    if unique_subjects == 1:
        subject_points = 5
    elif unique_subjects == 2:
        subject_points = 15
    elif unique_subjects == 3:
        subject_points = 30
    else:
        subject_points = 50 if unique_subjects >= 4 else 0

    return time_points + subject_points


@progress_bp.route("/save_progress", methods=["POST"])
def save_progress():
    data = request.get_json()
    user_id = data.get("user_id")
    timespent = data.get("timespent", 0)  # in minutes
    subjects = data.get("subjects", [])   # list of subjects studied today

    if not user_id or timespent <= 0:
        return jsonify({"error": "Invalid input"}), 400

    today = date.today()
    unique_subjects = len(set(subjects))

    try:
        # ✅ Get or create today's progress
        progress = Progress.query.filter_by(user_id=user_id, date=today).first()
        if progress:
            progress.timespent += timespent
            progress.points = calculate_points(progress.timespent, unique_subjects)
        else:
            progress = Progress(
                user_id=user_id,
                date=today,
                timespent=timespent,
                points=calculate_points(timespent, unique_subjects)
            )
            db.session.add(progress)

        db.session.flush()

        # ✅ Update max_spent in user table
        user = User.query.get(user_id)
        if progress.timespent > user.max_spent:
            user.max_spent = progress.timespent

        # ✅ Update rewards (cumulative points)
        reward = Reward.query.filter_by(user_id=user_id).first()
        if not reward:
            reward = Reward(user_id=user_id, points=progress.points)
            db.session.add(reward)
        else:
            reward.points += progress.points

        db.session.commit()

        return jsonify({
            "message": "Progress saved",
            "user_id": user_id,
            "date": str(today),
            "timespent_today": progress.timespent,
            "unique_subjects": unique_subjects,
            "points_today": progress.points,
            "max_spent": user.max_spent,
            "total_points": reward.points
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
