
import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,MenuController,App,NavController,Platform,NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { UserhomePage } from '../userhome/userhome';
import { CustomerlocationPage } from '../customerlocation/customerlocation';
declare var google;

@IonicPage()
@Component({
  selector: 'page-pickuplocation',
  templateUrl: 'pickuplocation.html',
})
export class PickuplocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  localpasslocalorderno:any;
  getorderno:any;
  getresname:any;
  getmobno:any;
  getpickuplocation:any;
  localsessionuserid:any;
  localsessionmobno:any;
  
  latitude: any;
  longitude: any;
 
  Destination: any = 'Chennai';
  MyLocation: any;

  constructor(public viewCtrl: MenuController,public app :App, public plt: Platform,public navCtrl: NavController, 
    public navParams: NavParams,public http: Http,public alertCtrl: AlertController,public loading: LoadingController) {
      this.localsessionuserid = window.localStorage.getItem('session_userid');
      this.localsessionmobno = window.localStorage.getItem('session_mobno');
      this.getorderno= navParams.get('passlocalorderno');
      this.getresname= navParams.get('passbusname');
      this.getmobno= navParams.get('passresmobno');
      this.getpickuplocation= navParams.get('passpickuplocation');
      let geocoder = new google.maps.Geocoder;
      var address = this.getpickuplocation;
      geocoder.geocode({ 'address': address }, function (results, status) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        // this.loadMap();
      })
      setTimeout(() => {
        this.loadMap(window['latitude'], window['longitude'])
      }, 3000);
  
      //this.calculateAndDisplayRoute();
      //this.loadMap();
//this.calculateAndDisplayRoute();
//this.loadMap();


    }
   
  
  ionViewDidLoad() {
   
  }
  
  logout() {
    console.log("dd");
    window.localStorage.removeItem('session_userid');
    window.localStorage.removeItem('session_mobno');
      this.navCtrl.push(LoginPage);
          
  }   
  customerlocation()
  {
    this.navCtrl.push(CustomerlocationPage,{
      passlocalorderno:this.getorderno
   
    });
    
  }
  StatusOrderPickup()
  {


      let tempdata5 = {
      
        getpassuserid:this.localsessionuserid,
        getpassorderno:this.getorderno
       
  
        
      };
      
      
      this.http.post('http://antonyraj.in/onitway/apilogic/orderprofile/updatepickuporder.php',JSON.stringify(tempdata5))
  
      .map(res => res.json())
  
        .subscribe(res =>
         {
  
  
           if(res["status"]=="success")
                          {
                            let nav = this.app.getRootNav();
                            this.viewCtrl.close();
                               nav.setRoot(CustomerlocationPage,{
                                passlocalorderno:this.getorderno
                             
                              });
                    
                            

  
                              
                               
  
                                
                          }
                          else
  
                                {
  
                                let alert = this.alertCtrl.create({
  
                                title:'PICKUP FAIL..',
  
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
   /* calculateAndDisplayRoute() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

 // Try HTML5 geolocation.
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    
    map.setCenter(pos);
    this.MyLocation=new google.maps.Latlong(pos);
  }, function() {
   
  });
} else {
  // Browser doesn't support Geolocation
  
}




    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  } */

  /* calculateAndDisplayRoute() {

   let directionsService = new google.maps.DirectionsService;
   let directionsDisplay = new google.maps.DirectionsRenderer;
   const map = new google.maps.Map(this.mapElement.nativeElement, {
     zoom: 7,
     center: {lat: 41.85, lng: -87.65}
   });
   directionsDisplay.setMap(map);

// Try HTML5 geolocation.
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position) {
   var pos = {
     lat: position.coords.latitude,
     lng: position.coords.longitude
   };

   
   map.setCenter(pos);
   this.MyLocation=new google.maps.Latlong(pos);
 }, function() {
  
 });
} else {
 // Browser doesn't support Geolocation
 
}

   directionsService.route({
     origin: this.MyLocation,
     destination: this.Destination,
     travelMode: 'DRIVING'
   }, function(response, status) {
     if (status === 'OK') {
       directionsDisplay.setDirections(response);
     } else {
       window.alert('Directions request failed due to ' + status);
     }
   });
 } */


 loadMap(a, b) {
  let latLng = new google.maps.LatLng(a, b);

  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  this.addMarker(this.map);

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
 
 
}
