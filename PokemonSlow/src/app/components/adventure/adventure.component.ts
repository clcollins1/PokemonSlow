import { Component, OnInit } from '@angular/core';
import { PokedexDetails } from 'src/app/models/PokedexDetails';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {

  encounteredPokemon: PokedexDetails;
  pokeId: string;
  ballCount;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {

    this.ballCount = 25;
  }

  fetchEncounter() {

    // when we get encounter pokemon from backend this sends the id to the service
    this.pokeId = '25';

    this.pokeApiService.getFromID(this.pokeId).subscribe((result: any) => {

      this.encounteredPokemon = new PokedexDetails();

      this.encounteredPokemon.imageUrl = result.sprites.front_default;
      this.encounteredPokemon.name = result.name;

      let isFirst = true;
      for(const type of result.types) {

        if(!isFirst) {
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

  }

}
