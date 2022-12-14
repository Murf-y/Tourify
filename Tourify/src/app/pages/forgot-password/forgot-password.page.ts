import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPasswordCrudService } from 'app/services/resetPasswordCrud.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  errorMessage = '';
  email = '';

  trials = 0;
  constructor(
    private router: Router,
    private resetPasswordSerivce: ResetPasswordCrudService
  ) {}
  goToSignIn() {
    this.router.navigate(['/login']);
  }

  sendCode() {
    this.trials++;

    if (this.email === '') {
      this.errorMessage = 'Please enter your email';
    } else {
      if (this.trials > 3) {
        this.errorMessage = 'Too many attempts, try again later';
        return;
      }
      this.resetPasswordSerivce.postReset(this.email).subscribe((res) => {
        console.log(res);
        if (res.status === 404) {
          this.errorMessage = res.message;
        } else if (res.status === 200) {
          this.router.navigate(['/reset-password']);
        } else {
          this.errorMessage = 'Something went wrong';
        }
      });
    }
  }
}
