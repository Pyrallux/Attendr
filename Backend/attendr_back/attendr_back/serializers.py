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
    days = serializers.PrimaryKeyRelatedField(many=True, queryset=Day.objects.all())
    class Meta:
        model = Course
        fields = ["id", "name", "frequency", "time", "start_date", "end_date", "user_id", "days_attended", "days_missed", "latitude", "longitude"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username","password", "email", "points", "streak"]

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id"]

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "members", "admin"]

