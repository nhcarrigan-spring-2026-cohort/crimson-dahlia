from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User
from extensions import db

users_bp = Blueprint("users", __name__)

@users_bp.post('/register')
def register():
    data = request.get_json()

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'Email already exists'}), 400
    
    new_user = User(email=data['email'])
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@users_bp.post('/login')
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({'msg': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify(access_token=access_token), 200


@users_bp.get('/')
def get_all_users():
    users = User.query.all()

    return jsonify([user.to_dict() for user in users])

@users_bp.get('/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)

    return jsonify(user.to_dict())

@users_bp.delete('/<user_id>')
@jwt_required()
def delete_user(user_id):
    logged_in_user_id = get_jwt_identity()

    if user_id != logged_in_user_id:
        return jsonify({'msg': 'Only users can delete themselves'})
    
    user = User.query.get_or_404(user_id)
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({'msg': 'User successfully deleted'})

@users_bp.put('/<user_id>')
@jwt_required()
def update_user(user_id):
    logged_in_user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    if(logged_in_user_id != user_id):
        return jsonify({'msg': 'only user can update their profile'})

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']

    db.session.commit()

    return jsonify(user.to_dict())