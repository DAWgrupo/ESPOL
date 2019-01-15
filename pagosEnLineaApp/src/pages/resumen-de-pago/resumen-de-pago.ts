import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';



/**
 * Generated class for the ResumenDePagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resumen-de-pago',
  templateUrl: 'resumen-de-pago.html',
})

export class ResumenDePagoPage {

  selectedItems: Array<any>;
  total_value : number;
  pending_value : number = this.total_value;
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String, card_token: String, value: number, installments:number}> = [];
  enablePayment: boolean = false;
  enableWarning:boolean = false; 
  



  constructor(public navCtrl: NavController, public navParams: NavParams,private api: ApiServiceProvider, public alertCtrl: AlertController) {
    
    // Obtiene tarjetas seleccionadas para el pago desde la vista padre
    this.selectedItems = navParams.get('cards');
    this.total_value = navParams.get('total_value');
    if (this.selectedItems)
      this.cards=this.selectedItems;
  }

  /**
   * Invoca al componente resumen de pago para realizar el pago
   */
  resumenDePago() {
    this.navCtrl.push(ResumenDePagoPage, { cards:this.cards
    });
  }


  pagar(){
    let mensaje = "";

    
    let alert = this.alertCtrl.create({
      title: "Esta seguro de que desea continuar?",
      
      message: "El valor total de esta compra es $"+  this.total_value.toString(),
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.api.pay(this.cards).then((result) => { console.log(result['_body']) }) 
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
      }]
    });
    alert.present();
    //this.api.pay(this.cards).then((result) => { console.log(result['_body']) })   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    console.log(this.cards);
  }
  

}
