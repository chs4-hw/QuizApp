from .views import QuestionViewSet, QuizViewSet, ParticipantViewSet, RegisterParticipantAPI, OpenQuizAPI, QuizParticipantAPI, QuestionListView, ParticipantAnswer, UpdateQuizAPI
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('api/host/quiz', QuizViewSet, 'quiz')
router.register('api/host/questions', QuestionViewSet, 'questions')
router.register('api/host/participant', ParticipantViewSet, 'participant')
router.register('api/participant/answers', ParticipantAnswer, 'answers')

# router.register('api/participant/answers',
#                 AnswerParticipantAPI, 'participant_answers')

urlpatterns = [
    path('', include(router.urls)),
    path('api/participant/register', RegisterParticipantAPI.as_view()),
    path('api/participant/quiz/<str:quiz_key>', QuizParticipantAPI.as_view()),
    path('api/host/quiz/open/<str:pk>', OpenQuizAPI.as_view()),
    path('api/participant/questions', QuestionListView.as_view()),
    path('api/participant/group_submit/<str:pk>',
         UpdateQuizAPI.as_view(), name='group_update'),
]
