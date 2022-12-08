import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/models/category';
import { Site } from 'app/models/site';
import { User } from 'app/models/user';
import { CategoryCrudService } from 'app/services/categoryCrud.service';

const enum Filter {
  All = 'all',
  Popular = 'popular',
  Latest = 'latest',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user!: User;
  filter = Filter.All;

  sites: Site[] = [
    {
      id: 1,
      name: 'The Great Wall',
      location: 'China',
      description:
        'The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against intrusions by various nomadic groups of the Eurasian Steppe.',
      image_path: 'assets/images/site.png',
      category: {
        id: 1,
        image_path: 'assets/images/category_card_default_img.png',
        name: 'Nature',
      },
      tags: ['sights', 'china', 'great wall'],
      isFavorite: true,
    },
    {
      id: 2,
      name: 'The Colosseum',
      location: 'Rome, Italy',
      description:
        'The Colosseum or Coliseum, also known as the Flavian Amphitheatre, is an oval amphitheatre in the centre of the city of Rome, Italy, the largest ever built in the Roman Empire. It is situated just east of the Roman Forum. Construction began under the emperor Vespasian in AD 72, and was completed in AD 80 under his successor and heir Titus. Further modifications were made during the reign of Domitian (81–96). These three emperors are known as the Flavian dynasty, and the amphitheatre was named in Latin for its association with their family name (Flavius). It is the largest amphitheatre ever built in the Roman Empire, and is still the largest standing amphitheatre in the world today, despite its age. The Colosseum could hold 50,000 spectators, and was used for gladiatorial contests and public spectacles such as mock sea battles, animal hunts, executions, re-enactments of famous battles, and dramas based on Classical mythology. The building ceased to be used for entertainment in the early medieval era. It was later reused for purposes such as housing, workshops, quarters for a religious order, a fortress, a quarry, and a Christian shrine. Although partially ruined because of damage caused by earthquakes and stone-robbers, the Colosseum is also depicted on the Italian version of the five-cent euro coin.',
      image_path: 'assets/images/site.png',
      category: {
        id: 1,
        image_path: 'assets/images/category_card_default_img.png',
        name: 'Nature',
      },
      tags: ['sights', 'italy', 'rome', 'colosseum'],
      isFavorite: false,
    },
  ];

  categories!: Category[];

  constructor(
    private router: Router,
    private categoryService: CategoryCrudService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    // if the user is not logged in, redirect to login page
    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.data.categories;
    });
  }

  segmentChanged(ev: any) {
    console.log(this.filter);
  }

  toggleFavorite(site: Site) {
    site.isFavorite = !site.isFavorite;
  }
}
