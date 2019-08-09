import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  localuserid: string;
  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
    this.localuserid = window.localStorage.getItem('session_userid');
  }
  
  logout() : void  {
    window.localStorage.removeItem('session_userid');
    window.localStorage.removeItem('session_mobno');

    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();         
}   
ionViewDidLoad() {
  console.log('ionViewDidLoad Homepage');
} 
}
