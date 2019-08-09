import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController ,App ,MenuController} from 'ionic-angular';
import { OrderprofileviewPage } from '../orderprofileview/orderprofileview';
import { BrowserModule } from '@angular/platform-browser';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
/**
 * Generated class for the UserhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userhome',
  templateUrl: 'userhome.html',
})
export class UserhomePage {
  localuserid: string;
  curposts: any;
  constructor(public viewCtrl: MenuController,public app :App,public navCtrl: NavController,public http: Http, public navParams: NavParams,public alertCtrl: AlertController,public loading: LoadingController) {
    this.navCtrl = navCtrl;
    this.curposts = null;
    this.localuserid = window.localStorage.getItem('session_userid');
    this.http.get('http://antonyraj.in/onitway/apilogic/orderprofile/readdummyordernotify.php').map(res => res.json()).subscribe(data => {
        this.curposts = data.dumorderinfodata;
       
        
   });
   console.log(this.curposts);
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.viewCtrl.enable(true);
  }
  ionViewDidLoad() {
        console.log('ionViewDidLoad UserhomePage');
  }

viewprofile(localorderno) {

  
  this.navCtrl.push(OrderprofileviewPage,{
    passlocalorderno:localorderno
  });
  
}
  

logout()
  {
    window.localStorage.removeItem('session_userid');
    window.localStorage.removeItem('session_mobno');
    let nav = this.app.getRootNav();
    this.viewCtrl.close();
  nav.setRoot(LoginPage);
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
