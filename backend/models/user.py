"""
User Model
Represents a user in the Community Aid system.
"""
from datetime import datetime
from backend.app import db


class User(db.Model):
    """
    User model for Community Aid platform.
    
    A user can create tasks (requesting help) and accept tasks (offering help).
    """
    __tablename__ = 'users'
    
    # Fields
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    zipcode = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    created_tasks = db.relationship(
        'Task',
        foreign_keys='Task.creator_id',
        backref='creator',
        lazy=True,
        cascade='all, delete-orphan'
    )
    
    accepted_tasks = db.relationship(
        'Task',
        foreign_keys='Task.helper_id',
        backref='helper',
        lazy=True
    )
    
    def __repr__(self):
        """String representation of User."""
        return f'<User {self.id}: {self.name} ({self.email})>'
    
    def to_dict(self):
        """
        Convert user to dictionary representation.
        
        Returns:
            dict: User data as dictionary
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'zipcode': self.zipcode,
            'created_at': self.created_at.isoformat(),
            'created_tasks_count': len(self.created_tasks),
            'accepted_tasks_count': len(self.accepted_tasks)
        }
