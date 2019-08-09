import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,MenuController,App, NavController,NavParams,AlertController,LoadingController} from 'ionic-angular';
import { OrderinfoPage } from '../orderinfo/orderinfo';
import {Http}  from "@angular/http";
import { UserhomePage } from '../userhome/userhome';
import 'rxjs/add/operator/map';
declare var google;
@IonicPage()
@Component({
  selector: 'page-customerlocation',
  templateUrl: 'customerlocation.html',
})
export class CustomerlocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  localsessionuserid:any;
  localsessionmobno:any;
  getorderno:any;
  cusname:any;
  cusmobno:any;
  cuslocation:any;
  deleircode:any;
  
  constructor(public viewCtrl: MenuController,public app :App,public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,public loading: LoadingController) {
    this.localsessionuserid = window.localStorage.getItem('session_userid');
      this.localsessionmobno = window.localStorage.getItem('session_mobno');
      this.getorderno= navParams.get('passlocalorderno');
      let tempdata = {
    
        newlocalorderno:this.getorderno
  
    
      };
      
      console.log(this.getorderno);
      this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/readdummyorderprofile.php',JSON.stringify(tempdata))
  
      .map(res => res.json())
  
        .subscribe(res =>
         {
  
           
            let sdumorderregdatas = res["dumordersingledata"];
            let dumorderregdata = sdumorderregdatas[0];
            this.cusname=dumorderregdata["dum_customer_name"];
            this.cusmobno=dumorderregdata["dum_mobile_no"];
            this.cuslocation=dumorderregdata["dum_location"];
            this.deleircode=dumorderregdata["deleircode"];

           
           // this.loadMap('13.0569','80.2425')
        var geocoder = new google.maps.Geocoder();
        // provide valid cuslocation
        var address = this.cuslocation;
        geocoder.geocode({ 'address': address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
          }


        });

        setTimeout(() => {
          this.loadMap(window['latitude'], window['longitude'])
        }, 3000);

      });


  }
  addMarker(map: any) {

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    // this.addInfoWindow(marker, content);



  }
  loadMap(a, b) {

    // var geocoder = new google.maps.Geocoder();
    // var address = this.getpickuplocation;
    // var latitude;
    // var longitude;
    // geocoder.geocode( { 'address': address}, function(results, status) {

    //   if (status == google.maps.GeocoderStatus.OK) {
    //       latitude = results[0].geometry.location.lat();
    //      longitude = results[0].geometry.location.lng();
    //     debugger
    //   } 
    // })


    let latLng = new google.maps.LatLng(a, b);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.map);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerlocationPage');
  }
  OrderInfo()
  {
  
    this.navCtrl.push(OrderinfoPage,{
      passlocalorderno:this.getorderno
     
    });
  }
  StatusOrderDelivered()
  {
    let tempdata5 = {
      
      getpassuserid:this.localsessionuserid,
      getpassorderno:this.getorderno
     

      
    };
    
    
    this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/updatedeliverorder.php',JSON.stringify(tempdata5))

    .map(res => res.json())

      .subscribe(res =>
       {


         if(res["status"]=="success")
                        {
                          let nav = this.app.getRootNav();
                          this.viewCtrl.close();
                             nav.setRoot(UserhomePage);
                  
                          
                          }

                          else
  
                                {
  
                                let alert = this.alertCtrl.create({
  
                                title:'DELIVERED FAIL..',
  
                                subTitle:(this.getorderno),
  
                                buttons: ['OK']
  
                                });
  
                                alert.present();
                                

                                let nav = this.app.getRootNav();
                                this.viewCtrl.close();
                                   nav.setRoot(UserhomePage);
  
                                }
                              });
  }

  Generateinvoice()
  {
    let tempdata5 = {
      
      getpassuserid:this.localsessionuserid,
      getpassorderno:this.getorderno
      

      
    };
    
    
    this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/updateinvoiceorder.php',JSON.stringify(tempdata5))

    .map(res => res.json())

      .subscribe(res =>
       {


         if(res["status"]=="success")
                        {
                          let nav = this.app.getRootNav();
                          this.viewCtrl.close();
                             nav.setRoot(UserhomePage);
                  
                          
                          }

                          else
  
                                {
  
                                let alert = this.alertCtrl.create({
  
                                title:'DELIVERED FAIL..',
  
                                subTitle:(this.getorderno),
  
                                buttons: ['OK']
  
                                });
  
                                alert.present();
                                

                                let nav = this.app.getRootNav();
                                this.viewCtrl.close();
                                   nav.setRoot(UserhomePage);
  
                                }
                              });
  }
}
