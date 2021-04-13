import json

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from knox.models import AuthToken
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Participant, ParticipantAnswers, Questions, Quiz
from .serializer import (AddParticipantSerializer, OpenQuizSerializer,
                         ParticipantAnswerSerializer,
                         ParticipantQuestionSerializer, ParticipantSerializer,
                         QuestionSerializer, QuizSerializer)

# Create your tests here.


class QuizViewTest(APITestCase):
    list_url = reverse('quiz-list')

    # POST Quiz
    def test_add_quiz(self):
        data = {'name': 'testcase'}

        response = self.client.post('/api/host/quiz/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # GET Quiz
    def create_quiz(self):
        self.quiz = Quiz.objects.create_quiz(name='testcase2')

    def test_get_quiz(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # PUT test, change {'name' : 'testcase'} to {'name' : 'changed_testcase'}
    def test_put_quiz(self):
        data = {'name': 'testcase'}
        response = self.client.post('/api/host/quiz/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        put_data = {"id": 1, "name": "changed_testcase",
                    "groupwork": 'true', "host_control": 'true'}
        response = self.client.put('/api/host/quiz/1/', put_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), {
            'id': 1, "name": "changed_testcase", "quiz_key": None, "active": False, "groupwork": True, "host_control": True})


class ActivateQuiz(APITestCase):

    # Custom open/close quiz API,
    # open: creates and returns the generated quiz key
    # close: change quiz key to null
    def test_open_quiz(self):
        data = {'name': 'testcase'}
        response = self.client.post('/api/host/quiz/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Open Quiz
        activate = {'active': 'true'}
        response = self.client.post('/api/host/quiz/open/1', activate)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print('Quiz Key Generated')
        print(response.data)

        # Close Quiz
        deactivate = {'active': 'false'}
        response = self.client.post('/api/host/quiz/open/1', deactivate)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), {
                         'id': 1, 'quiz_key': None, 'active': False})
