import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  selectedItem: any;
  cards: any[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.cards = [
      {"number" : "xxxx xxxx xxxx 7991", "holder_name" : "Juniver Jair Roman Macias", "expiry_year" : "2021", "expiry_month": "9", "type": "mc"}, 
      {"number" : "xxxx xxxx xxxx 0011", "holder_name" : "Juniver Jair Roman Macias", "expiry_year" : "2025" ,  "expiry_month": "8", "type": "vi"}
    ];

    this.items = [];
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SeleccionMetodoPagoPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionMetodoPagoPage');
  }

}
