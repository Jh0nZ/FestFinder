# Generated by Django 5.1.1 on 2024-09-16 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_valoracionevento'),
    ]

    operations = [
        migrations.AddField(
            model_name='establecimiento',
            name='nro_ref',
            field=models.CharField(blank=True, default='', max_length=13),
        ),
    ]
