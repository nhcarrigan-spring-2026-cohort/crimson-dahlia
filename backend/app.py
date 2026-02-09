"""
Community Aid Flask Application
Main application entry point
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize SQLAlchemy
db = SQLAlchemy()


def create_app(config=None):
    """
    Application factory pattern for Flask app.
    
    Args:
        config: Optional configuration dictionary
        
    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__)
    
    # Default configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = config.get('SQLALCHEMY_DATABASE_URI', 'sqlite:///community_aid.db') if config else 'sqlite:///community_aid.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Apply additional config if provided
    if config:
        app.config.update(config)
    
    # Initialize extensions
    db.init_app(app)
    
    # Import models to register them with SQLAlchemy
    with app.app_context():
        from models import User, Task
        
        # Create tables
        db.create_all()
    
    # Register blueprints/routes
    register_routes(app)
    
    return app


def register_routes(app):
    """Register application routes."""
    from flask import jsonify, request
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint."""
        return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()})
    
    @app.route('/api/users', methods=['GET', 'POST'])
    def users():
        """User endpoints."""
        from models import User
        
        if request.method == 'GET':
            users = User.query.all()
            return jsonify([{
                'id': u.id,
                'name': u.name,
                'email': u.email,
                'zipcode': u.zipcode,
                'created_at': u.created_at.isoformat()
            } for u in users])
        
        elif request.method == 'POST':
            data = request.get_json()
            user = User(
                name=data['name'],
                email=data['email'],
                zipcode=data['zipcode']
            )
            db.session.add(user)
            db.session.commit()
            return jsonify({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'zipcode': user.zipcode,
                'created_at': user.created_at.isoformat()
            }), 201
    
    @app.route('/api/tasks', methods=['GET', 'POST'])
    def tasks():
        """Task endpoints."""
        from models import Task
        
        if request.method == 'GET':
            tasks = Task.query.all()
            return jsonify([{
                'id': t.id,
                'title': t.title,
                'description': t.description,
                'zipcode': t.zipcode,
                'status': t.status,
                'creator_id': t.creator_id,
                'helper_id': t.helper_id,
                'created_at': t.created_at.isoformat(),
                'updated_at': t.updated_at.isoformat()
            } for t in tasks])
        
        elif request.method == 'POST':
            data = request.get_json()
            task = Task(
                title=data['title'],
                description=data.get('description'),
                zipcode=data['zipcode'],
                creator_id=data['creator_id']
            )
            db.session.add(task)
            db.session.commit()
            return jsonify({
                'id': task.id,
                'title': task.title,
                'description': task.description,
                'zipcode': task.zipcode,
                'status': task.status,
                'creator_id': task.creator_id,
                'helper_id': task.helper_id,
                'created_at': task.created_at.isoformat(),
                'updated_at': task.updated_at.isoformat()
            }), 201
    
    @app.route('/api/tasks/<int:task_id>/accept', methods=['POST'])
    def accept_task(task_id):
        """Accept a task endpoint."""
        from models import Task
        
        data = request.get_json()
        user_id = data.get('user_id')
        
        task = Task.query.get_or_404(task_id)
        
        try:
            task.accept_task(user_id)
            db.session.commit()
            return jsonify({
                'id': task.id,
                'status': task.status,
                'helper_id': task.helper_id,
                'updated_at': task.updated_at.isoformat()
            })
        except ValueError as e:
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/tasks/<int:task_id>/complete', methods=['POST'])
    def complete_task(task_id):
        """Complete a task endpoint."""
        from models import Task
        
        data = request.get_json()
        user_id = data.get('user_id')
        
        task = Task.query.get_or_404(task_id)
        
        try:
            task.complete_task(user_id)
            db.session.commit()
            return jsonify({
                'id': task.id,
                'status': task.status,
                'updated_at': task.updated_at.isoformat()
            })
        except ValueError as e:
            return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
