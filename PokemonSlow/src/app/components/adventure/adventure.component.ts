import { Component, OnInit } from '@angular/core';
import { PokedexDetails } from 'src/app/models/PokedexDetails';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {

  encounteredPokemon = new PokedexDetails();
  pokeId: string;
  ballCount;
  catchChance;

  constructor(private pokeApiService: PokeApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEncounter();
    this.ballCount = 25;
  }

  fetchEncounter() {

    // when we get encounter pokemon from backend this sends the id to the service
    // TODO grab a weighted random id from the back-end and send to here with promise or observable
    this.pokeId = Math.floor((Math.random() * 151) + 1).toString();


    this.pokeApiService.getFromID(this.pokeId).subscribe((result: any) => {

      this.encounteredPokemon = new PokedexDetails();

      this.encounteredPokemon.imageUrl = result.sprites.front_default;
      this.encounteredPokemon.name = result.name;

      let isFirst = true;
      for (const type of result.types) {

        if (!isFirst) {
          this.encounteredPokemon.types += ', ';
        }
        isFirst = false;

        this.encounteredPokemon.types += type.type.name;
      }
    },
    error => {
      console.log(error);
    });
  }

  attemptCatch() {
    if (this.ballCount > 0) {
    this.ballCount--;
    this.catchChance = 25;
    const catchAttempt = Math.floor((Math.random() * 1000) + 1);
    if (catchAttempt <= (this.catchChance * 10)) {
      console.log('pokemon caught');
      this.router.navigate(['/pokedex-detail']);
    }
  } else {
    console.log('No pokeballs available');
  }
  }

}
