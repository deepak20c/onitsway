import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App,MenuController,AlertController,LoadingController } from 'ionic-angular';
import {Http}  from "@angular/http";
import { LoginPage } from '../login/login';
import { PickuplocationPage } from '../pickuplocation/pickuplocation';
import 'rxjs/add/operator/map';
import { CustomerlocationPage } from '../customerlocation/customerlocation';
/**
 * Generated class for the OngoingorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ongoingorder',
  templateUrl: 'ongoingorder.html',
})
export class OngoingorderPage {
  localuserid: string;
  curposts: any;
  resmobno:any;
  respickuplocation:any;
  resbusname:any;
  reslocalorderno:any;
  resbususerid:any;
  
  constructor(public viewCtrl: MenuController,public app :App,public navCtrl: NavController,public http: Http, public navParams: NavParams,public alertCtrl: AlertController,public loading: LoadingController) {
    this.navCtrl = navCtrl;
    this.curposts = null;
    this.localuserid = window.localStorage.getItem('session_userid');
   this.showcurorder();
   console.log(this.curposts);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OngoingorderPage');
  }
  logout()
  {
    window.localStorage.removeItem('session_userid');
    window.localStorage.removeItem('session_mobno');
    let nav = this.app.getRootNav();
    this.viewCtrl.close();
  nav.setRoot(LoginPage);
  }

showcurorder()
{
  let tempdata = {
    
      driver_userid:this.localuserid

  
    };
    
    this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/readdriverongoingorder.php',JSON.stringify(tempdata))

    .map(res => res.json())

      .subscribe(data =>
       {

        this.curposts = data.dumorderinfodata;
         
                 
         });
         console.log(this.curposts);
}
pickupinfo(dislocalorderno,disbusname,disbususerid)
{
this.reslocalorderno=dislocalorderno;
this.resbusname=disbusname;
this.resbususerid=disbususerid;
  let tempdata2 = {

    localpassbususerid:this.resbususerid


  };
  
 
  this.http.post('http://antonyraj.in/onitway/apilogic/businessuser_registration/readbusinessuser.php',JSON.stringify(tempdata2))

  .map(res => res.json())

    .subscribe(res =>
     {

        console.log(res);
       
          let dumbusprofiledata = res["dumbusprofiledata"];
          let dumbusprofiledata1 = dumbusprofiledata[0];
         
          this.resmobno=dumbusprofiledata1["bus_contactno"];
          this.respickuplocation=dumbusprofiledata1["bus_address"];
       
         
          this.pagenav();
        
               
       });
       
      

  

}
deliveryinfo(dislocalorderno)
{
  this.navCtrl.push(CustomerlocationPage,{
    passlocalorderno:dislocalorderno
 
  });
}
pagenav()
{
  this.navCtrl.push(PickuplocationPage,{
    passlocalorderno:this.reslocalorderno,
    passbusname:this.resbusname,
    passuserid:this.localuserid,
    passresmobno:this.resmobno,
    passpickuplocation:this.respickuplocation
  });

}
}