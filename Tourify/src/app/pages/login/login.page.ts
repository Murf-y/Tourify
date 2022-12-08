import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCrudService } from 'app/services/userCrud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string | undefined;
  password: string | undefined;

  constructor(private router: Router, private userSerive: UserCrudService) {}
  ngOnInit() {}

  signIn() {
    // validate email, password

    if (!this.email || !this.password) {
      return;
    }

    this.userSerive.loginUser(this.email, this.password).subscribe((res) => {
      console.log(res);

      // TODO show error message
      if (res.message) {
        return;
      } else {
        window.localStorage.setItem(
          'current_user',
          JSON.stringify(res.data.user)
        );
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
}
