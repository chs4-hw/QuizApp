import json

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from knox.models import AuthToken
from rest_framework import status
from rest_framework.test import APITestCase

from api.models import Participant, ParticipantAnswers, Questions, Quiz
from api.serializer import (AddParticipantSerializer, OpenQuizSerializer,
                            ParticipantAnswerSerializer,
                            ParticipantQuestionSerializer, ParticipantSerializer,
                            QuestionSerializer, QuizSerializer)

# Create your tests here.


class RegisterTestCase(APITestCase):

    # Password 1 and Password 2 checks on frontend
    # Returns User and token
    def test_register(self):
        user_data = {"username": "testcase",
                     "email": "testcase@email.com", "password": "password"}
        response = self.client.post('/api/auth/register', user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print('Host User Created')
        print(response.data)


class LoginTestCase(APITestCase):
    # Host User Login
    def test_login(self):
        user_data = {"username": "testcase",
                     "email": "testcase@email.com", "password": "password"}
        response = self.client.post('/api/auth/register', user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        login_data = {"username": "testcase", "password": "password"}
        response = self.client.post('/api/auth/login', login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print('Host User Login')
        print(response.data)

    def test_login_incorrect_details(self):
        # Create User for test
        user_data = {"username": "testcase",
                     "email": "testcase@email.com", "password": "password"}
        response = self.client.post('/api/auth/register', user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Test no username
        login_data = {"username": "", "password": "password"}
        response = self.client.post('/api/auth/login', login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {
                         "username": ["This field may not be blank."]})
        # Test no password
        login_data = {"username": "testcase", "password": ""}
        response = self.client.post('/api/auth/login', login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {
                         "password": ["This field may not be blank."]})

        # Test wrong username
        login_data = {"username": "wrong_username", "password": "password"}
        response = self.client.post('/api/auth/login', login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {
                         "non_field_errors": ["Incorrect Credentials"]})

        # Test wrong password
        login_data = {"username": "testcase", "password": "wrong_password"}
        response = self.client.post('/api/auth/login', login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {
                         "non_field_errors": ["Incorrect Credentials"]})


class UserProfileTest(APITestCase):

    def test_get_user_profile(self):
        # Create User for test
        user_data = {"username": "testcase",
                     "email": "testcase@email.com", "password": "password"}
        response = self.client.post('/api/auth/register', user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
