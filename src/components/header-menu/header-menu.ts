import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import {UserhomePage } from '../../pages/userhome/userhome';
import { OngoingorderPage } from '../../pages/ongoingorder/ongoingorder';
/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;
  localsessionuserid: string;
  localsessionmobno: string;
  constructor( public viewCtrl: MenuController,public app :App) {
    this.localsessionuserid = window.localStorage.getItem('session_userid');
    this.localsessionmobno = window.localStorage.getItem('session_mobno');
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
  }
  LogOut()
  {
    window.localStorage.removeItem('session_userid');
    window.localStorage.removeItem('session_mobno');
    let nav = this.app.getRootNav();
    this.viewCtrl.close();
  nav.setRoot(LoginPage);
  }
OrderTrackbtn()
{
  let nav = this.app.getRootNav();
    this.viewCtrl.close();
  nav.setRoot(OngoingorderPage);

}
UserHomebtn()
{
  let nav = this.app.getRootNav();
    this.viewCtrl.close();
  nav.setRoot(UserhomePage);

}
}
