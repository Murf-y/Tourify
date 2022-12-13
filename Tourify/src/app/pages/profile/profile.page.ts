import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  leaderboardUsers: User[] = [];
  page = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSerivce: UserCrudService,
    private location: LocationStrategy,
    private modalController: ModalController
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

  ionViewWillEnter() {
    this.userSerivce.getLeaderboard(this.page).subscribe((res) => {
      console.log(res);
      this.leaderboardUsers = this.leaderboardUsers.concat(res.data.users);
    });
  }
  goBack() {
    this.location.back();
  }

  loadMore(event: any) {
    this.page++;
    this.userSerivce.getLeaderboard(this.page).subscribe((res) => {
      console.log(res);
      this.leaderboardUsers = this.leaderboardUsers.concat(res.data.users);
      event.target.complete();
    });
  }

  goToUser(id: number) {
    this.modalController.dismiss();
    this.router.navigate(['/profile', id]);
  }
}
