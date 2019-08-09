import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderpaidPage } from './orderpaid';

@NgModule({
  declarations: [
    OrderpaidPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderpaidPage),
  ],
})
export class OrderpaidPageModule {}
