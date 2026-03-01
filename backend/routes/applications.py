from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Application

apps_bp = Blueprint('applications', __name__, url_prefix='/applications')
apps_bp.strict_slashes = False

@apps_bp.get('/')
def list_all_apps():
  apps = Application.query.all()

  return jsonify([app.to_dict() for app in apps])

@apps_bp.get('/task/<int:task_id>')
def list_task_apps(task_id):
  apps = Application.query.filter_by(task_id=task_id).all()

  return jsonify([app.to_dict() for app in apps])

@apps_bp.get('/applicant/<int:applicant_id>')
def list_applicant_apps(applicant_id):
  apps = Application.query.filter_by(applicant_id=applicant_id).all()

  return jsonify([app.to_dict() for app in apps])

@apps_bp.get('/<int:application_id>')
def get_app(application_id):
  app = Application.query.get_or_404(application_id)
  
  return jsonify(app.to_dict())

@apps_bp.delete('/<int:application_id>')
@jwt_required()
def delete_app(application_id):
  user_id = get_jwt_identity()
  app = Application.query.get_or_404(application_id)

  if str(app.applicant_id) != user_id:
    return jsonify({'msg': 'only applicant can delete this application'})
  
  db.session.delete(app)
  db.session.commit()

  return jsonify({'message': 'Application deleted'})

@apps_bp.put('/<int:application_id>')
def change_app_status(application_id):
  data = request.get_json()

  app = Application.query.get_or_404(application_id)

  app.status = data['status']

  db.session.commit()

  return jsonify(app.to_dict())

@apps_bp.post('/apply')
@jwt_required()
def create_app():
  user_id = get_jwt_identity()

  data = request.get_json()

  new_application = Application(
    applicant_id = user_id,
    task_id = data['task_id']
  )

  db.session.add(new_application)
  db.session.commit()

  return jsonify(new_application.to_dict()), 201
