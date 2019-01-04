import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Factura } from './factura';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//plugins para la creacion de PDF
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    Factura,
  ],
  imports: [
    IonicPageModule.forChild(Factura),
  ],

//manejo de errores al abrir PDF
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    FileOpener
  ]
})
export class FacturaPageModule {}