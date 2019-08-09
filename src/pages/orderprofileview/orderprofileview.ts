import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { PickuplocationPage } from '../pickuplocation/pickuplocation';
import { LoginPage } from '../login/login';

import {Http, Headers, RequestOptions}  from "@angular/http";

//import { BusinessloginPage } from '../businesslogin/businesslogin';
//import { OrderallocatePage } from '../orderallocate/orderallocate';
import 'rxjs/add/operator/map';
import { UserhomePage } from '../userhome/userhome';

@IonicPage()
@Component({
  selector: 'page-orderprofileview',
  templateUrl: 'orderprofileview.html',
})
export class OrderprofileviewPage {
  @ViewChild("deltime") deltime;
    cusname:any;
    valcountorder:number=0;
  cusmobno:any;
  cuslocation:any;
  businessname:any;
  bususerid:any;
  paytype:any;
  deltype:any;
  totcost:any;
  curposts: any;
  respickuplocation:any;
  resmobno:any;
  localpasslocalorderno:any;
  data2:any;
  localuserid:any;
  disdeltimetype:any;
  buscattype:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,public loading: LoadingController) {
    this.curposts=null;
    this.localuserid = window.localStorage.getItem('session_userid');
    this.localpasslocalorderno= navParams.get('passlocalorderno');
    this.showdetailsorder();
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderprofileviewPage');
  }
  selectdeltimetype(delval) {
    this.disdeltimetype = '';
    this.disdeltimetype = delval;
  }
  Showpickuplocation()
  {

     if(this.localpasslocalorderno== '')
    {
      let alert = this.alertCtrl.create({
  
        title:"Alert",
  
        subTitle:"Order No is Empty",
  
        buttons: ['OK']
  
        });
  
        alert.present();
       
    }

    else if(this.disdeltimetype== '')
  {
    let alert = this.alertCtrl.create({

      title:"Alert",

      subTitle:"Pickup Time Is Empty",

      buttons: ['OK']

      });

      alert.present();
      this.deltime.setFocus();
  }

else
{
  if(this.valcountorder<2)
  {
  
    let tempdata5 = {
    
      getpassuserid:this.localuserid,
      getpassorderno:this.localpasslocalorderno,
      getordervalue:this.disdeltimetype

      
    };
    
    
    this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/updateacceptorder.php',JSON.stringify(tempdata5))

    .map(res => res.json())

      .subscribe(res =>
       {


         if(res["status"]=="success")
												{
											
									
													
														

														
														  this.navCtrl.push(PickuplocationPage,{
                                passlocalorderno:this.localpasslocalorderno,
                                passbusname:this.businessname,
                                passuserid:this.localuserid,
                                passresmobno:this.resmobno,
                                passpickuplocation:this.respickuplocation
                              });

															
												}
												else

															{

															let alert = this.alertCtrl.create({

															title:'ORDER FAIL..',

                              subTitle:(this.localpasslocalorderno),

															buttons: ['OK']

															});

															alert.present();
															this.navCtrl.push(UserhomePage);

															}



    
              

               

              });
     
            }
   
          
          else
          {
            let alert = this.alertCtrl.create({

              title:'LIMIT EXCEED',

              subTitle:("CURRENTLY 2 ORDER WAITING.."),

              buttons: ['OK']

              });

              alert.present();
              this.navCtrl.push(UserhomePage);

          }
        }
    
  }
  logout() {
    window.localStorage.removeItem('session_userid');
    window.localStorage.removeItem('session_mobno');
  
    this.navCtrl.push(LoginPage);
          
  }   
  public showdetailsorder()
  {

    let tempdata = {
    
      newlocalorderno:this.localpasslocalorderno

  
    };
    
    
    this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/readdummyorderprofile.php',JSON.stringify(tempdata))

    .map(res => res.json())

      .subscribe(res =>
       {

         
          let sdumorderregdatas = res["dumordersingledata"];
          let dumorderregdata = sdumorderregdatas[0];
         
          this.cusname=dumorderregdata["dum_customer_name"];
          this.cusmobno=dumorderregdata["dum_mobile_no"];
          this.businessname=dumorderregdata["dum_business_name"];
          this.totcost=dumorderregdata["dum_info_totalamt"];
          this.paytype=dumorderregdata["dum_info_paytype"];
          this.deltype=dumorderregdata["dum_info_deltype"];
          this.bususerid=dumorderregdata["dum_info_bususerid"];
          this.cuslocation=dumorderregdata["dum_location"];
          this.showbususerdetail();
         });
 
        
        }

        public show_orderitem()
        {
          let tempdata3 = {
    
            newlocalorderno:this.localpasslocalorderno
      
        
          };

         this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/readdummyorderitems.php',JSON.stringify(tempdata3))

         .map(res => res.json()).subscribe(data => {
     
         this.curposts = data.itemdumorderinfodata;
         });
          this.showlimit();

        }
        public showbususerdetail()
        {
         
          let tempdata2 = {
    
            localpassbususerid:this.bususerid
      
        
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
                  this.buscattype=dumbusprofiledata1["bus_trade_category"];
                
                  
               
                
                       
               });
               this.show_orderitem();
       
        }


        
       
  
        CancelOrder()
        {
          this.navCtrl.push(UserhomePage);
        }
  

showlimit()
{
  let tempdata8 = {
    
    driver_userid:this.localuserid
   

    
  };
  
  
  this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/getcurordercount.php',JSON.stringify(tempdata8))

  .map(res => res.json())

    .subscribe(res =>
     {


       if(res["status"]=="success")
                      {

                        this.valcountorder=res["ordercount"];
                      }
                      else
                      {
                        this.valcountorder=0;
                      }

                    });
                    
                
}

}
