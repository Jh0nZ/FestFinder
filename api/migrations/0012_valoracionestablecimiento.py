# Generated by Django 5.1.1 on 2024-09-14 23:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_visita'),
    ]

    operations = [
        migrations.CreateModel(
            name='ValoracionEstablecimiento',
            fields=[
                ('id_valoracion_establecimiento', models.AutoField(primary_key=True, serialize=False)),
                ('puntuacion', models.IntegerField()),
                ('comentario', models.CharField(blank=True, max_length=50)),
                ('fecha_publicacion', models.DateTimeField()),
                ('id_visita_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.visita')),
            ],
        ),
    ]
