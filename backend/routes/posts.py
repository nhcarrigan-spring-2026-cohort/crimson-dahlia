from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Post

posts_bp = Blueprint("posts", __name__, url_prefix="/posts")
posts_bp.strict_slashes = False

@posts_bp.get("/")
def list_posts():
    posts = Post.query.all()

    return jsonify([post.to_dict() for post in posts])

@posts_bp.post("/")
@jwt_required()
def create_post():
    user_id = get_jwt_identity()

    data = request.get_json()

    new_post = Post(
        author_user_id=user_id,
        title=data['title'],
        zipcode=data['zipcode'],
        description=data['description'],
        tags=data.get('tags', []),
      )

    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

@posts_bp.get('/area/<zipcode>')
def list_posts_in_area(zipcode):
    posts = Post.query.filter_by(zipcode=zipcode).all()

    return jsonify([post.to_dict() for post in posts])

@posts_bp.get('/<int:post_id>')
def get_post(post_id):
    post = Post.query.get_or_404(post_id)

    return jsonify(post.to_dict())

@posts_bp.delete('/<int:post_id>')
@jwt_required()
def delete_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get_or_404(post_id)

    if str(post.author_user_id) != user_id:
      return jsonify({'msg': 'only author can delete this post'})

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted'})

@posts_bp.put('/<int:post_id>')
@jwt_required()
def update_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get_or_404(post_id)
    data = request.get_json()

    if str(post.author_user_id) != user_id:
      return jsonify({'msg': 'only author can update this post'})

    if 'title' in data:
        post.title = data['title']
    if 'description' in data:
        post.description = data['description']
    if 'zipcode' in data:
        post.zipcode = data['zipcode']
    if 'tags' in data:
        post.tags = data['tags']

    db.session.commit()

    return jsonify(post.to_dict())

@posts_bp.post('/<int:post_id>/accept')
@jwt_required()
def accept_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get_or_404(post_id)

    if user_id == str(post.author_user_id):
        return jsonify({"msg": "user cannot accept their own post"})

    post.accept(user_id)
    db.session.commit()

    return jsonify(post.to_dict())

@posts_bp.post('/<int:post_id>/complete')
@jwt_required()
def mark_post_complete(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get_or_404(post_id)

    if str(post.author_user_id) != user_id:
      return jsonify({'msg': 'only author can mark post as completed'})

    post.mark_complete()
    db.session.commit()

    return jsonify(post.to_dict())
