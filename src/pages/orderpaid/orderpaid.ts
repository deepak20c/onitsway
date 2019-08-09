import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { OrderinfoPage } from '../orderinfo/orderinfo';
import { CustomerlocationPage } from '../customerlocation/customerlocation';
import { UserhomePage } from '../userhome/userhome';
import { OrderprofileviewPage } from '../orderprofileview/orderprofileview';
import { PickuplocationPage } from '../pickuplocation/pickuplocation';
/**
 * Generated class for the OrderpaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderpaid',
  templateUrl: 'orderpaid.html',
})
export class OrderpaidPage {
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderpaidPage');
  }
  PaidSuccess()
  {

  }


}
