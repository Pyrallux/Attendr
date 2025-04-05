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
        fields = ["id", "name", "frequency", "time", "start_date", "end_date"]
