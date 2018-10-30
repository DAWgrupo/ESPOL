from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics
from aplicacion.models import producto, carrito
from aplicacion.serializers import ProductoSerializer, CarritoSerializer

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
