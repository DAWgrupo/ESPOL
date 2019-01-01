
import { Http } from '@angular/http';
import { environment as ENV } from '../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {  LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  private API_URL = ENV.BASE_URL //'10.0.2.2:8000' //'http://127.0.0.1:8000'

  constructor(public http: Http,private iab: InAppBrowser, public loadingCtrl: LoadingController,public storage: Storage) {
    console.log('Hello ApiServiceProvider Provider');
  }

  getProductos() {
    return new Promise(resolve => {
      this.http.get(this.API_URL+'/api/producto/?format=json').subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  deleteProducto(idProducto): any {
    return this.http
      .delete(`${this.API_URL}/api/producto/` + idProducto)
      .toPromise()
      .then(res => console.log(res.toString()))
      .catch(err => console.log(err));
  }

  getCarritos() {
    return new Promise(resolve => {
      this.http.get(this.API_URL+'/api/carrito/?format=json').subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  getAllCards(idU) {

    let loading = this.loadingCtrl.create({
      content: 'Cargando tarjetas...'
    });
    loading.present();

    let cards:  Array< {holder_name: String, expiry_year: String, expiry_month: String, icon: String, number: String}> = [];
    return new Promise( (resolve, reject) => {
      this.http.get(this.API_URL + '/api/' + idU + '/cards?format=json').subscribe(data => {
        let response;
        response = data.json();
        
        for (let card of response.cards) {
          let expiry_month : String;
          if (Number(card.expiry_month) < 10 ){
            expiry_month = "0" + card.expiry_month;
          }else{
            expiry_month = card.expiry_month;
          }
          let tmp_card = {
            "number" : card.bin.slice( 1, 4) + " XXXX XXXX " + card.number,
            "holder_name" : card.holder_name,
            "expiry_year" : card.expiry_year.slice(2,5).toString(),
            "expiry_month": expiry_month,
            "icon": "../../assets/imgs/"+  card.type.toString()+".png"
          };
          console.log(card.type)
          cards.push(tmp_card)
        }
        loading.dismiss();
        resolve(cards);
      },error => {
        loading.dismiss();
        reject(new Error("No se pudo contactar servidor"))
      })
    });
  }
  /**
   * Crea una webview dentro de la app para usar el formulario paymentez de creacio de tarjeta de credito/debito
   * @param idU uuid del usuario autenticado
   */
  addCard(idU){
    const browser = this.iab.create(ENV.BASE_URL + "/api/" +idU+"/cards/add/?format=json"); //10.0.2.2:8000 for simulator or 127.0.0.1:8000 for local 
    browser.on('loadstop').subscribe(event => {
      
      // Enviando al webview los datos del usuario loggeado
      this.storage.get('email').then(email=>{
        console.log(email)
        browser.executeScript({ code: `localStorage.setItem( 'email', ${email} );` });
      })
      this.storage.get('userId').then(userId=>{
        console.log(userId)
        browser.executeScript({ code: `localStorage.setItem( 'userId', ${userId} );` });
      })
      



      // Cerrar webview al submittear formulario paymentez
      browser.executeScript({ code: "localStorage.setItem( 'submitted', '' );" });
      var loop = setInterval(function() {
          
        browser.executeScript({ code: "localStorage.getItem( 'submitted' )" }).then((respuestas)=>{

            var submitted = respuestas[ 0 ];
            if ( submitted ) {
                clearInterval( loop );
                browser.close();
                console.log(submitted)
            }
        
        });
      })
  
  });
    
  }
}


