# Generated by Django 3.0.2 on 2021-04-12 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20210412_1632'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participantanswers',
            old_name='p_answer_a',
            new_name='answer_a',
        ),
        migrations.RenameField(
            model_name='participantanswers',
            old_name='p_answer_b',
            new_name='answer_b',
        ),
        migrations.RenameField(
            model_name='participantanswers',
            old_name='p_answer_c',
            new_name='answer_c',
        ),
        migrations.RenameField(
            model_name='participantanswers',
            old_name='p_answer_d',
            new_name='answer_d',
        ),
        migrations.RenameField(
            model_name='questions',
            old_name='answer_a',
            new_name='q_answer_a',
        ),
        migrations.RenameField(
            model_name='questions',
            old_name='answer_b',
            new_name='q_answer_b',
        ),
        migrations.RenameField(
            model_name='questions',
            old_name='answer_c',
            new_name='q_answer_c',
        ),
        migrations.RenameField(
            model_name='questions',
            old_name='answer_d',
            new_name='q_answer_d',
        ),
    ]