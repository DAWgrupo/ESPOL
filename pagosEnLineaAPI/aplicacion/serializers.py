from rest_framework import serializers
from .models import producto, usuario, carrito, venta, tarjeta, codigo



class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = producto
        fields = ('idP','nombre','precio','descripcion','cantidad')

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = carrito
        fields = ('idC','idP','idU','cantidad','fecha','idV')

class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = venta
        fields = ('idV', 'observacion','idT','fecha')

class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = tarjeta
        fields = ('idT','idU','codigo')

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = ('idU','nombre','apellido','correo','clave')

class CodigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = codigo
        fields = ('codigo','descuento','estado')
