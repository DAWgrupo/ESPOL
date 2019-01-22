import { BrowserModule } from '@angular/platform-browser';
import { IonicPageModule } from 'ionic-angular';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {EmailComposer} from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { SeleccionMetodoPagoPage } from '../seleccion-metodo-pago/seleccion-metodo-pago';
import { ResumenDePagoPage } from '../resumen-de-pago/resumen-de-pago';
import { ValoresPage } from '../valores/valores';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResumenDePagoPage,
    SeleccionMetodoPagoPage,
    ValoresPage
  ],
  imports: [
    IonicPageModule.forChild(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
