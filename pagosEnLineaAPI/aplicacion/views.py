from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics
from aplicacion.models import producto, carrito, venta, usuario, tarjeta
from aplicacion.serializers import ProductoSerializer, CarritoSerializer, VentaSerializer, UsuarioSerializer, TarjetaSerializer
from django.views.decorators.csrf import csrf_exempt
import json
"""
class JSONResponse(HttpResponse):
   
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

    @csrf_exempt
    def producto_list(request):
        
        if request.method == 'GET':
            aplicacion = producto.objects.all()
            serializer = ProductoSerializer(aplicacion, many=True)
            return JSONResponse(serializer.data)

        elif request.method == 'POST':
            data = JSONParser().parse(request)
            serializer = ProductoSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JSONResponse(serializer.data, status=201)
            return JSONResponse(serializer.errors, status=400)
"""

class ProductoList(generics.ListCreateAPIView):
 
    queryset = producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetail(generics.RetrieveUpdateAPIView):
    queryset = producto.objects.all()
    serializer_class = ProductoSerializer

class CarritoList(generics.ListCreateAPIView):
    queryset = carrito.objects.all()
    serializer_class = CarritoSerializer

class CarritoDetail(generics.RetrieveUpdateAPIView):
    queryset = carrito.objects.all()
    serializer_class = CarritoSerializer

class VentaList(generics.ListCreateAPIView):
    queryset = venta.objects.all()
    serializer_class = VentaSerializer

class VentaDetail(generics.RetrieveUpdateAPIView):
    queryset = venta.objects.all()
    serializer_class = VentaSerializer

class UsuarioList(generics.ListCreateAPIView):
    queryset = usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioDetail(generics.RetrieveUpdateAPIView):
    queryset = usuario.objects.all()
    serializer_class = UsuarioSerializer

def getAllCards(request):
    token = request.GET.get('TOKEN', None)
    user = usuario.verifyUser(token)
    if user["STATUS"]== "OK" :
        return  JsonResponse(usuario.findUser(user)[0].get_all_cards() ) 
    else:
        return  JsonResponse({'respuesta': 'Usuario no autorizado'}) 

def saveCard(request):
    token = request.GET.get('TOKEN', None)
    user = usuario.verifyUser(token)
    if user["STATUS"]== "OK" :
        # si el usuario no existe en la base local lo crea
        if len(usuario.objects.filter(cedula=user["CEDULA"]).filter(correo=user["CORREO"])) == 0 :
            usuario.objects.create(nombre=user["NOMBRES"], apellido=user["APELLIDOS"], correo=user["CORREO"], clave="1234", cedula =user["CEDULA"])
        # devuelve formulario para crear tarjeta
        return render(
            request,
            'pay.html',
            context={},
        )
    else:
        return  JsonResponse({'respuesta': 'Usuario no autorizado'}) 
@csrf_exempt
def deleteCard(request):
    body =json.loads(request.read().decode('utf-8'))
    token = body['TOKEN']
    user = usuario.verifyUser(token)
    return JsonResponse(usuario.findUser(user)[0].delete_card( body['card_token']))

@csrf_exempt
def pay(request):
    body =json.loads(request.read().decode('utf-8'))
    token = body['TOKEN']
    user = usuario.verifyUser(token)
    return JsonResponse(usuario.findUser(user)[0].pay( body['cards']))

def verifyUser(request):
    token = request.GET.get('TOKEN', None)
    return  JsonResponse(usuario.verifyUser(token) ) 


class TarjetaList(generics.ListCreateAPIView):
    queryset = tarjeta.objects.all()
    serializer_class = TarjetaSerializer

class TarjetaDetail(generics.RetrieveUpdateAPIView):
    queryset = tarjeta.objects.all()
    serializer_class = TarjetaSerializer
