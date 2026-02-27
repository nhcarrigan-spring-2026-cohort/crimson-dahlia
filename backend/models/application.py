from extensions import db
from datetime import datetime, timezone


class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    applicant_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String(20), default="pending")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    post = db.relationship("Post", backref="applications")
    applicant = db.relationship("User", backref="applications")

    def to_dict(self):
        return {
            "id": self.id,
            "task_id": self.task_id,
            "applicant_id": self.applicant_id,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<Application {self.id} - Post {self.task_id} by User {self.applicant_id}>"
