import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams,AlertController,LoadingController} from 'ionic-angular';
import { OrderpaidPage } from '../orderpaid/orderpaid';
import {Http}  from "@angular/http";
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-orderinfo',
  templateUrl: 'orderinfo.html',
})
export class OrderinfoPage {
  localsessionuserid:any;
  localsessionmobno:any;
  getorderno:any;
  cusname:any;
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
  deleircode:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,public loading: LoadingController) {
    this.localsessionuserid = window.localStorage.getItem('session_userid');
    this.localsessionmobno = window.localStorage.getItem('session_mobno');
    this.getorderno= navParams.get('passlocalorderno');
    this.showdetailsorder();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderinfoPage');
  }


  public showdetailsorder()
  {

    let tempdata = {
    
      newlocalorderno:this.getorderno

  
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
          this.deleircode=dumorderregdata["deleircode"];
          this.showbususerdetail();
         });
 
        
        }

        public show_orderitem()
        {
          let tempdata3 = {
    
            newlocalorderno:this.getorderno
      
        
          };

         this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/readdummyorderitems.php',JSON.stringify(tempdata3))

         .map(res => res.json()).subscribe(data => {
     
         this.curposts = data.itemdumorderinfodata;
         });
       

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
               
                
               
               
                
                       
               });
               this.show_orderitem();
       
        }



  OrderPaidGen()
  {
    this.navCtrl.push(OrderpaidPage);
  }

}
