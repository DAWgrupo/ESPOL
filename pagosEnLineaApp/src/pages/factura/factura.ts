import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
 
@Component({
  selector: 'page-factura',
  templateUrl: 'factura.html'
})

export class FacturaPage {
//arreglo de datos a presentar en factura
  letterObj = {
    Cliente: 'xxxxxxxxxx',
    Codigo: 'xxxxxxxxxx',
    Texto: ' '
  }
 
  pdfObj = null;
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }
 
  createPdf() {
    var docDefinition = {
      content: [
        { text: 'PIZZERIA XX', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Cliente', style: 'subheader' },
        { text: this.letterObj.Cliente },
 
        { text: 'Codigo de envio', style: 'subheader' },
        this.letterObj.Codigo,
 
        { text: this.letterObj.Texto, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Pizza de Pepperoni',
            'Cola',
            'Papas',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
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
      
}    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryAray = utf8.buffer;
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // se guarda el PDF en el directorio de datos aplicacion

        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
   
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // con esto se puede descargar la factura directamente desde el navegador
      this.pdfObj.download();
    }
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad FacturaPage');
  }
}