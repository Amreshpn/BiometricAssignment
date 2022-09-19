import { Component, OnInit } from '@angular/core';
import {
  AlertController, LoadingController, NavController,
} from "@ionic/angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registrationForm: FormGroup;
  newInputType: string;
  newIconType: string;
  renewInputType: string;
  renewIconType: string;
  loader: any;
  maxTime: string;
  maxTim: string;
  selectedAddress: any;
  usertoggle: any;
  isToggleBtnChecked: any;

  cameraData: any[];
  imagePath: any[];
  isdisabled: any;
  base64Image: any;


  errorMessages = {
    userName: [{ type: "required", message: "This field is mandatory" },
    { type: "pattern", message: "Please enter your Name" }],
    lastName: [{ type: "required", message: "This field is mandatory" },
    { type: "pattern", message: "Please enter your Name" }],

    phone: [
      { type: "required", message: "This field is mandatory" },
      { type: "pattern", message: "Please enter a valid Phone Number" },
    ],
    emailID: [{ type: "required", message: "This field is mandatory" },
    { type: "pattern", message: "Please enter a valid Email Address" }],
    loginusername: [{ type: "required", message: "This field is mandatory" },
    { type: "pattern", message: "Please enter your username" }],
    newPass: [{ type: "required", message: "This field is mandatory" }],
    renewPass: [
      { type: "required", message: "This field is mandatory" },
    ],
    form: [{ type: "notSame", message: "Passwords do not match" }],
  };
  constructor(

    public alertController: AlertController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public router: Router,
    private camera: Camera,


  ) {
    window.localStorage.setItem("crrTitle", "Mr.");
    debugger;
    this.usertoggle = false;
    this.isToggleBtnChecked = false;

    this.registrationForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        lastName: ["", Validators.required],

        genderm: [true],
        genderf: [false],
        usertoggle: [false],
        phone: [
          "",
          [Validators.required, Validators.pattern("^((\\+91-?))?[0-9]{10}$")],
        ],
        emailID: [
          "",
          [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        ],
        loginusername: ["", Validators.required],
        newPass: ["", Validators.required],
        renewPass: ["", Validators.required],
      },
      { validators: this.checkPasswords.bind(this) }
    );
    this.newInputType = "password";
    this.newIconType = "eye";
    this.renewInputType = "password";
    this.renewIconType = "eye";
    this.cameraData = [];
    this.imagePath = [];
    this.isdisabled = true;
  }

  ngOnInit() {
    debugger;
    console.log("On Page newUserRegistration!!");
    this.maxTime = new Date(new Date().getTime() - 864589654).toISOString();
    this.maxTim = this.maxTime.split("T")[0];
    console.log("newUserDate", this.maxTim);
  }
  myChange() {
    debugger;
    this.usertoggle = !this.isToggleBtnChecked;
    this.isToggleBtnChecked = this.usertoggle;
    //this.usertoggle=this.usertoggle==true?false:true;

  }

  proceedtoTestSelection() {
    debugger;
    if ((this.selectedAddress === undefined || this.selectedAddress === '')) {

      return;
    }
  }
  signin() {
    debugger;
    this.navCtrl.navigateRoot("home");

  }
  selectLocationfromMap() {
    this.navCtrl.navigateForward("map");
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get("newPass").value;
    let confirmPass = group.get("renewPass").value;
    return pass === confirmPass ? null : { notSame: true };
  }

  toggleNew() {
    debugger;
    if (this.registrationForm.get("newPass").value) {
      if (this.newInputType === "password") {
        this.newInputType = "text";
      } else if (this.newInputType === "text") {
        this.newInputType = "password";
      }
      if (this.newIconType === "eye") {
        this.newIconType = "eye-off";
      } else if (this.newIconType === "eye-off") {
        this.newIconType = "eye";
      }
    }
  }
  changegenderm() {
    this.registrationForm.get("genderf").setValue(false);
    this.registrationForm.controls.genderm.disable();
    this.registrationForm.controls.genderf.enable();
  }
  changegenderf() {
    this.registrationForm.get("genderm").setValue(false);
    this.registrationForm.controls.genderf.disable();
    this.registrationForm.controls.genderm.enable();
  }
  toggleRenew() {
    if (this.registrationForm.get("renewPass").value) {
      if (this.renewInputType === "password") {
        this.renewInputType = "text";
      } else if (this.renewInputType === "text") {
        this.renewInputType = "password";
      }
      if (this.renewIconType === "eye") {
        this.renewIconType = "eye-off";
      } else if (this.renewIconType === "eye-off") {
        this.renewIconType = "eye";
      }
    }
  }

  createNewUser() {
    let mobnumber = this.registrationForm.get("phone").value;
    let password = this.registrationForm.get("newPass").value;
    let confirmPassword = this.registrationForm.get("renewPass").value;
    let patientName = this.registrationForm.get("userName").value;
    let lastName = this.registrationForm.get("lastName").value;
    let gender =
      this.registrationForm.get("genderm").value === true ? "0" : "1";
    let emailID = this.registrationForm.get("emailID").value;
    let address = this.registrationForm.get("loginusername").value;

    window.localStorage.setItem("patientName", patientName);
    window.localStorage.setItem("mobnumber", mobnumber);
    window.localStorage.setItem("password", password);
    window.localStorage.setItem("confirmPassword", confirmPassword);
    window.localStorage.setItem("gender", gender);
    window.localStorage.setItem("emailID", emailID);
    window.localStorage.setItem("lastName", lastName);
    window.localStorage.setItem("address", address)

    this.navCtrl.navigateRoot("home");
  }
  captureImage() {
    debugger;
    var options = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 60,
      correctOrientation: true
    };


    this.camera.getPicture(options).then(
      (imageData) => {
        debugger;

        // imageData is either a base64 encoded string or a file URI
        var base64Image = "data:image/jpeg;base64," + imageData;
        window.localStorage.setItem("image", base64Image)
        this.cameraData.push(base64Image);
      },
      (err) => {
        // Handle error
      }
    );
  }

  pickImage() {
    debugger;

    const options: CameraOptions = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        debugger;

        // imageData is either a base64 encoded string or a file URI
        var base64Image = "data:image/jpeg;base64," + imageData;
        this.cameraData.push(base64Image);
        window.localStorage.setItem("image", base64Image)
      },
      (err) => {
        // Handle error
      }
    );
  }
  deletePhoto(index) {
    debugger;
    this.cameraData.splice(index, 1);
  }
  sucessAlert() {
    this.alertController
      .create({
        header: "Biometric",
        message: "Registration Successful",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              this.navCtrl.navigateForward("login");
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
  failedAlert(msg: string) {
    this.alertController
      .create({
        header: "Biometric",
        message: msg,
        buttons: ["OK"],
      })
      .then((res) => {
        res.present();
      });
  }
}

