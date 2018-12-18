from django.db import models

import time
import hashlib
from base64 import b64encode
import requests



# Create your models here.



class producto(models.Model):
    objects = models.Manager()
    idP = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length = 50)
    precio = models.DecimalField(max_digits = 6, decimal_places = 2)
    descripcion = models.TextField()
       
    class Meta:
        ordering = ('nombre',)

    def __str__(self):
        return self.nombre


class usuario(models.Model):
    objects = models.Manager()
    idU = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length = 50)
    apellido = models.CharField(max_length = 50)
    correo = models.EmailField(max_length = 50)
    clave = models.CharField(max_length = 20, null = False)

    paymentez_server_app_code = 'INNOVA-EC-SERVER'
    paymentez_server_app_key = 'Y5FnbpWYtULtj1Muvw3cl8LJ7FVQfM'

    def __str__(self):
        return self.nombre
    
    def get_token(self):
        unix_timestamp = str(int(time.time()))
        uniq_token_string = usuario.paymentez_server_app_key + unix_timestamp
        uniq_token_hash = hashlib.sha256(uniq_token_string.encode('utf-8')).hexdigest()
        data = usuario.paymentez_server_app_code + ";" + unix_timestamp + ";" +uniq_token_hash
        auth_token = b64encode(data.encode('ascii'))
        return auth_token
    
    def get_all_cards(self):
        response = requests.get('https://ccapi-stg.paymentez.com/v2/card/list?uid=' + str(self.idU), 
                     headers={'Auth-Token': self.get_token()})
        return response.json()
        

class tarjeta(models.Model):
    objects = models.Manager()
    idT = models.AutoField(primary_key = True)
    idU = models.ForeignKey(usuario, null=True, on_delete = models.SET_NULL)
    codigo = models.TextField()
    
    def __str__(self):
        return self.idT


class venta(models.Model):
    objects = models.Manager()
    idV = models.AutoField(primary_key = True)
    observacion = models.CharField(max_length = 50)
    #idC = models.ForeignKey(carrito, null=True, on_delete = models.SET_NULL)
    idT = models.ForeignKey(tarjeta, null=True, on_delete = models.SET_NULL)
    fecha = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.idV

class carrito(models.Model):
    objects = models.Manager()
    idC = models.AutoField(primary_key = True)
    idP = models.ForeignKey(producto, null=True, on_delete = models.SET_NULL)
    idU = models.ForeignKey(usuario, null=True, on_delete = models.SET_NULL)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now = True)
    idV = models.ForeignKey(venta, null=True, on_delete = models.SET_NULL)

    def __str__(self):
        return self.idP 

