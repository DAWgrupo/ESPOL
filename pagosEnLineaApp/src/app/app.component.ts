import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { CarritoPage } from '../pages/carrito/carrito';
import { CheckoutPage } from '../pages/checkout/checkout';
import {CarteraTarjetasPage} from '../pages/cartera-tarjetas/cartera-tarjetas';
import { HistorialPage } from '../pages/historial/historial'
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Storage } from '@ionic/storage';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public loadingCtrl: LoadingController, public api: ApiServiceProvider, public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Checkout', component: CheckoutPage },
      { title: 'Cartera de Tarjetas', component: CarteraTarjetasPage },
      { title: 'Carrito', component: CarritoPage },
      { title: 'Historial de Pagos', component: HistorialPage},

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {

      //mock de cookie para la info del usuario loggeado
      let token='alskmalskdmalskdmasldkmlkm12l3m12lk3m1l3k1mldkmsla'
      this.storage.set('userToken', token)


      this.api.verifyUser().then((data : any)=>{
        let cedula = data["CEDULA"] 
        let email = data["CORREO"]
        this.storage.set('userId', cedula) 
        this.storage.set('email', email) 

      })

      
      
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /**
   * Redirige al usuario a una de los modulos principales
   * @param page la pagina que representa uno de los modulos principales
   */
  openPage(page) {

    let opt = {}
    
    this.api.verifyUser().then((userInfo : any)=>{
      let value = userInfo["CEDULA"]
      console.log(value)
   
      if (page.title === "Cartera de Tarjetas"){

        this.api.getAllCards(value).then((data) => {
          opt =  {
            cards: data
          }
          this.nav.setRoot(page.component, opt);
        })
      }else{
        this.nav.setRoot(page.component, opt);
      }

  })
  }

}
