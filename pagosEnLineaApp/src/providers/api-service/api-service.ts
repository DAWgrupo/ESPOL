
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

  setProducto(idProducto, producto): any {
   
    return this.http
        .put(`${this.API_URL}/api/producto/` + idProducto + '/', producto)
        .map(res => res.json())
        .toPromise()
        .then(res => console.log(res.toString()))
        .catch(err => console.log(err));
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

}
