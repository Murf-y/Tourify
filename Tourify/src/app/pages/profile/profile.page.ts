import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';
import { UserCrudService } from 'app/services/userCrud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  currentUser!: User;

  profileUser!: User;

  viewingOwnProfile = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSerivce: UserCrudService,
    private location: LocationStrategy
  ) {
    this.currentUser = JSON.parse(
      sessionStorage.getItem('current_user') || '{}'
    );

    if (!this.currentUser || !this.currentUser.id) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id === this.currentUser.id) {
        this.viewingOwnProfile = true;
      }
      this.userSerivce.getUser(id).subscribe((res) => {
        this.profileUser = res.data.user;
        console.log(this.profileUser);
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
