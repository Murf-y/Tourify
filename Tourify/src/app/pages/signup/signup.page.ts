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

  showPassword = false;
  errorMessage: string | null = null;

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

    if (this.username.length < 2) {
      this.errorMessage = 'Username must be at least 2 characters long';
      return;
    }

    if (!emailValidator(this.email)) {
      this.errorMessage = 'Invalid email';
      return;
    }

    if (!passwordStrengthValidator(this.password)) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    this.errorMessage = null;

    this.userSerive
      .createUser(this.username, this.email, this.password)
      .subscribe((res) => {
        if (res.message) {
          this.errorMessage = res.message;
          console.log(res);
          return;
        } else {
          let user: User = res.data.user;
          window.sessionStorage.setItem('current_user', JSON.stringify(user));
          this.router.navigate(['/tabs']);
        }
      });
  }

  togglePassword(event: any) {
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }
}
