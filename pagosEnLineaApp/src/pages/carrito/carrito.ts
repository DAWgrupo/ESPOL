import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ViewChild } from '@angular/core';

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
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, private carritoProvider: ApiServiceProvider) {
    
  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }

  ionViewDidEnter() {
    this.carritos = [];
    this.productos = [];
    this.getProductos();
    this.getCarritos();
    
  }

  

  getProductos() {
    this.carritoProvider.getProductos()
    .then(data => {
      this.productos = data;
      
      console.log(this.productos);
    });
  }

  async eliminarProducto(productoId) {
    await this.carritoProvider.deleteProducto(productoId);
    this.getProductos;
  }
  

  getCarritos() {
    this.carritoProvider.getCarritos()
    .then(data => {
      this.carritos = data;
      console.log(this.carritos);
    });
  }

  
  

}
