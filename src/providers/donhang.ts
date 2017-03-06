import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {Auth} from '../providers/auth';


@Injectable()
export class Donhang {
  public data:any;
  public mactv:any;
  public lsttp:any;
  public madh:string;
  constructor(public http: Http, public auth:Auth ) {
    this.data=null;
    
  }

 
  loadKH(){
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve=>{
      let myheaders=new Headers({
      'Authorization' : 'bearer ' + window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: myheaders });
      let ctv=window.localStorage.getItem('mactv');
      this.http.get('http://112.78.2.16/plesk-site-preview/webapi.nadyphar.com.vn/112.78.2.16/api/dm_kh/getkh?mactv='+ctv, {headers:myheaders})
        //.map(res => res.json())
        .subscribe(data=>{
          this.data=data.json();
          resolve(this.data);
        });
    });
  }

  loadTP(){
    if(this.lsttp){
      return Promise.resolve(this.lsttp);
    }
    return new Promise(resolve=>{
      let myheaders=new Headers({
        'Authorization' : 'bearer ' + window.localStorage.getItem('token')
      });
      let options=new RequestOptions({headers:myheaders});
      this.http.get('http://112.78.2.16/plesk-site-preview/webapi.nadyphar.com.vn/112.78.2.16/api/dm_tp/gettp',options)
      .subscribe(data=>{
        this.lsttp=data.json();
        resolve(this.lsttp);
      });
    });
  }

  getmadh(){
    if(this.madh){
      return Promise.resolve(this.madh);
    }
    return new Promise(resolve=>{
      let myheaders=new Headers({
      'Authorization' : 'bearer ' + window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: myheaders });
      let ctv=window.localStorage.getItem('mactv');
      this.http.get('http://112.78.2.16/plesk-site-preview/webapi.nadyphar.com.vn/112.78.2.16/api/taodonhang/taomadh?mactv='+ctv, {headers:myheaders})
        .subscribe(data=>{
          this.madh=data.json();         
          resolve(this.madh);
        });
        
    });
   }


}
