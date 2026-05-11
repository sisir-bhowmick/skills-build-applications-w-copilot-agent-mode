from djongo import models

class User(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'users'

    def __str__(self):
        return self.name

class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'teams'

    def __str__(self):
        return self.name

class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user_email = models.EmailField()
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'activities'

    def __str__(self):
        return f"{self.user_email} - {self.activity_type}"

class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    team = models.CharField(max_length=50)
    points = models.IntegerField()

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.team}: {self.points}"

class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'workouts'

    def __str__(self):
        return self.name
