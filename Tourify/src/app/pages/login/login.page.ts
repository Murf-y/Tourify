import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserCrudService } from 'app/services/userCrud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string | undefined;
  password: string | undefined;

  showPassword = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private userSerive: UserCrudService) {}

  signIn() {
    if (!this.email || !this.password) {
      return;
    }

    this.userSerive.loginUser(this.email, this.password).subscribe((res) => {
      if (res.message) {
        this.errorMessage = res.message;
        return;
      } else {
        window.sessionStorage.setItem(
          'current_user',
          JSON.stringify(res.data.user)
        );
        this.errorMessage = null;
        this.router.navigate(['/tabs']);
      }
    });
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  togglePassword(event: any) {
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }
}
