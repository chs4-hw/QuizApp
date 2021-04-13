from django.urls import path, re_path
from frontend_participant import views

urlpatterns = [
    path('', views.index),
    re_path('quiz/start', views.index),
    re_path('quiz/active', views.index),
    re_path('quiz/group', views.index),
    re_path('quiz/end', views.index),
    re_path('quiz/controlled_quiz', views.index)
]
