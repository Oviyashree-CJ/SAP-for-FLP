from datetime import datetime
from extensions import db

def today():
    return datetime.utcnow().date()

class User(db.Model):
    __tablename__ = "users"
    
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # store hashed
    login = db.Column(db.String(3), default="No")  # Yes/No
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    phone_no = db.Column(db.String(15))
    email = db.Column(db.String(120), unique=True)
    year = db.Column(db.Integer)
    department = db.Column(db.String(100))
    datetime = db.Column(db.DateTime, default=datetime.utcnow)
    max_spent = db.Column(db.Integer, default=0)

    progress = db.relationship("Progress", backref="user", lazy=True)
    rewards = db.relationship("Reward", backref="user", lazy=True)
    summaries = db.relationship("Summary", backref="user", lazy=True)


class Badge(db.Model):
    __tablename__ = "badges"
    
    badge_name = db.Column(db.String(50), primary_key=True)
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
    date = db.Column(db.Date, default=today)
    timespent = db.Column(db.Integer, default=0)  # in minutes


class Summary(db.Model):
    __tablename__ = "summary"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    summary_name = db.Column(db.String(100), nullable=False)
    locked = db.Column(db.String(3), default="Yes")  # Yes/No
    saved = db.Column(db.String(3), default="No")    # Yes/No
    year = db.Column(db.Integer)
