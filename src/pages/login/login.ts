import { Component } from '@angular/core';
import { IonicPage, NavController,  MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('HomePage');
    },
    error => { });
  }

  login() {
    this.auth.autenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('HomePage');
      },
      error => { });
  }

}
