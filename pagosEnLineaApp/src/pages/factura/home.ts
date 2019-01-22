import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,InfiniteScroll, Platform  } from 'ionic-angular';
import {EmailComposer} from '@ionic-native/email-composer';
 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Cordova } from '@ionic-native/core';

import { SeleccionMetodoPagoPage } from '../seleccion-metodo-pago/seleccion-metodo-pago';
import { ResumenDePagoPage } from '../resumen-de-pago/resumen-de-pago';
import { ValoresPage } from '../valores/valores';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 /* letterObj = {
    to: '',
    from: '',
    text: ''
  }*/
 
  pdfObj = null;
  nombrecliente: any;
  correo: any;
  body: any;
  total_value : number = 0;

 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener, public emailComposer: EmailComposer) { }
 
  createPdf() {
    var docDefinition = {
      content: [
        { text: '-PIZZERIA-', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Facturar a: ', style: 'subheader' },
        { text: this.nombrecliente },
        { text: 'Teléfono: ', style: 'subheader' },
        { text: 'Email: '+this.correo, style: 'subheader' },
 
       /* { text: 'To', style: 'subheader' },
        this.to, */
 
        { text: this.body, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'pizza de pepperoni',
            { text: 'Total a pagar: '+this.total_value, style: 'subheader' }
      
          ]
        }
      
      ],

      styles: {

        header: {
          fontSize: 16,
          bold: true,
        },

        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },

        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }

      }
    }
   this.pdfObj = pdfMake.createPdf(docDefinition);
   


  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  send(){
    let email ={
      to: this.correo,
      cc:[],
      bcc:[],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'file:///correos/www/file.pdf'
      ],
      subject:'factura',
      body:'Estimado cliente, se adjunta factura. ',
      isHtml: false,
      //app: "Gmail"
    }
    this.emailComposer.open(email);
  }

 
}
