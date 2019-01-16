import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { CheckoutPage } from '../checkout/checkout';
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
  codigoA: any;
  totalCarrito : number = 0;
  code: string;
  descuento: number = 0 ;

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private carritoProvider: ApiServiceProvider) {
    this.getProductos();
    
  
  }

  getTotal(){
    this.totalCarrito = 0;
    for (let p of this.productos){
      this.totalCarrito += Number(p.precio) * Number(p.cantidad);
    }
    this.totalCarrito = this.totalCarrito - this.descuento;
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

  consultaCodigo(event, codigo){
    this.carritoProvider.getCodigo(codigo)
    .then(data => {
      this.codigoA = data;
      console.log(this.codigoA);
      this.getDecuento();
    });

  }

  getDecuento(){
    if (this.codigoA.estado == false){
      this.descuento = this.codigoA.descuento;
      this.getTotal();
      this.removeCodigo(this.codigoA); 
    } else {
      console.log("Cupon ya usado")
    }
       
  }

  async removeCodigo(cupon) {
                
    const codigoAdd = {
        codigo: cupon.codigo,
        descuento: cupon.descuento,
        estado: true,
    };
  
    await this.carritoProvider.setCodigo(codigoAdd);
    

  }

 /**
   * Invoca al componente resumen de pago para realizar el pago
   */
  checkout() {
    this.navCtrl.push(CheckoutPage, { total_value: this.totalCarrito });
  }
  

}
