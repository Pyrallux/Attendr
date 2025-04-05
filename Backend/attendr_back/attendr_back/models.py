from django.db import models

# REMINDER! Add all model fields to serializer.

# Example model
# class Warehouse(models.Model):
#     warehouse_id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=100)
#     manual = models.BooleanField()
#     plant = models.CharField(max_length=100, blank=True, default="")
#     plant_warehouse = models.CharField(max_length=100, blank=True, default="")
#     cycles_per_year = models.IntegerField(blank=True, default=0)


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, default="")
    RECURRENCE_CHOICES = (
        (1, "Monday"),
        (2, "Tuesday"),
        (3, "Wednesday"),
        (4, "Thursday"),
        (5, "Friday"),
        (6, "Saturday"),
        (7, "Sunday"),
    )

    frequency = models.IntegerField(choices=RECURRENCE_CHOICES)
    time = models.TimeField("Lesson Time")
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")
    # location = 


class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, blank=False, default="")
    last_name = models.CharField(max_length=100, blank=False, default="")
    username = models.CharField(max_length=100, blank=False, default="")
    email = models.CharField(max_length=100, blank=False, default="")
    points = models.BigIntegerField(blank = False, default=0)
    streak = models.BigIntegerField(blank = False, default=0)
    # Password -- do later

    def __init__(self):
        return self.username

class Group(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, default="")
    members = models.ManyToManyField(User, related_name="groups")

    def __init__(self):
        return self.name

    
