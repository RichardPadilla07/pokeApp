import { Component, OnInit } from '@angular/core';
import { PokeApp } from 'src/app/services/poke-api';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  standalone: false,
})
export class PokemonPage implements OnInit {

  pokemons: any[] = [];
  isLoading: boolean = false;

  constructor(private pokeService: PokeApp) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.isLoading = true;
    this.pokeService.getPokemonList(20).subscribe(data => {
      this.pokemons = data;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching Pokémon data', error);
      this.isLoading = false;
    });

  }
}