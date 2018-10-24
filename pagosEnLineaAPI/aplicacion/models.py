from django.db import models

# Create your models here.

class producto(models.Model):
    idP = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length = 50)
    precio = models.DecimalField(max_digits = 6, decimal_places = 2)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class usuario(models.Model):
    idU = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length = 50)
    apellido = models.CharField(max_length = 50)
    correo = models.EmailField(max_length = 50)
    clave = models.CharField(max_length = 20, null = False)

    def __str__(self):
        return self.nombre

class carrito(models.Model):
    idC = models.AutoField(primary_key = True)
    idP = models.ForeignKey(producto, on_delete = models.SET_NULL)
    idU = models.ForeignKey(usuario, on_delete = models.SET_NULL)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.idP 

class venta(models.Model):
    idV = models.AutoField(primary_key = True)
    idC = models.ForeignKey(carrito, on_delete = models.SET_NULL)
    idU = models.ForeignKey(usuario, on_delete = models.SET_NULL)
    fecha = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.idV


