import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,InfiniteScroll  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ViewChild } from '@angular/core';
import { ValoresPage  } from '../valores/valores';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


import 'rxjs/add/operator/map';


/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  carritos: any;
  productos: any;
  totalCarrito : number = 0;



  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Nav) nav: Nav;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private carritoProvider: ApiServiceProvider) {
    this.getProductos();
    this.getCarritos();
    
  }

  getTotal(){
    this.totalCarrito = 0;
    for (let p of this.productos){
      this.totalCarrito += Number(p.precio) * Number(p.cantidad);
    }
    console.log(this.totalCarrito);
  }

  getProductos() {
    this.carritoProvider.getProductos()
    .then(data => {
      this.productos = data;
      console.log(this.productos);
      this.getTotal();
    });
  }

  async addCantidad(event, producto) {
                
    const productoAdd = {
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        cantidad: producto.cantidad + 1,
    };
            
    await this.carritoProvider.setProducto(producto.idP, productoAdd);
    this.getProductos();    
}

async removeCantidad(event, producto) {
                
  const productoAdd = {
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad - 1,
  };

  if (producto.cantidad > 1){
    await this.carritoProvider.setProducto(producto.idP, productoAdd);
    this.getProductos();
  }
}

  async eliminarProducto(event, productoId) {
    await this.carritoProvider.deleteProducto(productoId); 
    this.getProductos(); 
  }

  getCarritos() {
    this.carritoProvider.getCarritos()
    .then(data => {
      this.carritos = data;
    });
  }

  goPage(){
    
    this.navCtrl.setRoot(ValoresPage)
  }




}
