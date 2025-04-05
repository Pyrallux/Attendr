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
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
    )
    frequency = models.IntegerField(choices=RECURRENCE_CHOICES)
    time = models.TimeField("Lesson Time")
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")
    # Location here
