import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { UserCrudService } from 'app/services/userCrud.service';
import { emailValidator } from 'app/utils/email';
import { passwordStrengthValidator } from 'app/utils/password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // add username, email, password binding

  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(private router: Router, private userSerive: UserCrudService) {}

  ngOnInit() {}

  goToSignIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    // validate username, email, password

    if (!this.username || !this.email || !this.password) {
      return;
    }

    // TODO show error message
    if (this.username.length < 2) {
      return;
    }

    // TODO show error message
    if (!emailValidator(this.email)) {
      return;
    }

    // TODO show error message
    if (!passwordStrengthValidator(this.password)) {
      return;
    }

    this.userSerive
      .createUser(this.username, this.email, this.password)
      .subscribe((res) => {
        // TODO show error message
        if (res.message) {
          console.log(res);
          return;
        } else {
          let user: User = res.data.user;
          window.sessionStorage.setItem('current_user', JSON.stringify(user));
          this.router.navigate(['/tabs']);
        }
      });
  }
}
