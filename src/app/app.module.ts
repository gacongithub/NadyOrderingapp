import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { Auth } from '../providers/auth';
import { Donhang } from '../providers/donhang';
import {KhachhangPage} from '../pages/khachhang/khachhang';
import {TaodonhangPage} from '../pages/taodonhang/taodonhang';
import {DonhangPage} from '../pages/donhang/donhang';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    KhachhangPage,
    TaodonhangPage,
    DonhangPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    KhachhangPage,
    TaodonhangPage, 
    DonhangPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Auth, Donhang]
})
export class AppModule {}
