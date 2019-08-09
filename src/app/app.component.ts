import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserhomePage } from '../pages/userhome/userhome';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any=LoginPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkPreviousAuthorization();
    });
  }

  checkPreviousAuthorization(): void { 
    if((window.localStorage.getItem('session_userid') === "undefined" || window.localStorage.getItem('session_userid') === null) && 
       (window.localStorage.getItem('session_mobno') === "undefined" || window.localStorage.getItem('session_mobno') === null)) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = UserhomePage;
    }
  }
}

