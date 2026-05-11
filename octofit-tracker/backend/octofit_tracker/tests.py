from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        Team.objects.create(name='Marvel')
        Team.objects.create(name='DC')
        User.objects.create(email='tony@stark.com', name='Iron Man', team='Marvel')
        Workout.objects.create(name='Push Ups', difficulty='Easy')
        Leaderboard.objects.create(team='Marvel', points=100)
        Activity.objects.create(user_email='tony@stark.com', activity_type='Running', duration=30)

    def test_user(self):
        user = User.objects.get(email='tony@stark.com')
        self.assertEqual(user.name, 'Iron Man')

    def test_team(self):
        team = Team.objects.get(name='Marvel')
        self.assertEqual(team.name, 'Marvel')

    def test_activity(self):
        activity = Activity.objects.get(user_email='tony@stark.com')
        self.assertEqual(activity.activity_type, 'Running')

    def test_leaderboard(self):
        lb = Leaderboard.objects.get(team='Marvel')
        self.assertEqual(lb.points, 100)

    def test_workout(self):
        workout = Workout.objects.get(name='Push Ups')
        self.assertEqual(workout.difficulty, 'Easy')
