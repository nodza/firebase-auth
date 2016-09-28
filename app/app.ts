import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      var config = {
        apiKey: "AIzaSyAShB7f_bIKmBntV_6c8BI8VmOFQlzE3oE",
        authDomain: "moto-auth.firebaseapp.com",
        databaseURL: "https://moto-auth.firebaseio.com",
        storageBucket: "moto-auth.appspot.com",
        messagingSenderId: "844825068725",
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // If there's a user take him to the home page.
          this.rootPage = HomePage;
        } else {
          // If there's no user logged in send him to the LoginPage
          this.rootPage = LoginPage;
        }
      });

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
