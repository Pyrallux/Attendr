from django.contrib import admin
from .models import *

admin.site.register(Course)
admin.site.register(User)
admin.site.register(Group)
admin.site.register(Day)
admin.site.register(Event)