"""
URL configuration for attendr_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("db/warehouses/", views.warehouse_list),
    # path("db/warehouses/<int:id>", views.warehouse_detail),
    path("db/courses/", views.course_list),
    path("db/courses/<int:id>", views.course_detail),
    path("db/users/", views.user_list),
    path("db/users/<int:id>", views.user_detail),
    path("db/groups/", views.group_list),
    path("db/groups/<int:id>", views.group_detail),
    path("db/days/", views.day_list),
    path("db/days/<int:id>", views.day_detail),
    path("db/events/", views.event_list),
    path("db/events/<int:id>", views.event_detail),
]
