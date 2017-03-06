import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Auth } from '../../providers/auth';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading:any;
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:Auth, public alertCrtl: AlertController, public loadingCtrl: LoadingController) {}

  login1(FormLogin){
    this.auth.login1(FormLogin.value).subscribe(data => {
      if(data){
        this.navCtrl.setRoot(TabsPage);
      }else{
        FormLogin.password = '';
        let alert = this.alertCrtl.create({
          title: 'Login Failed',
          subTitle: data.message,
          buttons: ['OK']
        })
        alert.present();
      }
    })
  }
getuser()
  {
    this.auth.getUsers().then(data=>{
      this.username=data.UserName;
      window.localStorage.setItem('mactv', data.UserName);
    });
  }
login(FormLogin){
    this.showLoader();
    this.auth.login(FormLogin.value).then(result => {
      this.loading.dismiss();
      //console.log(result);
      this.getuser();
      this.navCtrl.setRoot(TabsPage);
    }, (err)=>{
      this.loading.dismiss();
      //let loi=console.log(err);
      FormLogin.password = '';
        let alert = this.alertCrtl.create({
          title: 'Login Failed',
          //subTitle: message,
          buttons: ['OK']
        })
        alert.present();
    });
    
  }

  
  showLoader(){
    this.loading=this.loadingCtrl.create({
      content: 'Logging...'
    });
    this.loading.present();
  }
}
