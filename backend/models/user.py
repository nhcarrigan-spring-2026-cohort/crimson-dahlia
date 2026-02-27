from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False)
    hash = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(500), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    zipcode = db.Column(db.String(10), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    skills = db.Column(db.JSON, nullable=True, default=list)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def set_password(self, password):
        self.hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "bio": self.bio,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "skills": self.skills or [],
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }