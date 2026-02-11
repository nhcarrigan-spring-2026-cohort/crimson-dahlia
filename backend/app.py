from flask import Flask
from extensions import  db, migrate
from routes.users import users_bp
from routes.tasks import tasks_bp

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate.init_app(app, db)

from models import User

app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(tasks_bp, url_prefix="/tasks")

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(debug=True)