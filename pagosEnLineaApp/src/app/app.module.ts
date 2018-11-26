import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {SeleccionMetodoPagoPage} from '../pages/seleccion-metodo-pago/seleccion-metodo-pago';
import {CarteraTarjetasPage} from '../pages/cartera-tarjetas/cartera-tarjetas';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CheckoutPage } from '../pages/checkout/checkout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CheckoutPage,
    SeleccionMetodoPagoPage,
    CarteraTarjetasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CheckoutPage,
    SeleccionMetodoPagoPage,
    CarteraTarjetasPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
