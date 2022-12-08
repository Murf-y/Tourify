import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Site } from 'app/models/site';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favoritesSites: Site[] = [];

  constructor() {
    this.fillInitialArray();
  }
  fillInitialArray() {
    this.favoritesSites = [
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
        isFavorite: true,
      },
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
        isFavorite: true,
      },
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
        isFavorite: true,
      },
    ];
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  toggleFav(site: Site) {
    site.isFavorite = !site.isFavorite;
    this.favoritesSites = this.favoritesSites.filter((site) => site.isFavorite);

    // TODO api remove favorite
  }
}
