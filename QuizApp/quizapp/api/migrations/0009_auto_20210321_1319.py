# Generated by Django 3.0.2 on 2021-03-21 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210321_1119'),
    ]

    operations = [
        migrations.AddField(
            model_name='questions',
            name='groupvote_a',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='questions',
            name='groupvote_b',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='questions',
            name='groupvote_c',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='questions',
            name='groupvote_d',
            field=models.CharField(default='0', max_length=20),
        ),
    ]
