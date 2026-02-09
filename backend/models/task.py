"""
Task Model
Represents a task/help request in the Community Aid system.
"""
from datetime import datetime
from backend.app import db


class Task(db.Model):
    """
    Task model for Community Aid platform.
    
    Represents a help request that goes through a lifecycle:
    available → in_progress → completed
    """
    __tablename__ = 'tasks'
    
    # Valid status values
    STATUS_AVAILABLE = 'available'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_COMPLETED = 'completed'
    
    VALID_STATUSES = {STATUS_AVAILABLE, STATUS_IN_PROGRESS, STATUS_COMPLETED}
    
    # Fields
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    zipcode = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(20), nullable=False, default=STATUS_AVAILABLE)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    helper_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        """String representation of Task."""
        return f'<Task {self.id}: {self.title} ({self.status})>'
    
    def __init__(self, **kwargs):
        """
        Initialize task with validation.
        
        Raises:
            ValueError: If status is not valid
        """
        super(Task, self).__init__(**kwargs)
        
        # Validate status if provided
        if 'status' in kwargs and kwargs['status'] not in self.VALID_STATUSES:
            raise ValueError(f"Invalid status. Must be one of: {', '.join(self.VALID_STATUSES)}")
    
    def can_accept(self, user_id):
        """
        Check if a user can accept this task.
        
        Args:
            user_id: ID of the user attempting to accept
            
        Returns:
            bool: True if user can accept the task
        """
        return (
            self.status == self.STATUS_AVAILABLE and
            self.creator_id != user_id and
            self.helper_id is None
        )
    
    def accept_task(self, user_id):
        """
        Accept a task and assign it to a helper.
        
        Args:
            user_id: ID of the user accepting the task
            
        Raises:
            ValueError: If task cannot be accepted
        """
        if not self.can_accept(user_id):
            if self.status != self.STATUS_AVAILABLE:
                raise ValueError(f"Task cannot be accepted. Current status: {self.status}")
            elif self.creator_id == user_id:
                raise ValueError("Creator cannot accept their own task")
            elif self.helper_id is not None:
                raise ValueError("Task already has a helper assigned")
            else:
                raise ValueError("Task cannot be accepted")
        
        self.helper_id = user_id
        self.status = self.STATUS_IN_PROGRESS
        self.updated_at = datetime.utcnow()
    
    def can_complete(self, user_id):
        """
        Check if a user can complete this task.
        
        Args:
            user_id: ID of the user attempting to complete
            
        Returns:
            bool: True if user can complete the task
        """
        return (
            self.status == self.STATUS_IN_PROGRESS and
            (self.creator_id == user_id or self.helper_id == user_id)
        )
    
    def complete_task(self, user_id):
        """
        Mark a task as completed.
        
        Args:
            user_id: ID of the user completing the task
            
        Raises:
            ValueError: If task cannot be completed
        """
        if not self.can_complete(user_id):
            if self.status != self.STATUS_IN_PROGRESS:
                raise ValueError(f"Task cannot be completed. Current status: {self.status}")
            elif self.creator_id != user_id and self.helper_id != user_id:
                raise ValueError("Only the creator or assigned helper can complete the task")
            else:
                raise ValueError("Task cannot be completed")
        
        self.status = self.STATUS_COMPLETED
        self.updated_at = datetime.utcnow()
    
    def to_dict(self):
        """
        Convert task to dictionary representation.
        
        Returns:
            dict: Task data as dictionary
        """
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'zipcode': self.zipcode,
            'status': self.status,
            'creator_id': self.creator_id,
            'helper_id': self.helper_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
