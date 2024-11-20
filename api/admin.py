from django.contrib import admin
from .models import *
# Registra todos los modelos en el admin
admin.site.register(Asistencia)
admin.site.register(Consumo)
admin.site.register(Entrada)
admin.site.register(Establecimiento)
admin.site.register(Etiqueta)
admin.site.register(EtiquetaEstablecimiento)
admin.site.register(Evento)
admin.site.register(GeneroEvento)
admin.site.register(Imagen)
admin.site.register(TipoEstablecimiento)
admin.site.register(Usuario)
admin.site.register(ValoracionEstablecimiento)
admin.site.register(ValoracionEvento)
admin.site.register(Visita)
admin.site.register(horariosEstablecimiento)
admin.site.register(GaleriaEstablecimiento)
admin.site.register(Interes)

