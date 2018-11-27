import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { SeleccionMetodoPagoPage } from '../seleccion-metodo-pago/seleccion-metodo-pago';


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
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, type: String, number: String, value: number}> = [];
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

removeCard(textInput: any, i:number){
  textInput.value = "";
  this.cards.splice(i,1);
  this.updatePendingValue();

}

updateValues(textInput: any, i: number){
  this.cards[i].value = Number(textInput.value);
  this.updatePendingValue();
}

updatePendingValue(){
  this.pending_value = this.total_value;
  for (let card of this.cards){
    if (card.value)
      this.pending_value = this.pending_value - card.value;
  }
}

getCards(){
  for (let card of this.response.cards) {
    let expiry_month : String;
    if (Number(card.expiry_month) < 10 ){
      expiry_month = "0" + card.expiry_month;
    }
    let tmp_card = {
      "number" : card.bin.slice( 1, 5) + " XXXX XXXX " + card.number,
      "holder_name" : card.holder_name,
      "expiry_year" : card.expiry_year.slice(2,5).toString(),
      "expiry_month": expiry_month,
      "type": card.type,
      "value": 0
    };
    this.cards.push(tmp_card)
  }
}

itemTapped(event, item) {
  // That's right, we're pushing to ourselves!
  this.navCtrl.push(SeleccionMetodoPagoPage, { cards:this.cards
  });
}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.getCards();
    this.selectedItems = navParams.get('cards');
    if (this.selectedItems)
      this.cards=this.selectedItems;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
