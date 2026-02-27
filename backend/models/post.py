from extensions import db
from datetime import datetime, timezone


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    author_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    helper_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    tags = db.Column(db.JSON, nullable=True, default=list)
    zipcode = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(20), default="open")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    author = db.relationship("User", foreign_keys=[author_user_id])
    helper = db.relationship("User", foreign_keys=[helper_user_id])

    def accept(self, user_id):
        """Accept a post if it is currently open."""
        if self.status != "open":
            raise ValueError("Post cannot be accepted unless it is open.")
        self.helper_user_id = user_id
        self.status = "in_progress"

    def mark_complete(self):
        """Mark a post as completed if it is in progress."""
        if self.status != "in_progress":
            raise ValueError("Only posts in progress can be completed.")
        self.status = "completed"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "zipcode": self.zipcode,
            "status": self.status,
            "tags": self.tags or [],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "author_user_id": self.author_user_id,
            "helper_user_id": self.helper_user_id,
        }

    def __repr__(self):
        return f"<Post {self.id} - {self.title} ({self.status})>"
