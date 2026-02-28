from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User
from extensions import db

users_bp = Blueprint("users", __name__)

# Register a new user with username, email, and password. Returns the created user object.
@users_bp.post('/register')
def register():
    data = request.get_json()

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'Email already exists'}), 400
    
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

# Log in a user with email and password. Returns a JWT access token if successful.
@users_bp.post('/login')
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({'msg': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify(access_token=access_token), 200

# Get the currently logged in user's profile. Requires a valid JWT access token. (Important for the frontend to display user info and for authentication)
@users_bp.get('/me')
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

# Get a list of all users. This is a public endpoint that does not require authentication. (Useful for displaying a list of users)
@users_bp.get('/')
def get_all_users():
    users = User.query.all()

    return jsonify([user.to_dict() for user in users])

# Get a specific user by their ID. This is a public endpoint that does not require authentication. (Useful for displaying user profiles)
@users_bp.get('/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)

    return jsonify(user.to_dict())

# Delete a user by their ID. Requires a valid JWT access token and the user can only delete themselves. (Important for allowing users to delete their accounts - a data privacy requirement for most apps)
@users_bp.delete('/<user_id>')
@jwt_required()
def delete_user(user_id):
    logged_in_user_id = get_jwt_identity()

    if str(user_id) != logged_in_user_id:
        return jsonify({'msg': 'Only users can delete themselves'})
    
    user = User.query.get_or_404(user_id)
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({'msg': 'User successfully deleted'})

# Update a user's profile by their ID. Requires a valid JWT access token and the user can only update themselves. (Important for allowing users to update their profiles)
@users_bp.put('/<user_id>')
@jwt_required()
def update_user(user_id):
    logged_in_user_id = get_jwt_identity()

    if(logged_in_user_id != str(user_id)):
        return jsonify({'msg': 'only user can update their profile'})

    user = User.query.get_or_404(user_id)
    data = request.get_json()

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'bio' in data:
        user.bio = data['bio']
    if 'city' in data:
        user.city = data['city']
    if 'state' in data:
        user.state = data['state']
    if 'zipcode' in data:
        user.zipcode = data['zipcode']
    if 'skills' in data:
        user.skills = data['skills']

    db.session.commit()

    return jsonify(user.to_dict())