import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Donhang} from '../../providers/donhang';
import {DonhangPage} from'../../pages/donhang/donhang';
import {LstSanpham} from '../../pages/donhang/lst_sp';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-taodonhang',
  templateUrl: 'taodonhang.html',
 
})
@Injectable()
export class TaodonhangPage {
  loading:any;
  taodonhang: string = "caseKH";
  isAndroid: boolean = false;
  public data:any;
  //khachhang
  private kh: any; 
  private searchQuery: string = '';
  private items: any; 
  private headers: any;
  //sanpham
  private tp:any;
  private items1:any;
  testRadioOpen: boolean;
  testRadioResult;
  //chon_kh-sp
  khchon:any;
  spchon:any;
  sanphams: LstSanpham[] = [];
  soluongchon:any;
  quycachchon:any;
  _color:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public http:Http, public platform:Platform, public loadingCtrl:LoadingController, public dhservice:Donhang,
  public alertCtrl:AlertController) {
     this.isAndroid = platform.is('android');
     
    this._color="secondary"; 
    this.load_dmkh();
    this.load_dmtp();
    //this.initializeItems();
  }
  
  load_dmkh(){   
    this.showLoader();
    this.dhservice.loadKH()
    .then(data=>{
      this.loading.dismiss();
      this.kh=data;
      this.items=this.kh;
    });
  }
 load_dmtp(){
  //this.showLoader();
  this.dhservice.loadTP().then(data=>{
    //this.loading.dismiss();
    this.tp=data;
    this.items1=this.tp;
  });
 }
 getkh(kh)
 {
    this.khchon=kh.ten_kh;
    this._color="danger";
 }
 getsp(sp)
 {
   this.spchon=sp.ten_hh;
 }
 initializeItems(){
	  this.items = this.kh;
    this.items1=this.tp;
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  getItems(ev: any) {
    this.initializeItems();
    //this.load_dmkh();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.ten_kh.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
 
  getItems1(ev: any) {
    this.initializeItems();
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items1 = this.items1.filter((item1) => {
        return (item1.ten_hh.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

 showLoader(){
    this.loading=this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }
  
  TaoDonHang(){
    //this.navCtrl.push(DonhangPage,{_kh:this.khchon,_sp:this.spchon,_slg:this.soluongchon, _qc:this.quycachchon});
    this.navCtrl.push(DonhangPage,{_kh:this.khchon,_sp:this.sanphams});
  }

  doPrompt(sp) {
    let prompt = this.alertCtrl.create({
      title: sp.ten_hh,
      message: "Chọn số lượng",
      inputs: [
        {
          name: 'soluong',
          placeholder: 'Số lượng'
        },
        {
          name:'quycach',
          placeholder:'C: Chai, H: Hộp, T: Thùng'
        }
      ],
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
            this.spchon=sp.ten_hh;
            this.soluongchon=data.soluong;
            this.quycachchon=data.quycach;
            this.sanphams.push(
              new LstSanpham(this.spchon,this.soluongchon,this.quycachchon)
            )
          }
        }
      ]
    });
    prompt.present();
  }
}
