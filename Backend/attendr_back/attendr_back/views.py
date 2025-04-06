from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# REMINDER! Setup URLs for Each View


# Course
# @api_view(["GET", "POST", "PUT", "DELETE"])
# def warehouse_list(request, format=None):
#     if request.method == "GET":
#         warehouse = Warehouse.objects.all()
#         serializer = WarehouseSerializer(warehouse, many=True)
#         return Response(serializer.data)
#     elif request.method == "POST":
#         serializer = WarehouseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == "PUT":
#         serializer = WarehouseSerializer(warehouse, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == "DELETE":
#         warehouse = Warehouse.objects.all()
#         warehouse.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(["GET", "PUT", "DELETE"])
# def warehouse_detail(request, id, format=None):
#     try:
#         warehouse = Warehouse.objects.get(pk=id)
#     except Warehouse.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "GET":
#         serializer = WarehouseSerializer(warehouse)
#         return Response(serializer.data)
#     elif request.method == "PUT":
#         serializer = WarehouseSerializer(warehouse, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == "DELETE":
#         warehouse.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# Course views
@api_view(["GET", "POST", "PUT", "DELETE"])
def course_list(request, format=None):
    if request.method == "GET":
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        course = Course.objects.all()
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
def course_detail(request, id, format=None):
    try:
        course = Course.objects.get(pk=id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# User views
@api_view(["GET", "POST", "PUT", "DELETE"])
def user_list(request, format=None):
    if request.method == "GET":
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        user = User.objects.all()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
def user_detail(request, id, format=None):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Group views
@api_view(["GET", "POST", "PUT", "DELETE"])
def group_list(request, format=None):
    if request.method == "GET":
        group = Group.objects.all()
        serializer = GroupSerializer(group, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        group = Group.objects.all()
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
def group_detail(request, id, format=None):
    try:
        group = Group.objects.get(pk=id)
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GroupSerializer(group)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Day views
@api_view(["GET", "POST", "PUT", "DELETE"])
def day_list(request, format=None):
    if request.method == "GET":
        day = Day.objects.all()
        serializer = DaySerializer(day, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = DaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = DaySerializer(day, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        day = Day.objects.all()
        day.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
def day_detail(request, id, format=None):
    try:
        day = Day.objects.get(pk=id)
    except Day.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = DaySerializer(day)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = DaySerializer(day, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        day.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Event views
@api_view(["GET", "POST", "PUT", "DELETE"])
def event_list(request, format=None):
    if request.method == "GET":
        event = Event.objects.all()
        serializer = EventSerializer(event, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        event = Event.objects.all()
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
def event_detail(request, id, format=None):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = EventSerializer(event)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
