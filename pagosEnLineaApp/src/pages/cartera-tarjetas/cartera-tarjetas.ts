import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import {  AlertController } from 'ionic-angular';




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
  cards: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String, card_token: String}> = [];
  

  constructor(public navCtrl: NavController,
     public storage: Storage,
      public navParams: NavParams,
       private api: ApiServiceProvider,
        public loadingCtrl: LoadingController,
          public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.cards = navParams.get('cards');

    // Let's populate this page with some filler content for funzies
    
    

  
  }
  
   /** Añade una tarjeta de credito/debito a el cliente que se ha authenticado
   */
  addCard(){
    this.api.verifyUser().then((userInfo : any)=>{
      let value = userInfo["CEDULA"]
      this.api.addCard(value).then((result) => {
        if (result){
          this.api.getAllCards(value).then((data: Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String}>) => {
          let opt =  {
            cards: data
          }
          
          this.navCtrl.setRoot(CarteraTarjetasPage, opt);
          let alert = this.alertCtrl.create({
            title: 'Tarjeta Guardada',
            subTitle: 'Su tarjeta ha sido guardada con exito!',
            buttons: [{
              text: 'Ok',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                alert.dismiss();
              }
            }]
            

          });
          })
        }
      })
    })
  }

  
  deleteCard(card_token){
    this.api.deleteCard(card_token).then((result) => { 

      this.storage.get('userId').then( cedula=>{

        this.api.getAllCards(cedula).then((data) => {
          let opt =  {
            cards: data
          }
          this.navCtrl.setRoot(CarteraTarjetasPage, opt);
        })

      })
      
      
      
     })
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarteraTarjetasPage');
    console.log(this.cards);
    //this.addCard();
   
  }


}
