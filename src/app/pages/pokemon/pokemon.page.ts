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
  nombreBusqueda: string = '';
  pokemonSeleccionado: any = null;
  pagina: number = 0;
  limite: number = 10;

  constructor(private pokeService: PokeApp) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.isLoading = true;
    this.pokeService.getPokemonList(this.limite, this.pagina * this.limite).subscribe(data => {
      this.pokemons = data;
      this.isLoading = false;
    });
  }

  buscarPokemon() {
    if (!this.nombreBusqueda) {
      this.pagina = 0;
      this.loadPokemons();
      return;
    }
    this.isLoading = true;
    this.pokeService.getPokemonByName(this.nombreBusqueda.toLowerCase()).subscribe(pokemon => {
      this.pokemons = [pokemon];
      this.isLoading = false;
      this.pokemonSeleccionado = null;
    }, error => {
      this.pokemons = [];
      this.isLoading = false;
      alert('Pokémon no encontrado');
    });
  }

  mostrarDetalles(pokemon: any) {
    this.pokemonSeleccionado = this.pokemonSeleccionado === pokemon ? null : pokemon;
  }

  siguientePagina() {
    this.pagina++;
    this.loadPokemons();
  }

  anteriorPagina() {
    if (this.pagina > 0) {
      this.pagina--;
      this.loadPokemons();
    }
  }
}