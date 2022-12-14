import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPasswordCrudService } from 'app/services/resetPasswordCrud.service';
import { passwordStrengthValidator } from 'app/utils/password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  newPass: string = '';
  confirmPass: string = '';
  showPassword: boolean = false;

  code: string = '';

  trials: number = 0;

  errorMessage: string = '';
  constructor(
    private router: Router,
    private resetPasswordSerivce: ResetPasswordCrudService
  ) {}
  goToSignIn() {
    this.router.navigate(['/login']);
  }

  reset() {
    this.trials++;
    if (this.trials > 3) {
      this.errorMessage = 'Too many trials. Please try again later.';
      return;
    }
    if (this.newPass !== this.confirmPass) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!passwordStrengthValidator(this.newPass)) {
      this.errorMessage =
        'Password must be at least 6 characters, 1 uppercase, 1 lowercase, 1 number';
      return;
    }

    this.resetPasswordSerivce
      .resetPassWithCode(this.code, this.newPass)
      .subscribe((res) => {
        console.log(res);
        if (res.status === 200) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = res.message;

          if (res.status === 403) {
            // wait 5 seconds and navigate to forgot password
            setTimeout(() => {
              this.router.navigate(['/forgot-password']);
            }, 5000);
          }
        }
      });
  }

  togglePassword(event: any) {
    this.showPassword = !this.showPassword;
  }
}
