# Generated by Django 2.1.1 on 2019-01-03 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion', '0002_producto_cantidad'),
    ]

    operations = [
        migrations.CreateModel(
            name='codigo',
            fields=[
                ('codigo', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('descuento', models.DecimalField(decimal_places=2, max_digits=6)),
                ('estado', models.BooleanField(default=False)),
            ],
        ),
    ]
