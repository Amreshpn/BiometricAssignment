import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { AlertController, NavController } from '@ionic/angular';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  note: any;
  inputSelected: boolean;
  passSelected: boolean;
  passIconType: string = "";
  passwordtoggle: 'eye';
  username: string;
  password: string;

  loginUserName: any
  loginUserPassword: any;
  showpassword = false;
  constructor(
    public admob: AdMobFree,
    private faio: FingerprintAIO,
    public alertController: AlertController,
    private navCtrl: NavController
    ) {
    this.inputSelected = false;
    this.passSelected = false;
    this.loginUserName = window.localStorage.getItem("emailID");
    this.loginUserPassword = window.localStorage.getItem("password");


  }

  ionViewDidEnter() {
    this.passIconType = "eye";
  }
  public showFingerprintAuthDlg() {

    this.faio.isAvailable().then((result: any) => {
      console.log(result)

      this.faio.show({
        cancelButtonTitle: 'Cancel',
        description: "Some biometric description",
        disableBackup: true,
        title: 'Scanner Title',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'This SubTitle'
      })
        .then((result: any) => {
          console.log(result)
          alert("Successfully Authenticated!")
          this.navCtrl.navigateForward("dashboard")
        })
        .catch((error: any) => {
          console.log(error)
          alert("Match not found!")
        });

    })
      .catch((error: any) => {
        console.log(error)
      });
  }


  changeInputBorder(type: boolean) {
    this.inputSelected = type;
  }
  changePassBorder(type: boolean) {
    this.passSelected = type;
  }
  togglePassword(): void {
    this.showpassword = !this.showpassword;
    if (this.passIconType === 'eye') {
      this.passIconType = "eye-off";
    }
    else {
      this.passIconType = "eye";
    }
  }


  loginAction() {
    if(this.username==this.loginUserName && this.password==this.loginUserPassword){
      console.log("Login Sucess....");
      this.navCtrl.navigateForward("dashboard")
      this.showalert("Login Sucess")
    }else{
      console.log("Please check your user id and password aganin!")
      this.showalert("Please check your user id and password aganin!")
    }
  }

  logWithFaceid(){
    this.showalert("work in progress........");
  }

  signUp(){
    this.navCtrl.navigateForward("signup")
  }

  showalert(msg) {
    this.alertController.create({
      header: 'Biometric',
      message: msg,
      buttons: ['OK']

    }).then(res => {
      this.note = window.localStorage.getItem("Note")
      res.present();

    });
  }
}
