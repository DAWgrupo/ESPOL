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
import { CarritoPage } from '../pages/carrito/carrito';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { HttpModule} from '@angular/http';
import { ValoresPage } from '../pages/valores/valores'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SeleccionMetodoPagoPage,
    CarritoPage,
    CheckoutPage,
    CarteraTarjetasPage,
    ValoresPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SeleccionMetodoPagoPage,
    CarritoPage,
    CheckoutPage,
    CarteraTarjetasPage,
    ValoresPage,


  ],
  providers: [
    HttpModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider
  ]
})
export class AppModule {}
