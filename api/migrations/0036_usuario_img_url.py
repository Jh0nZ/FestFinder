# Generated by Django 5.1.1 on 2024-12-12 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_favoritoslocal'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='img_url',
            field=models.CharField(default=False),
        ),
    ]