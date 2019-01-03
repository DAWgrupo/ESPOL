import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ValoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valores',
  templateUrl: 'valores.html',
})
export class ValoresPage {
  productos: any;
  totalCarrito : number = 0;

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private carritoProvider: ApiServiceProvider) {
    this.getProductos();
    
  
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

  

}
