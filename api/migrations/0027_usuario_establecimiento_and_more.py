# Generated by Django 5.1.1 on 2024-11-12 13:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_remove_evento_banner'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='establecimiento',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='usuario_establecimiento', to='api.establecimiento'),
        ),
        migrations.AlterField(
            model_name='establecimiento',
            name='usuario',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='establecimiento_usuario', to='api.usuario'),
        ),
    ]
