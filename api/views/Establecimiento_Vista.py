from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers import HorariosEstablecimientoSerializer
from ..models import Establecimiento
from ..serializers import EstablecimientoSerializer
from ..serializers import EtiquetaSerializer
from ..models import EtiquetaEstablecimiento, horariosEstablecimiento

# Vista para listar establecimientos por tipo
class ListarEstablecimientosPorTipo(APIView):
    def get(self, request, tipo_id):
        establecimientos = Establecimiento.objects.filter(tipo_fk_id=tipo_id)
        if not establecimientos.exists():
            return Response({"message": "No hay establecimientos para el tipo especificado."}, status=status.HTTP_404_NOT_FOUND)

        establecimientos_data = []

        for establecimiento in establecimientos:
            establecimiento_data = EstablecimientoSerializer(establecimiento).data

            etiquetas_establecimiento = EtiquetaEstablecimiento.objects.filter(id_establecimiento=establecimiento.id)
            etiquetas = EtiquetaSerializer([ee.id_etiqueta for ee in etiquetas_establecimiento], many=True).data
            establecimiento_data['etiquetas'] = etiquetas

            horarios = horariosEstablecimiento.objects.filter(establecimiento=establecimiento.id)
            horarios_data = HorariosEstablecimientoSerializer(horarios, many=True).data
            establecimiento_data['horarios'] = horarios_data

            establecimientos_data.append(establecimiento_data)

        return Response(establecimientos_data, status=status.HTTP_200_OK)
    

# Vista para recuperar datos de un establecimiento por su ID
class RecuperarDatosEstablecimiento(APIView):
    def get(self, request, est_id):
        try:
            establecimiento = Establecimiento.objects.get(id=est_id)
            establecimiento_data = EstablecimientoSerializer(establecimiento).data

            # Obtenemos y serializamos las etiquetas del establecimiento
            etiquetas_establecimiento = EtiquetaEstablecimiento.objects.filter(id_establecimiento=establecimiento.id)
            etiquetas = EtiquetaSerializer([ee.id_etiqueta for ee in etiquetas_establecimiento], many=True).data
            establecimiento_data['etiquetas'] = etiquetas

            # Obtenemos y serializamos los horarios de atención del establecimiento
            horarios = horariosEstablecimiento.objects.filter(establecimiento=establecimiento.id)
            horarios_data = HorariosEstablecimientoSerializer(horarios, many=True).data
            establecimiento_data['horarios'] = horarios_data

            return Response(establecimiento_data, status=status.HTTP_200_OK)
        except Establecimiento.DoesNotExist:
            return Response({"error": "Establecimiento no encontrado"}, status=status.HTTP_404_NOT_FOUND)

# Vista para listar todos los establecimientos
class ListarEstablecimientos(APIView):
    def get(self, request, *args, **kwargs):
        establecimientos = Establecimiento.objects.all()
        establecimientos_data = []

        for establecimiento in establecimientos:
            # Serializamos cada establecimiento
            establecimiento_data = EstablecimientoSerializer(establecimiento).data

            # Obtenemos y serializamos las etiquetas del establecimiento
            etiquetas_establecimiento = EtiquetaEstablecimiento.objects.filter(id_establecimiento=establecimiento.id)
            etiquetas = EtiquetaSerializer([ee.id_etiqueta for ee in etiquetas_establecimiento], many=True).data
            establecimiento_data['etiquetas'] = etiquetas

            # Obtenemos y serializamos los horarios de atención del establecimiento
            horarios = horariosEstablecimiento.objects.filter(establecimiento=establecimiento.id)
            horarios_data = HorariosEstablecimientoSerializer(horarios, many=True).data
            establecimiento_data['horarios'] = horarios_data

            # Añadimos el establecimiento con etiquetas y horarios a la lista
            establecimientos_data.append(establecimiento_data)

        return Response(establecimientos_data, status=status.HTTP_200_OK)

class RegistrarEstablecimiento(APIView):
    def post(self, request, *args, **kwargs):
        print("se envio")
        print(request.data)
        serializer = EstablecimientoSerializer(data=request.data)
        print("datos bien enviados")
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Errores de validación:", serializer.errors)  # Imprime errores de validación
            return Response(
                {"message": "Error en la validación de los datos", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

