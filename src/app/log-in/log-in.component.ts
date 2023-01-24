import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'api/authorization.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public phoneNumber: number;
  public otp: number;
  public showOtpField: boolean = false;
  public loading:boolean = false;

  constructor(private AuthService: AuthorizationService, private navigateService: Router) { }


  ngOnInit(): void {
  }

  LogIn() {
    var phoneString = this.phoneNumber.toString();
    if (phoneString.length == 10) {
      phoneString = "57" + phoneString;
    }
    this.loading = true;
    if (!this.otp) {
      this.AuthService.authorizationGet(phoneString).subscribe(res => {
      }, err => {
        this.loading = false;
        console.log("err",err);
      },()=>{
        this.phoneNumber = parseInt(phoneString);
        this.showOtpField = true;
        this.loading = false;
      });
    } else {
      this.AuthService.authorizationPost(phoneString, this.otp).subscribe(res => {
        if(res){
          this.loading = false;
          sessionStorage.setItem("userId", res.toString());
          this.navigateService.navigate(['/','dashboard'])
        }
      }, err => {
        this.loading = false;
        this.otp = null;
        alert("El código es incorrecto");
      })
    }
  }

}
