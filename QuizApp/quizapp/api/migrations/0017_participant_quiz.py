# Generated by Django 3.0.2 on 2021-04-11 15:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_quiz_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='quiz',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='quiz', to='api.Quiz'),
        ),
    ]
