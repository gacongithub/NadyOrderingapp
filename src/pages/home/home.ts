import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {KhachhangPage} from '../khachhang/khachhang';
import {TaodonhangPage} from '../taodonhang/taodonhang';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  kh=TaodonhangPage;
  constructor(public navCtrl: NavController) {

  }
 
 navTaodonhang(){
   this.navCtrl.push(TaodonhangPage);
 }
}
