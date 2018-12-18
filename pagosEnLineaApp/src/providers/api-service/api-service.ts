
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  private API_URL = 'http://127.0.0.1:8000'

  constructor(public http: Http) {
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
    return new Promise(resolve => {
      this.http.get(this.API_URL+'/api/'+idU+'/cards?format=json').subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }
}
