import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserhomePage } from '../userhome/userhome';
import { HttpClientModule } from '@angular/common/http';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public viewCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private http: Http, public loading: LoadingController) 
  {
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.viewCtrl.enable(false);
  }
  @ViewChild("username") username;

  @ViewChild("password") password;
  
  data:string;
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');



  }
  signIn() : void {

    if(this.username.value== '')
    {
      let alert = this.alertCtrl.create({

        title:"Alert",

        subTitle:"User Name is Empty ",

        buttons: ['OK']

        });

        alert.present();
    }
    else if(this.password.value== '')
    {
      let alert = this.alertCtrl.create({

        title:"Alert",

        subTitle:"Password is Empty",

        buttons: ['OK']

        });

        alert.present();
    }
    else
    {
    var headers = new Headers();

									headers.append("Accept", 'application/json');

									headers.append('Content-Type', 'application/json' );

									let options = new RequestOptions({ headers: headers });

									let data = {

													driverphone_no: this.username.value,

													driverpwd: this.password.value

												};

									let loader = this.loading.create({

									content: 'Processing please wait…',

									});

									loader.present().then(() => {

									this.http.post('http://antonyraj.in/onitway/apilogic/user_login/driverlogin.php',JSON.stringify(data),options)

									.map(res => res.json())

										.subscribe(res =>
										 {

												console.log(res)

												loader.dismiss()

												
												console.log(res["status"])
												if(res["status"]=="success")
												{
													window.localStorage.setItem('session_userid', res["userid"]);
													window.localStorage.setItem('session_mobno', res["mobno"]);
									
													
															let alert = this.alertCtrl.create({

															title:"Success",

															subTitle:(res["userid"]),

															buttons: ['OK']

															});

															alert.present();
															this.navCtrl.push(UserhomePage);
												}
												else

															{

															let alert = this.alertCtrl.create({

															title:'ERROR',

															subTitle:"Your Login Username or Password is invalid",

															buttons: ['OK']

															});

															alert.present();
															this.navCtrl.push(LoginPage);

															}

										});

									});

								}





  }
}
