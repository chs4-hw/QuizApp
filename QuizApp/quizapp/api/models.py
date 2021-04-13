from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Quiz(models.Model):
    name = models.CharField(max_length=100)
    quiz_key = models.CharField(max_length=20, null=True)
    active = models.BooleanField(default=False)
    groupwork = models.BooleanField(default=False)
    host_control = models.BooleanField(default=False)
    owner = models.ForeignKey(
        User, related_name='host', on_delete=models.CASCADE, null=True)


class Questions(models.Model):
    question = models.CharField(max_length=300)
    question_num = models.CharField(max_length=100, default=0)
    q_answer_a = models.CharField(max_length=100, null=True)
    groupvote_a = models.CharField(max_length=20, default=0)
    correct_a = models.BooleanField(default=False)
    q_answer_b = models.CharField(max_length=100, null=True)
    groupvote_b = models.CharField(max_length=20, default=0)
    correct_b = models.BooleanField(default=False)
    q_answer_c = models.CharField(max_length=100, null=True)
    groupvote_c = models.CharField(max_length=20, default=0)
    correct_c = models.BooleanField(default=False)
    q_answer_d = models.CharField(max_length=100, null=True)
    groupvote_d = models.CharField(max_length=20, default=0)
    correct_d = models.BooleanField(default=False)
    load_next = models.BooleanField(default=True)
    quiz = models.ForeignKey(
        Quiz, related_name='questions', on_delete=models.CASCADE, null=True)


class Participant(models.Model):
    username = models.CharField(max_length=100)
    quiz_key = models.CharField(max_length=100, null=True)
    quiz = models.ForeignKey(Quiz, related_name='quiz',
                             on_delete=models.CASCADE, null=True)


class ParticipantAnswers(models.Model):
    answer_a = models.BooleanField(default=False)
    answer_b = models.BooleanField(default=False)
    answer_c = models.BooleanField(default=False)
    answer_d = models.BooleanField(default=False)
    participant = models.ForeignKey(
        Participant, related_name='answers', on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(
        Questions, related_name='participant_answer', on_delete=models.CASCADE, null=True)
