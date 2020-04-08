import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokedexDetails } from 'src/app/models/PokedexDetails';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.component.html',
  styleUrls: ['./pokedex-detail.component.css']
})
export class PokedexDetailComponent implements OnInit {

  //server result (pokemon player has)
  pokemon: any[] = [];
  pokemonById: any[] = [];

  //used by html
  details: PokedexDetails[] = [];

  constructor(private apiService: PokeApiService) { }

  ngOnInit(): void {

    //assume we have a list of pokemon data from the server
    //total is the number of pokemon collected
    //this is fake sample data, subject to change
    this.pokemon.push( { id:"20", total: "1" } );
    this.pokemon.push( { id:"21", total: "3" } );
    this.pokemon.push( { id:"22", total: "1" } );
    this.pokemon.push( { id:"23", total: "2" } );
    this.pokemon.push( { id:"24", total: "3" } );
    this.pokemon.push( { id:"25", total: "1" } );
    this.pokemon.push( { id:"26", total: "1" } );

    //sort by id
    for(let poke of this.pokemon) {
      this.pokemonById[poke.id] = poke;
    }

    //for all pokemon
    for(let poke of this.pokemon) {

      //get data from poke api
      this.apiService.getFromID(poke.id).subscribe((data: any) => {

        //set details
        let detail = new PokedexDetails();
        //if player has 3 or more of the same pokemon, enable "evolve" button
        detail.canEvolve = this.pokemonById[data.id].total >= 3 ? true : false;
        detail.imageUrl = data.sprites.front_default;
        detail.height = data.height;
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
      },
        error => {
          const test = 0;
        });
      }
  };
}