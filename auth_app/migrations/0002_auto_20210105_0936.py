# Generated by Django 3.1.5 on 2021-01-05 06:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Todos',
            new_name='Todo',
        ),
    ]
