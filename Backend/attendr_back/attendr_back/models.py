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

class User(models.Model): #tracking user data
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, blank=False, default="")
    last_name = models.CharField(max_length=100, blank=False, default="")
    username = models.CharField(max_length=100, blank=False, default="")
    # Password -- do later
    email = models.CharField(max_length=100, blank=False, default="")
    points = models.BigIntegerField(blank = False, default=0)
    streak = models.BigIntegerField(blank = False, default=0)

    def __init__(self):
        return self.username

class Course(models.Model): #tracking course data
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
    user_id = models.ForeignKey(User, on_delete=models.CASCADE) #tie user data to the course
    days_attended = models.BigIntegerField(blank = False, default=0)
    days_missed = models.BigIntegerField(blank = False, default=0)
    # location = 

class Group(models.Model): #tracking group data
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, default="")
    members = models.ManyToManyField(User, related_name="groups")

    def __init__(self):
        return self.name

# class Attendance(models.Model): #track if users actually attend the course
#     id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(User, on_delete=models.CASCADE) #each attendance record belongs to one user (many to one relation)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE) #each attendance record belongs to one course
#     date = models.DateField()
#     present = models.BooleanField(default=False)

#     class Meta:
#         unique_together = ('user', 'course', 'date') #make it so the user can only be tracked at one course per day
    
# class Enrollment(models.Model): #track if uses are enrolled in a course
#     id = models.AutoField(primary_key=True) 
#     user = models.ForeignKey(User, on_delete=models.CASCADE) 
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
