import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Place } from 'app/models/place';
import { Trip } from 'app/models/trip';
import { User } from 'app/models/user';
import { PlaceCrudService } from 'app/services/placeCrud.service';
import { TripCrudService } from 'app/services/tripCrud.service';

enum placePageTab {
  OVERVIEW = 'overview',
  REVIEWS = 'reviews',
}

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage {
  user!: User;

  place!: Place;
  place_id!: number;

  average_rating: number = 0;
  five_star_percentage = 0;
  four_star_percentage = 0;
  three_star_percentage = 0;
  two_star_percentage = 0;
  one_star_percentage = 0;

  currentTab = placePageTab.OVERVIEW;
  alreadyReviewed = false;

  rating = 0;
  review = '';

  reportReason = '';
  reported = false;

  myTrips: Trip[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeService: PlaceCrudService,
    private tripService: TripCrudService,
    private modalCtrl: ModalController
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }

    this.place_id = this.route.snapshot.params['id'];
  }

  async closeModal() {
    const modal = await this.modalCtrl.getTop();
    modal?.dismiss();
  }

  ionViewWillEnter() {
    this.placeService.getPlace(this.user.id, this.place_id).subscribe((res) => {
      this.place = res.data.place;
      this.alreadyReviewed =
        this.place.reviews.filter((review) => review.author.id === this.user.id)
          .length > 0;

      let total_rating = this.place.reviews.reduce(
        (acc, review) => acc + parseInt(review.rating),
        0
      );

      this.average_rating = total_rating / this.place.reviews.length;
      this.average_rating = Math.round(this.average_rating * 10) / 10;
      if (isNaN(this.average_rating)) {
        this.average_rating = 0;
      }

      let total_reviews = this.place.reviews.length;
      let five_star: number = this.place.reviews.filter(
        (review) => review.rating === '5'
      ).length;
      let four_star = this.place.reviews.filter(
        (review) => review.rating === '4'
      ).length;
      let three_star = this.place.reviews.filter(
        (review) => review.rating === '3'
      ).length;
      let two_star = this.place.reviews.filter(
        (review) => review.rating === '2'
      ).length;
      let one_star = this.place.reviews.filter(
        (review) => review.rating === '1'
      ).length;

      this.five_star_percentage = (five_star / total_reviews) * 100;
      this.four_star_percentage = (four_star / total_reviews) * 100;
      this.three_star_percentage = (three_star / total_reviews) * 100;
      this.two_star_percentage = (two_star / total_reviews) * 100;
      this.one_star_percentage = (one_star / total_reviews) * 100;

      this.five_star_percentage = Math.ceil(this.five_star_percentage);
      this.four_star_percentage = Math.ceil(this.four_star_percentage);
      this.three_star_percentage = Math.ceil(this.three_star_percentage);
      this.two_star_percentage = Math.ceil(this.two_star_percentage);
      this.one_star_percentage = Math.ceil(this.one_star_percentage);

      // for each percentage, if it is NaN, set it to 0
      if (isNaN(this.five_star_percentage)) {
        this.five_star_percentage = 0;
      }
      if (isNaN(this.four_star_percentage)) {
        this.four_star_percentage = 0;
      }
      if (isNaN(this.three_star_percentage)) {
        this.three_star_percentage = 0;
      }
      if (isNaN(this.two_star_percentage)) {
        this.two_star_percentage = 0;
      }
      if (isNaN(this.one_star_percentage)) {
        this.one_star_percentage = 0;
      }
    });

    this.tripService.getAll(this.user.id).subscribe((res) => {
      this.myTrips = res.data.trips;
    });
  }

  toggleTab() {
    if (this.currentTab === placePageTab.OVERVIEW) {
      this.currentTab = placePageTab.REVIEWS;
    } else {
      this.currentTab = placePageTab.OVERVIEW;
    }
  }

  reportPlace() {
    if (this.reportReason === '') {
      return;
    }

    this.placeService
      .reportPlace(this.place_id, this.user.id, this.reportReason)
      .subscribe((res) => {
        console.log(res);
        this.closeModal();
        this.reported = true;
      });
  }

  addToTrip(trip: Trip) {
    this.tripService.addPlaceToTrip(trip.id, this.place_id).subscribe((res) => {
      console.log(res);
      this.closeModal();
    });
  }

  submitReview() {
    this.placeService
      .postReviewToPlace(this.place_id, this.user.id, this.rating, this.review)
      .subscribe((res) => {
        console.log(res);
        this.closeModal();
        this.ionViewWillEnter();
      });
  }
}
