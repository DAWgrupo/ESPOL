from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path, re_path
from aplicacion.views import *
from aplicacion import views
from django.contrib import admin



urlpatterns = [
    url(r'^producto/$', ProductoList.as_view()),
    url(r'^producto/(?P<pk>[0-9]+)/$', ProductoDetail.as_view()),

    url(r'^carrito/$', CarritoList.as_view()),
    url(r'^carrito/(?P<pk>[0-9]+)/$', CarritoDetail.as_view()),

    url(r'^usuario/$', UsuarioList.as_view()),
    url(r'^usuario/(?P<pk>[0-9]+)/$', UsuarioDetail.as_view()),

    url(r'^venta/$', VentaList.as_view()),
    url(r'^venta/(?P<pk>[0-9]+)/$', VentaDetail.as_view()),

    url(r'^tarjeta/$', TarjetaList.as_view()),
    url(r'^tarjeta/(?P<pk>[0-9]+)/$', TarjetaDetail.as_view()),

    url(r'^codigo/$', CodigoList.as_view()),
    url(r'^codigo/(?P<pk>[0-9]+)/$', CodigoDetail.as_view()),

]