# Generated by Django 3.0.2 on 2021-03-21 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_quiz_groupwork'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='groupwork',
            field=models.BooleanField(default=True),
        ),
    ]