import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule  } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderinfoPage } from '../pages/orderinfo/orderinfo';
import { OrderpaidPage } from '../pages/orderpaid/orderpaid';
import { CustomerlocationPage } from '../pages/customerlocation/customerlocation';
import { UserhomePage } from '../pages/userhome/userhome';
import { OrderprofileviewPage } from '../pages/orderprofileview/orderprofileview';
import { PickuplocationPage } from '../pages/pickuplocation/pickuplocation';
import { GoogleMaps } from "@ionic-native/google-maps";
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { OngoingorderPage } from '../pages/ongoingorder/ongoingorder';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
        OrderinfoPage,
        UserhomePage,
        OrderprofileviewPage,
        PickuplocationPage,
        CustomerlocationPage,
        OrderpaidPage,
        OngoingorderPage,
    TabsPage,
    HeaderMenuComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule ,
    HttpClientModule,
        IonicModule.forRoot(MyApp)
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,LoginPage,
    HomePage,
        OrderinfoPage,
        UserhomePage,
        OrderprofileviewPage,
         PickuplocationPage,
         CustomerlocationPage,
         OrderpaidPage,
         OngoingorderPage,
    TabsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
              {provide: ErrorHandler, useClass: IonicErrorHandler}
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
