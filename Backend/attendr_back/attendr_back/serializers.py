from rest_framework import serializers
from .models import *

# REMINDER! Setup Views For Serialized Models


# class WarehouseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Warehouse
#         fields = [
#             "warehouse_id",
#             "name",
#             "manual",
#             "plant",
#             "plant_warehouse",
#             "cycles_per_year",
#         ]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "frequency", "time", "start_date", "end_date", "user_id", "days_attended", "days_missed"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "email", "points", "streak"]

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "members"]

# class CourseDaySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourseDay
#         fields = ["id", "course", "day"]
    
# class AttendanceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Attendance
#         fields = ["id", "user", "course", "date", "present"]

# class EnrollmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Enrollment
#         fields = ["id", "user", "course"]