# Generated by Django 5.2.4 on 2025-07-06 12:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='Category',
            new_name='category',
        ),
    ]
