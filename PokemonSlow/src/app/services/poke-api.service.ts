import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  getFromRange(startPokemonID: number, endPokemonID: number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?offset=${startPokemonID - 1}&limit=${endPokemonID - startPokemonID + 1}`);
  }

  getFromID(pokemonID: number): Observable<Object> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  }
}
