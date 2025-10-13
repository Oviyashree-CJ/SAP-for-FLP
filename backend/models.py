from datetime import date
from db import db
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import event


class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    login = db.Column(db.String(3), nullable=False, default="no")  
    firstname = db.Column(db.String(120))
    lastname = db.Column(db.String(120))
    phone_no = db.Column(db.String(30))
    email = db.Column(db.String(150))
    year = db.Column(db.Integer)
    department = db.Column(db.String(120))
    datetime = db.Column(db.DateTime)  # last login datetime
    max_spent = db.Column(db.Integer, default=0)  # maximum minutes per day till date

    rewards = db.relationship("Reward", backref="user", lazy=True, uselist=False)
    progress = db.relationship("Progress", backref="user", lazy=True)
    summaries = db.relationship("Summary", backref="user", lazy=True)

    def check_password(self, password_plain: str) -> bool:
        return self.password == password_plain


class Badge(db.Model):
    __tablename__ = "badges"
    id = db.Column(db.Integer, primary_key=True)
    badge_name = db.Column(db.String(50), unique=True, nullable=False)
    badge_points = db.Column(db.Integer, nullable=False)


class Reward(db.Model):
    __tablename__ = "rewards"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    points = db.Column(db.Integer, default=0)
    badges_count = db.Column(db.Integer, default=0)


class Progress(db.Model):
    __tablename__ = "progress"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    points = db.Column(db.Integer, default=0)
    date = db.Column(db.Date, nullable=False)  # date of login/session
    timespent = db.Column(db.Integer, default=0)  # minutes spent that day/session

class Summary(db.Model):
    __tablename__ = "summary"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    summary_name = db.Column(db.String(200), nullable=False)
    locked = db.Column(db.String(3), nullable=False, default="yes")  # "yes"/"no"
    saved = db.Column(db.String(3), nullable=False, default="no")    # "yes"/"no"
    year = db.Column(db.Integer, nullable=True)
