import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public showNavBar = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {   
      
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
     
  }
  
  showNav(navCtrl)
  {
      this.navCtrl.setRoot(LoginPage);
  }  

}
