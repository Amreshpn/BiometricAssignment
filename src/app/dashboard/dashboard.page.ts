import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  logo: any;
  gender:any;
  mobnumber:any;
  lastName:any;
  patientName:any;
  emailID:any;
  address:any;
  constructor(
    private naCtrl: NavController,
    
  ) {

   }

  ngOnInit() {
    this.logo=window.localStorage.getItem("image")
    this.gender=window.localStorage.getItem("gender")
    this.mobnumber=window.localStorage.getItem("mobnumber")
    this.patientName=window.localStorage.getItem("patientName")
    this.lastName=window.localStorage.getItem("lastName")
    this.emailID=window.localStorage.getItem("emailID")
    this.address=window.localStorage.getItem("address")
  }

  logout() {
    this.naCtrl.navigateRoot("home")
  }
 
}
