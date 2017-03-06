import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import {App} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
  
})
export class AboutPage {
  public username:any;
  constructor(public navCtrl: NavController, public auth:Auth, public app:App) {
    this.getuser();
  }
  getuser()
  {
    this.auth.getUsers().then(data=>{
      this.username=data.UserName;
      window.localStorage.setItem('mactv', data.UserName);
    });
  }
  logout(){
    this.auth.logout();
    //this.navCtrl.rootNav().setRoot(LoginPage);
    this.app.getRootNav().setRoot(LoginPage);
  }


}
