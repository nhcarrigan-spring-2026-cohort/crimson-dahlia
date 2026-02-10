"""
Models package initialization.
Imports all models for convenient access and SQLAlchemy registration.
"""
from backend.app import db
from .user import User
from .task import Task

__all__ = ['db', 'User', 'Task']
