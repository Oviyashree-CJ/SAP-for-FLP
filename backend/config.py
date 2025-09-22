import os

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:hellooviya@localhost:5432/dotlearn"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    JWT_SECRET_KEY = "12supersecretkey49"
