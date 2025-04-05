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
    password = models.CharField(max_length=100, blank=False, default="")
    email = models.CharField(max_length=100, blank=False, default="")
    points = models.BigIntegerField(blank = False, default=0)
    streak = models.BigIntegerField(blank = False, default=0)

    def __str__(self):
        return self.username

class Day(models.Model):
    DAY_CHOICES = (
        (1, "Monday"),
        (2, "Tuesday"),
        (3, "Wednesday"),
        (4, "Thursday"),
        (5, "Friday"),
        (6, "Saturday"),
        (7, "Sunday"),
    )
    id = models.IntegerField(choices=DAY_CHOICES, primary_key=True)

class Course(models.Model): #tracking course data
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, default="")
    time = models.TimeField("Lesson Time")
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE) #tie user data to the course
    days = models.ManyToManyField(Day, related_name="courses")
    days_attended = models.BigIntegerField(blank = False, default=0)
    days_missed = models.BigIntegerField(blank = False, default=0)
    latitude = models.FloatField(blank=True, null=True) #allow empty values to be stored as null in DB
    longitude = models.FloatField(blank=True, null=True) #allow blank values

# class CourseDay(models.Model):
#     id = models.AutoField(primary_key=True)
#     RECURRENCE_CHOICES = (
#         (1, "Monday"),
#         (2, "Tuesday"),
#         (3, "Wednesday"),
#         (4, "Thursday"),
#         (5, "Friday"),
#         (6, "Saturday"),
#         (7, "Sunday"),
#     )
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course_days") #make easier to reference later
#     day = models.IntegerField(choices=RECURRENCE_CHOICES)

class Group(models.Model): #tracking group data
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, default="")
    members = models.ManyToManyField(User, related_name="groups")

    def __str__(self):
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
