from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# REMINDER! Setup URLs for Each View


# Warehouse
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
