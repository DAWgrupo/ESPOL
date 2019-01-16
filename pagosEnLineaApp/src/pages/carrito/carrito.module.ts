import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPage } from './carrito';
import { ValoresPage } from '../valores/valores'

@NgModule({
  declarations: [
    CarritoPage,
    ValoresPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPage),
  ],
})
export class CarritoPageModule {}
