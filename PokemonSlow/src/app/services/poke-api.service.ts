import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  getFromID(pokemonID: string): Observable<Object> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  }
}
