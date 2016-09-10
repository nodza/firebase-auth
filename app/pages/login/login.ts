import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
  public loginForm: any;
  public submitAttempt: any;
  // public alertCtrl: any;
  // public loadingCtrl: any;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser(){

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.nav.setRoot(HomePage);
      }, error => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      loading.present();
    }
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}
