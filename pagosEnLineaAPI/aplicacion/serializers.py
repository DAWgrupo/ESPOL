from rest_framework import serializers
from .models import producto, usuario, carrito, venta


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = producto
        fields = ('idP','nombre','precio','descripcion')

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = carrito
        fields = ('idC','idP','idU','cantidad','fecha')

