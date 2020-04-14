import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokedexDetails } from 'src/app/models/PokedexDetails';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.component.html',
  styleUrls: ['./pokedex-detail.component.css']
})
export class PokedexDetailComponent implements OnInit {

  pokemon: any[] = []; //the pokemon the player has (from database)
  pokemonById: any[] = []; //sorted by pokemon id

  //pokemon details from pokeapi website
  details: PokedexDetails[] = [];

  //pagination
  detailsOnPage: PokedexDetails[] = []; //pokemon displayed on the current page
  pageNum: number = 1; //page #
  perPage: number = 12; //# of pokemon to display per page

  constructor(private apiService: PokeApiService) { }

  ngOnInit(): void {

    //assume we have a list of pokemon from the database
    //total is the number of pokemon collected
    //this is fake sample data, subject to change
    for(let i = 0; i < 30; i++) {
      this.pokemon.push( { id: 20 + i, total: Math.floor(1 + Math.random() * 3) } );
    }

    //sort by id
    for(let poke of this.pokemon) {
      this.pokemonById[poke.id] = poke;
    }

    //for all pokemon
    let count = 0;
    for(let poke of this.pokemon) {

      //get data from poke api
      //unfortunately we have to make a separate api call for each pokemon
      this.apiService.getFromID(poke.id).subscribe((data: any) => {

        //set details
        let detail = new PokedexDetails();
        //if player has 3 or more of the same pokemon, enable "evolve" button
        detail.canEvolve = this.pokemonById[data.id].total >= 3 ? true : false;
        detail.imageUrl = data.sprites.front_default;
        detail.height = data.height;
        detail.id = parseInt(data.id);
        detail.weight = data.weight;
        detail.name = data.name;
        detail.species = data.species.name;
        detail.totalCollected = this.pokemonById[data.id].total;

        //for all abilities
        let isFirst = true;
        for(let ability of data.abilities) {

          if(!isFirst) {
            detail.abilities += ", "; //space between abilities
          }
          isFirst = false;

          detail.abilities += ability.ability.name; //add to string
        }

        //for all types
        isFirst = true;
        for(let type of data.types) {

          if(!isFirst) {
            detail.types += ", "; //space between types
          }
          isFirst = false;

          detail.types += type.type.name; //add to string
        }

        //push to array
        this.details.push(detail);

        //if last pokemon loaded
        count++;
        if(count >= this.pokemon.length) {

          //sort by pokemon id so page consistently displays the pokemon in the same order
          //otherwise the order is not guaranteed. depends on callback timing
          this.details.sort((a:PokedexDetails, b:PokedexDetails)=> {
            return a.id - b.id;
          });

          //update page
          this.onPageChange(1);
        }
      },
        error => {
          const test = 0;
        });
      }
  };

  onPageChange($event) {

    this.detailsOnPage = []; //clear

    this.pageNum = $event; //$event is the new page #
    const start = (this.pageNum - 1) * this.perPage;

    for(let i = start; i < start + this.perPage; i++) {

      //if out of bounds
      if(i > this.details.length - 1) {
        break;
      }

      //details to display on page
      this.detailsOnPage.push(this.details[i]);
    }
  }
}