import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CarteraTarjetasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartera-tarjetas',
  templateUrl: 'cartera-tarjetas.html',
})
export class CarteraTarjetasPage {

  selectedItem: any;
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, type: String, number: String}> = [];
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.getCards();
    

  
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
        "type": card.type
      };
      this.cards.push(tmp_card)
    }
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CarteraTarjetasPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarteraTarjetasPage');
  }

}
