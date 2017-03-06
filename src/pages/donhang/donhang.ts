import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';

import {LstSanpham} from '../../pages/donhang/lst_sp'
import {Auth} from '../../providers/auth';
import {Donhang} from '../../providers/donhang';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

/*
  Generated class for the Donhang page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-donhang',
  templateUrl: 'donhang.html'
})
export class DonhangPage {
  ctv:any
  khchon:any;
  spchon:any;
  sphams:any;
  data:any;
  madhg:string;
  private date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:Auth,public http: Http, public dh:Donhang,
  public alertCtrl:AlertController) {
    this.khchon=navParams.get('_kh');
    this.sphams=navParams.get('_sp')
    this.date =  new Date(); 

    this.get_lstsp();
    this.getctv();
    this.getdh();
  }

  get_lstsp()
  {
    this.spchon=this.sphams;
  }
  getctv()
  {
    this.auth.getUsers().then(data=>{
      this.ctv=data.UserName;
    });
  }
  getdh()
  {
    this.dh.getmadh().then(_madh=>{
      this.madhg=_madh;
    });
    
  }
  TaoDonHang() {
    let prompt = this.alertCtrl.create({
      title: "Tạo đơn hàng",
      message: this.madhg,
      
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            
          }
        }
      ]
    });
    prompt.present();
  }
  ionViewDidLoad() {
    console.log(this.dh.getmadh());
  }

}
