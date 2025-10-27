import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApp {
  private API_URL = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/pokemon?limit=${limit}`).pipe(
      switchMap(response => {
        const pokemonDetails$ = response.results.map((pokemon: any) => this.http.get(pokemon.url));
        return forkJoin(pokemonDetails$);
      })
    );
  }

}
