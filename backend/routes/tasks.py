from flask import Blueprint, request, jsonify
from extensions import db
from models import Task

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.get("/")
def list_tasks():
    tasks = Task.query.all()

    return jsonify([task.to_dict() for task in tasks])

@tasks_bp.post("/")
def create_task():
    # need authentication to get user id
    # user_id = 
    data = request.get_json()

    new_task = Task(
        #creator_id=user_id
        title=data['title'],
        zipcode=data['zipcode'],
        description=data['description'],
      )
    
    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_dict()), 201

@tasks_bp.get('/area/<zipcode>')
def list_tasks_in_area(zipcode):
    tasks = Task.query.filter_by(zipcode=zipcode).all()

    return jsonify([task.to_dict() for task in tasks])

@tasks_bp.get('/<int:task_id>')
def get_task(task_id):
    task = Task.query.get_or_404(task_id)

    return jsonify(task.to_dict())

@tasks_bp.delete('/<int:task_id>')
def delete_task(task_id):
    #need auth
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()

    return jsonify({'message': 'Task deleted'})

@tasks_bp.put('/<int:task_id>')
def update_task(task_id):
    #need auth to check if logged in user created task
    task = Task.query.get_or_404(task_id)
    data = request.get_json()

    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'zipcode' in data:
        task.zipcode = data['zipcode']

    db.session.commit()

    return jsonify(task.to_dict())

@tasks_bp.post('/<int:task_id>/accept')
def accept_task(task_id):
    # Need authentication to complete this properly
    task =  Task.query.get_or_404(task_id)
    task.status = 'in_progress'
    db.session.commit()

    return jsonify(task.to_dict())

@tasks_bp.post('/<int:task_id>/complete')
def mark_task_complete(task_id):
    #need auth
    task = Task.query.get_or_404(task_id)

    task.mark_complete()
    db.session.commit()

    return jsonify(task.to_dict())


