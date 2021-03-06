import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the SeleccionMetodoPagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seleccion-metodo-pago',
  templateUrl: 'seleccion-metodo-pago.html',
})
export class SeleccionMetodoPagoPage {
  selectedItems: any;
  //c: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String}> = [];
  total_value: number;
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String, card_token: String}> = [];
  response: any = 
  {
    "cards": [
        {
            "bin": "511915",
            "status": "review",
            "token": "17121538682542236138",
            "holder_name": "citlali calderon",
            "expiry_year": "2020",
            "expiry_month": "9",
            "transaction_reference": "CI-473",
            "type": "vi",
            "number": "7991"
        },
        {
            "bin": "422023",
            "status": "valid",
            "token": "15363681013452573066",
            "holder_name": "citlali calderon",
            "expiry_year": "2020",
            "expiry_month": "9",
            "transaction_reference": null,
            "type": "mc",
            "number": "8431"
        },
        {
            "bin": "453254",
            "status": "valid",
            "token": "10135134879450157925",
            "holder_name": "citlali calderon",
            "expiry_year": "2020",
            "expiry_month": "9",
            "transaction_reference": null,
            "type": "vi",
            "number": "8311"
        }
    ],
    "result_size": 3
};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: ApiServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItems = navParams.get('cards');
    this.total_value = navParams.get('total_value');

    // Let's populate this page with some filler content for funzies
    this.getCards('900909009111');
    

  
  }
  getCards(value){
    this.api.getAllCards(value).then((data:any) => {
     this.cards = data;
    })
    console.log(this.selectedItems);
    //console.log(this.cards);
    console.log(this.cards.filter( ( el ) =>  this.selectedItems.indexOf( el ) < 0));
    this.cards = this.cards.filter( ( el ) =>  this.selectedItems.indexOf( el ) < 0);
  }

  /**
 * Invoca al componente Checkout y envia las tarjetas para pagar
 * 
 * @param item tarjeta seleccionada
 */
  itemTapped(item) {
    let res = this.selectedItems.find(card => card.number === item.number)
    if (!res){
      this.selectedItems.push(item)
      this.navCtrl.push(CheckoutPage, {
        cards: this.selectedItems,
        total_value: this.total_value, 
      });
   }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionMetodoPagoPage');
  }

}

