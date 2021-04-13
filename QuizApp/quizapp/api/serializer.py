from rest_framework import serializers
from .models import Quiz, Questions, ParticipantAnswers, Participant

from django.utils.crypto import get_random_string

from rest_framework.decorators import action

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404


# Serializers


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'name', 'quiz_key', 'active',
                  'groupwork', 'host_control', 'owner')


class OpenQuizSerializer(serializers.ModelSerializer):

    quiz_key = serializers.SerializerMethodField('generate_quiz_key')

    class Meta:
        model = Quiz
        fields = ('id', 'quiz_key', 'active')

    def generate_quiz_key(self, quiz):
        quiz_key = None
        if quiz.active:
            quiz_key = get_random_string(length=8)
            quiz.quiz_key = quiz_key
            quiz.key_set = 'False'
            quiz.save()
        else:
            quiz.save()
        return quiz_key


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ('id', 'username', 'quiz_key')


class AddParticipantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ('id', 'username', 'quiz_key')


class ParticipantQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('id', 'question', 'question_num', 'q_answer_a', 'groupvote_a', 'q_answer_b', 'groupvote_b',
                  'q_answer_c', 'groupvote_c', 'q_answer_d', 'groupvote_d', 'question', 'load_next')


class ParticipantAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParticipantAnswers
        fields = '__all__'
