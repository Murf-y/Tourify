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

  newUsername = '';
  newImage: string | ArrayBuffer | null = '';

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
        this.newImage = this.profileUser.profile_photo_url;
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

  changeProfilePicture(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  updateProfile() {
    let base64: string | null = null;
    if (this.newImage && this.newImage.toString().includes('base64')) {
      base64 = this.newImage.toString().split(',')[1];
      this.userSerivce
        .updateProfilePhoto(this.currentUser.id, base64)
        .subscribe((res) => {
          this.currentUser = res.data.user;
          sessionStorage.setItem(
            'current_user',
            JSON.stringify(this.currentUser)
          );
          if (this.newUsername !== '') {
            this.userSerivce
              .updateUsername(this.currentUser.id, this.newUsername)
              .subscribe((res) => {
                this.currentUser = res.data.user;
                sessionStorage.setItem(
                  'current_user',
                  JSON.stringify(this.currentUser)
                );
                this.modalController.dismiss();
              });
          } else {
            this.modalController.dismiss();
          }
        });
    } else {
      if (this.newUsername !== '') {
        this.userSerivce
          .updateUsername(this.currentUser.id, this.newUsername)
          .subscribe((res) => {
            this.currentUser = res.data.user;
            sessionStorage.setItem(
              'current_user',
              JSON.stringify(this.currentUser)
            );
            this.modalController.dismiss();
          });
      } else {
        this.modalController.dismiss();
      }
    }
  }
}
