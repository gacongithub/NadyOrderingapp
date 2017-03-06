import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Auth {
baseUrl:string = 'http://112.78.2.16/plesk-site-preview/webapi.nadyphar.com.vn/112.78.2.16/';
  options: RequestOptions;
  headers: Headers;
  public token:any;
  public data:any;
  constructor(public http: Http) {
    console.log('Hello Auth Provider');
  }

createAuthorizationHeader(headers: Headers){
    headers.append('Authorization', window.localStorage.getItem('token'));
  }

  private(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseUrl+'private', {
      headers: headers
    }).map(res => res.json());
  }
//Không dùng Promise => bị lỗi bất đồng bộ trong quá trình xử lý đăng nhập
  login1(data){

      var creds = "grant_type=password&username=" + data.username + "&password=" +data.password ;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.options=new RequestOptions({headers: this.headers});
      return this.http.post(this.baseUrl+"token", creds, this.options)
      .map(this.extractData);
   
  }

//dùng Promise để giải quyết vấn đề bất đồng bộ trong java.
  login(data){
    return new Promise((resolve, reject)=>{
      var creds = "grant_type=password&username=" + data.username + "&password=" +data.password ;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.options=new RequestOptions({headers: this.headers});
      return this.http.post(this.baseUrl+"token", creds, this.options)
      .subscribe(res=>{
        let data=res.json();
        this.token=data.access_token;
        window.localStorage.setItem('token', data.access_token);
        
        resolve(data);

        resolve(res.json());
      }, (err)=>{
        reject(err);
      });

    });
  }

   getUsers(){
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve=>{
      let myheaders=new Headers({
      'Authorization' : 'bearer ' + window.localStorage.getItem('token')
      });
      let options = new RequestOptions({ headers: myheaders });
      this.http.get('http://112.78.2.16/plesk-site-preview/webapi.nadyphar.com.vn/112.78.2.16/api/account/userinfo', {headers:myheaders})
        //.map(res => res.json())
        .subscribe(data=>{
          this.data=data.json();         
          resolve(this.data);
        });
        
    });
   }
    

  private extractData(res: Response){
    let body = res.json();
    if(body.access_token !=='underfined'){
      window.localStorage.setItem('token', body.access_token);
    };
    return body || {};
  }

  isLogged(){
    if(window.localStorage.getItem('token')){
      return true
    }else{
      return false;
    }
  }

  logout(){
    window.localStorage.removeItem('token');
    //window.location.reload();
    return true;
  }

}
