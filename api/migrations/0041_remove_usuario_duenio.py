# Generated by Django 5.1.1 on 2024-12-13 18:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0040_usuario_expo_push_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='duenio',
        ),
    ]
