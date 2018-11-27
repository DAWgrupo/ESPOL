import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ViewChild } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private carritoProvider: ApiServiceProvider) {
    this.getProductos();
    this.getCarritos();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
    

  }

  ionViewDidEnter() {
    
    //this.carritos = [];
    //this.productos = [];
        
  }

  getTotal(){
    for (let p of this.productos){
      this.totalCarrito += Number(p.precio);
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

  
  

}
