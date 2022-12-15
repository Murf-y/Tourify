import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { TripCrudService } from 'app/services/tripCrud.service';

@Component({
  selector: 'create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {
  user!: User;

  name: string = '';
  start_date!: string;
  end_date!: string;

  isThereError = false;
  errorMessage = '';

  min_start_date = new Date().toISOString();

  constructor(
    private router: Router,
    private locationStrategy: LocationStrategy,
    private tripService: TripCrudService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {}

  validateInput() {
    if (this.name) {
      if (this.start_date && this.end_date) {
        if (this.start_date > this.end_date) {
          this.isThereError = true;
          this.errorMessage = 'Start date must be before end date';
        } else {
          this.isThereError = false;
          this.errorMessage = '';
        }
      } else {
        this.isThereError = true;
        this.errorMessage = 'Start date and end date cannot be empty';
      }
    } else {
      this.isThereError = true;
      this.errorMessage = 'Trip name cannot be empty';
    }
  }

  createTrip() {
    this.validateInput();

    if (!this.isThereError) {
      console.log(this.start_date, this.end_date);
      this.tripService
        .createTrip(this.user.id, this.name, this.start_date, this.end_date)
        .subscribe((response) => {
          console.log(response);
          if (response.status === 200) {
            this.router.navigate(['/tabs/home']);
          } else {
            this.isThereError = true;
            this.errorMessage = response.message;
          }
        });
    }
  }
  cancelTrip() {
    this.goBack();
  }

  goBack() {
    this.locationStrategy.back();
  }
}
