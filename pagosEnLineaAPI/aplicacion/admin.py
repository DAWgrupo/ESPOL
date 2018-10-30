from django.contrib import admin

# Register your models here.

from aplicacion.models import producto, carrito

admin.site.register(producto)
#admin.site.register(carrito)