from django.shortcuts import render
from rest_framework import viewsets, permissions, filters, generics, status
from .models import Quiz, Questions, ParticipantAnswers, Participant
from .serializer import QuizSerializer, QuestionSerializer, ParticipantSerializer, OpenQuizSerializer, AddParticipantSerializer, ParticipantQuestionSerializer, ParticipantAnswerSerializer
from rest_framework.response import Response
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist

from .pagination import StandardResultsSetPagination

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.mixins import UpdateModelMixin

#from django.db.models import Prefetch


#import json


# Main Host Viewsets

class QuizViewSet(viewsets.ModelViewSet):
    #queryset = Quiz.objects.all()

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = QuizSerializer

    def get_queryset(self):
        return self.request.quiz.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = QuestionSerializer


class ParticipantAnswer(viewsets.ModelViewSet):
    queryset = ParticipantAnswers.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ParticipantAnswerSerializer


class ParticipantViewSet(viewsets.ModelViewSet):

    queryset = Participant.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ParticipantSerializer


# Custom Viewsets

class QuestionListView(generics.ListAPIView):
    # Query list of question related to quiz

    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ParticipantQuestionSerializer
    pagination_class = StandardResultsSetPagination

    #query = Questions.objects.filter(quiz_id__active='True')
    #query2 = Answers.objects.filter(question__id=query)

    def get_queryset(self):

        queryset = Questions.objects.filter(quiz_id__active='True')
        return queryset

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['quiz_id']

#


class QuizParticipantAPI(generics.GenericAPIView):
    # Get the quiz for the participant
    queryset = Quiz.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = QuizSerializer

    def get_object(self, quiz_key, format=None):
        try:
            return Quiz.objects.get(quiz_key=quiz_key)
        except ObjectDoesNotExist:
            raise Http404

    def get(self, request, quiz_key, format=None):
        quiz = self.get_object(quiz_key)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

#


class RegisterParticipantAPI(generics.GenericAPIView):
    # Register Particpant to a Quiz Session
    queryset = Participant.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = AddParticipantSerializer

    def post(self, request, format=None):

        try:
            quiz = Quiz.objects.get(quiz_key=request.data['quiz_key'])
            if quiz is not None:
                serializer = self.get_serializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    user = serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            raise Http404

#


class OpenQuizAPI(generics.GenericAPIView):
    # Open Quiz Session
    queryset = Quiz.objects.all()

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OpenQuizSerializer

    def post(self, request, pk, format=None):
        quiz = Quiz.objects.get(id=pk)
        serializer = OpenQuizSerializer(quiz, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateQuizAPI(generics.GenericAPIView, UpdateModelMixin):
    queryset = Questions.objects.all()
    serializer_class = QuestionSerializer

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
