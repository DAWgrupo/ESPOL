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

]