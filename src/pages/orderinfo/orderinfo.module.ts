import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderinfoPage } from './orderinfo';

@NgModule({
  declarations: [
    OrderinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderinfoPage),
  ],
})
export class OrderinfoPageModule {}
