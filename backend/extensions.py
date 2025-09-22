# extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Create a single db instance to be shared across the app
db = SQLAlchemy()
bcrypt = Bcrypt()