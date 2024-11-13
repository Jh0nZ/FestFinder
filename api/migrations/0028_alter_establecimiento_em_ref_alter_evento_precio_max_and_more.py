# Generated by Django 5.1.1 on 2024-11-13 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_usuario_establecimiento_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='establecimiento',
            name='em_ref',
            field=models.EmailField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='evento',
            name='precio_max',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='evento',
            name='precio_min',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
