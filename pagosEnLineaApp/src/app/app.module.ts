import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {SeleccionMetodoPagoPage} from '../pages/seleccion-metodo-pago/seleccion-metodo-pago';
import {CarteraTarjetasPage} from '../pages/cartera-tarjetas/cartera-tarjetas';
import { ResumenDePagoPage } from '../pages/resumen-de-pago/resumen-de-pago';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CheckoutPage } from '../pages/checkout/checkout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CarritoPage } from '../pages/carrito/carrito';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { HttpModule} from '@angular/http';
import { ValoresPage } from '../pages/valores/valores'
import { HistorialPage } from '../pages/historial/historial';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import {  AlertController } from 'ionic-angular';
import { BrMaskerModule } from 'brmasker-ionic-3';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SeleccionMetodoPagoPage,
    CarritoPage,
    CheckoutPage,
    CarteraTarjetasPage,
    ValoresPage,
    HistorialPage,
    ResumenDePagoPage
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrMaskerModule
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
    HistorialPage,
    ResumenDePagoPage


  ],
  providers: [
    HttpModule,
    HttpClientModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    InAppBrowser,
    AlertController,

  ]
})
export class AppModule {}
