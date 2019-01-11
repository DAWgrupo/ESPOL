import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SeleccionMetodoPagoPage } from '../seleccion-metodo-pago/seleccion-metodo-pago';
import { ResumenDePagoPage } from '../resumen-de-pago/resumen-de-pago';
import { BrMaskerModule } from 'brmasker-ionic-3';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  
  selectedItems: Array<any>;
  total_value : number = 10;
  pending_value : number = this.total_value;
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String, card_token: String, value: number}> = [];
  enablePayment: boolean = false;
  enableWarning:boolean = false;
/**
 * Elimina una tarjeta de la lista de metodos de pago seleccionados para esta compra
 * @param textInput input del formulario que contiene el valor a pagar con una sola tarjeta
 * @param i numero entero que representa a una tarjeta 
 */
removeCard(textInput: any, i:number){
  textInput.value = "";
  this.cards.splice(i,1);
  this.updatePendingValue();

}
/**
 * Actualiza los valores a pagar con cada tarjeta y el valor pendiente a pagar
 * @param textInput input del formulario que contiene el valor a pagar con una sola tarjeta
 * @param i numero entero que representa a una tarjeta seleccionada para realizar un pago
 */
updateValues(textInput: any, i: number){
  this.cards[i].value = Number(textInput.value.replace(/\s/g, ""));
  this.updatePendingValue();
}

/**
 * Actualiza el valor total pendiente a pagar
 */
updatePendingValue(){
  this.enablePayment = false;
  this.enableWarning = false;
  this.pending_value = this.total_value;
  for (let card of this.cards){
    if (card.value)
      this.pending_value = this.pending_value - card.value;
  }

  if (this.pending_value === 0){
    this.enablePayment = true;
  }
  if (this.pending_value < 0){
    this.enableWarning = true;
  }
}



/**
 * Invoca al componente Seleccion de metodo de pago para seleccionar tarjetas para pagar
 * 
 * 
 */
aniadirTarjeta() {
  this.navCtrl.push(SeleccionMetodoPagoPage, { cards:this.cards
  });
}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    // Obtiene tarjetas seleccionadas para el pago desde la vista padre (Seleccion de metodo de pago)
    this.selectedItems = navParams.get('cards');
    if (this.selectedItems)
      this.cards=this.selectedItems;
  }

  /**
   * Invoca al componente resumen de pago para realizar el pago
   */
  resumenDePago() {
    this.navCtrl.push(ResumenDePagoPage, { cards:this.cards, total_value: this.total_value
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    console.log(this.cards);
  }

}
