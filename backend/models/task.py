from app import db
from datetime import datetime

class Task(db.Model):
    __tablename__="tasks"

    id = db.Column(db.interger, primary_key=True)
    

    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)

    zipcode = db.Column(db.String(10), nullable=False)

    status = db.Column(db.String(20), default="open")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    accepted_by_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    creator = db.relationship("User,foreign_keys=[creator_id]")
    accepted_by = db.relationship("User,foreign_keys=[accpeted_by_id]")

    
    def accept(self, user_id):
        """
        Accept a task if it is currently open.
        """
        if self.status != "open":
            raise ValueError("Task cannot be accepted unless it is open.")

        self.accepted_by_id = user_id
        self.status = "in_progress"

    def mark_complete(self):
        """
        Mark a task as completed if it is in progress.
        """
        if self.status != "in_progress":
            raise ValueError("Only tasks in progress can be completed.")

        self.status = "completed"

    

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "zipcode": self.zipcode,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "creator_id": self.creator_id,
            "accepted_by_id": self.accepted_by_id,
        }

    

    def __repr__(self):
        return f"<Task {self.id} - {self.title} ({self.status})>"

    

 
