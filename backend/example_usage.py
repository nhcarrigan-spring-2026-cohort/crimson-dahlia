"""
Example usage of the Community Aid backend.
Demonstrates creating users, tasks, and task lifecycle.
"""
from app import create_app, db
from models import User, Task


def run_example():
    """Run example scenario."""
    
    # Create Flask app
    app = create_app()
    
    with app.app_context():
        # Clear existing data for fresh example
        db.drop_all()
        db.create_all()
        
        print("\n" + "="*60)
        print("Community Aid Backend - Example Usage")
        print("="*60)
        
        # Create users
        print("\n1. Creating users...")
        alice = User(
            name="Alice Martinez",
            email="alice.martinez@email.com",
            zipcode="90210"
        )
        bob = User(
            name="Bob Thompson",
            email="bob.thompson@email.com",
            zipcode="90210"
        )
        
        db.session.add_all([alice, bob])
        db.session.commit()
        print(f"   Created: {alice.name} (ID: {alice.id})")
        print(f"   Created: {bob.name} (ID: {bob.id})")
        
        # Create a task
        print("\n2. Alice creates a help request...")
        task = Task(
            title="Need help moving boxes",
            description="Moving to a new apartment, need help carrying boxes from truck to 3rd floor",
            zipcode="90210",
            creator_id=alice.id
        )
        db.session.add(task)
        db.session.commit()
        print(f"   Task created: '{task.title}'")
        print(f"   Status: {task.status}")
        print(f"   Creator: {task.creator.name}")
        
        # Bob checks if he can help
        print("\n3. Bob wants to help...")
        if task.can_accept(bob.id):
            print(f"   ✓ Bob can accept this task")
            task.accept_task(bob.id)
            db.session.commit()
            print(f"   Task accepted by {task.helper.name}")
            print(f"   New status: {task.status}")
        else:
            print(f"   ✗ Bob cannot accept this task")
        
        # Complete the task
        print("\n4. Task is completed...")
        if task.can_complete(bob.id):
            print(f"   ✓ Bob can complete the task")
            task.complete_task(bob.id)
            db.session.commit()
            print(f"   Task completed!")
            print(f"   Final status: {task.status}")
        
        # Show user statistics
        print("\n5. User Statistics:")
        print(f"   Alice:")
        print(f"     - Created tasks: {len(alice.created_tasks)}")
        print(f"     - Helped with: {len(alice.accepted_tasks)} tasks")
        print(f"   Bob:")
        print(f"     - Created tasks: {len(bob.created_tasks)}")
        print(f"     - Helped with: {len(bob.accepted_tasks)} tasks")
        
        print("\n" + "="*60)
        print("Example completed successfully!")
        print("="*60 + "\n")


if __name__ == '__main__':
    run_example()
