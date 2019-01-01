import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';



//declare var PaymentezForm;
//declare var Paymentez;
//declare var jQuery;

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
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String}> = [];
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

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, private api: ApiServiceProvider, public loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.cards = navParams.get('cards');

    // Let's populate this page with some filler content for funzies
    
    

  
  }
  
   /** Añade una tarjeta de credito/debito a el cliente que se ha authenticado
   */
  addCard(){
    this.storage.get('userId').then(value=>{
      this.api.addCard(value)
    })
  }

  


  itemTapped(event, item) {
    
    this.navCtrl.push(CarteraTarjetasPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarteraTarjetasPage');
    console.log(this.cards);
    //this.addCard();
   
  }


}
