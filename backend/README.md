# Community Aid Backend

Backend data layer for the FreeCodeCamp Spring 2026 Community Aid project (crimson-dahlia).

## Tech Stack

- **Flask** - Web framework
- **Flask-SQLAlchemy** - ORM for database operations
- **SQLite** - Default database (configurable)

## Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## Database Models

### User Model
- **Table**: `users`
- **Fields**:
  - `id` - Primary key
  - `name` - User's full name (required)
  - `email` - Unique email address (required)
  - `zipcode` - Postal code as string (required)
  - `created_at` - Account creation timestamp
- **Relationships**:
  - `created_tasks` - Tasks created by this user
  - `accepted_tasks` - Tasks accepted/helped by this user

### Task Model
- **Table**: `tasks`
- **Fields**:
  - `id` - Primary key
  - `title` - Task title (required)
  - `description` - Detailed description (optional)
  - `zipcode` - Location postal code (required)
  - `status` - Current status (default: "available")
  - `creator_id` - Foreign key to User who created task
  - `helper_id` - Foreign key to User who accepted task (nullable)
  - `created_at` - Task creation timestamp
  - `updated_at` - Last update timestamp (auto-updates)

## Task Lifecycle

Tasks follow a strict lifecycle with three states:

1. **available** - Task is open and can be accepted
2. **in_progress** - Task has been accepted by a helper
3. **completed** - Task has been finished

### Business Rules

#### Accepting Tasks (`accept_task`)
A task can be accepted if:
- Status is "available"
- User is NOT the creator
- No helper is currently assigned

#### Completing Tasks (`complete_task`)
A task can be completed if:
- Status is "in_progress"
- User is either the creator OR the assigned helper

### Validation Methods

- `can_accept(user_id)` - Returns True if user can accept the task
- `can_complete(user_id)` - Returns True if user can complete the task

## API Endpoints

### Health Check
- `GET /health` - Returns service health status

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "zipcode": "12345"
  }
  ```

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task
  ```json
  {
    "title": "Need help moving furniture",
    "description": "Moving a couch to second floor",
    "zipcode": "12345",
    "creator_id": 1
  }
  ```
- `POST /api/tasks/<id>/accept` - Accept a task
  ```json
  {
    "user_id": 2
  }
  ```
- `POST /api/tasks/<id>/complete` - Complete a task
  ```json
  {
    "user_id": 2
  }
  ```

## Database Initialization

The database is automatically created when the app starts. Tables are created based on the SQLAlchemy models.

To reset the database, simply delete the `community_aid.db` file and restart the application.

## Code Structure

```
backend/
├── app.py              # Flask application factory and routes
├── requirements.txt    # Python dependencies
├── models/
│   ├── __init__.py    # Models package initialization
│   ├── user.py        # User model
│   └── task.py        # Task model with business logic
```

## Development Notes

- Email addresses must be unique across all users
- Zipcodes are stored as strings to preserve leading zeros
- Task status transitions are enforced at the model level
- The `updated_at` field automatically updates on any modification
- All business logic is encapsulated in the model methods

## Configuration

The app uses SQLite by default. To use a different database, pass a config dictionary to `create_app()`:

```python
config = {
    'SQLALCHEMY_DATABASE_URI': 'postgresql://user:pass@localhost/dbname'
}
app = create_app(config)
```
