"""
Test script to verify backend models and business logic.
Run this to validate the implementation.
"""
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from models import User, Task


def test_models():
    """Test the User and Task models with business logic."""
    
    # Create app with in-memory database for testing
    app = create_app({'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'})
    
    with app.app_context():
        print("=" * 60)
        print("TESTING COMMUNITY AID BACKEND")
        print("=" * 60)
        
        # Test 1: Create users
        print("\n[TEST 1] Creating users...")
        user1 = User(name="Alice Johnson", email="alice@example.com", zipcode="10001")
        user2 = User(name="Bob Smith", email="bob@example.com", zipcode="10002")
        user3 = User(name="Carol White", email="carol@example.com", zipcode="10003")
        
        db.session.add_all([user1, user2, user3])
        db.session.commit()
        
        print(f"✓ Created user: {user1}")
        print(f"��� Created user: {user2}")
        print(f"✓ Created user: {user3}")
        
        # Test 2: Create task
        print("\n[TEST 2] Creating task...")
        task = Task(
            title="Help with grocery shopping",
            description="Need someone to pick up groceries",
            zipcode="10001",
            creator_id=user1.id
        )
        db.session.add(task)
        db.session.commit()
        
        print(f"✓ Created task: {task}")
        print(f"  Status: {task.status}")
        print(f"  Creator: {task.creator.name}")
        
        # Test 3: Verify initial state
        print("\n[TEST 3] Verifying initial task state...")
        assert task.status == Task.STATUS_AVAILABLE, "Task should start as available"
        assert task.helper_id is None, "Task should have no helper initially"
        print("✓ Task is in available state with no helper")
        
        # Test 4: Test can_accept logic
        print("\n[TEST 4] Testing can_accept logic...")
        assert not task.can_accept(user1.id), "Creator should not be able to accept own task"
        print("✓ Creator cannot accept own task")
        
        assert task.can_accept(user2.id), "Different user should be able to accept"
        print("✓ Different user can accept task")
        
        # Test 5: Accept task
        print("\n[TEST 5] Accepting task...")
        task.accept_task(user2.id)
        db.session.commit()
        
        assert task.status == Task.STATUS_IN_PROGRESS, "Status should be in_progress"
        assert task.helper_id == user2.id, "Helper should be assigned"
        print(f"✓ Task accepted by {task.helper.name}")
        print(f"  New status: {task.status}")
        
        # Test 6: Try to accept already accepted task
        print("\n[TEST 6] Testing double-accept prevention...")
        try:
            task.accept_task(user3.id)
            print("✗ FAILED: Should not allow double-accept")
            sys.exit(1)
        except ValueError as e:
            print(f"✓ Correctly prevented double-accept: {e}")
        
        # Test 7: Test can_complete logic
        print("\n[TEST 7] Testing can_complete logic...")
        assert not task.can_complete(user3.id), "Unrelated user should not be able to complete"
        print("✓ Unrelated user cannot complete task")
        
        assert task.can_complete(user1.id), "Creator should be able to complete"
        print("✓ Creator can complete task")
        
        assert task.can_complete(user2.id), "Helper should be able to complete"
        print("✓ Helper can complete task")
        
        # Test 8: Complete task
        print("\n[TEST 8] Completing task...")
        task.complete_task(user2.id)
        db.session.commit()
        
        assert task.status == Task.STATUS_COMPLETED, "Status should be completed"
        print(f"✓ Task completed")
        print(f"  Final status: {task.status}")
        
        # Test 9: Try to accept completed task
        print("\n[TEST 9] Testing completed task prevention...")
        try:
            task.accept_task(user3.id)
            print("✗ FAILED: Should not allow accepting completed task")
            sys.exit(1)
        except ValueError as e:
            print(f"✓ Correctly prevented accepting completed task: {e}")
        
        # Test 10: Test relationships
        print("\n[TEST 10] Testing relationships...")
        assert len(user1.created_tasks) == 1, "User1 should have 1 created task"
        assert len(user2.accepted_tasks) == 1, "User2 should have 1 accepted task"
        assert task.creator == user1, "Task creator should be user1"
        assert task.helper == user2, "Task helper should be user2"
        print("✓ All relationships working correctly")
        
        # Test 11: Test invalid status
        print("\n[TEST 11] Testing invalid status prevention...")
        try:
            bad_task = Task(
                title="Bad task",
                zipcode="10001",
                creator_id=user1.id,
                status="invalid_status"
            )
            print("✗ FAILED: Should not allow invalid status")
            sys.exit(1)
        except ValueError as e:
            print(f"✓ Correctly prevented invalid status: {e}")
        
        # Test 12: Test to_dict methods
        print("\n[TEST 12] Testing to_dict serialization...")
        user_dict = user1.to_dict()
        task_dict = task.to_dict()
        
        assert 'id' in user_dict and 'email' in user_dict, "User dict should have required fields"
        assert 'id' in task_dict and 'status' in task_dict, "Task dict should have required fields"
        print("✓ Serialization working correctly")
        
        print("\n" + "=" * 60)
        print("ALL TESTS PASSED! ✓")
        print("=" * 60)
        print("\nBackend implementation is ready for production.")


if __name__ == '__main__':
    test_models()
