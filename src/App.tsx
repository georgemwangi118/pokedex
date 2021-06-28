import React, {Component} from 'react';
import './App.css';
import Pokedex from './components/Pokedex/Pokedex';
import { pokemonData } from './data/pokemonData';
import { 
  PokemonSchema, 
  PokemonSpritesSchema, 
  UnpatchedPokemonSchema 
} from './types/PokemonSchema';

export interface AppState {
  searchField: string;
  allPokemons: PokemonSchema[];
  searchedPokemons: PokemonSchema[];
  selectedPokemon: PokemonSchema | undefined;
}

class App extends Component<any, AppState> {
  state = {
    searchField: "",
    allPokemons: [],
    searchedPokemons: [],
    selectedPokemon: undefined,
  };

  patchPokemonData = (pokemons: UnpatchedPokemonSchema[]) => {
    const patchedPokemons = pokemons.map((pokemon) => {
      let parsedSprites: PokemonSpritesSchema = {
        normal: undefined,
        animated: undefined,
      };

      try {
        parsedSprites = pokemon.sprites && JSON.parse(pokemon.sprites);
      } catch (e) {
        console.log("Exception while parsing the sprites: ", e);
      }

      const patchedPokemon: PokemonSchema = {
        ...pokemon,
        sprites: parsedSprites,
      };
      
      return patchedPokemon;
    });

    return patchedPokemons;
  };

  componentDidMount () {
    // patch the stringified pokemon sprites

    const patchedPokemons: PokemonSchema[] = this.patchPokemonData(
      pokemonData
    );
    // update the state with the patched pokemons
    this.setState({
      allPokemons: patchedPokemons,
      searchedPokemons: patchedPokemons,
    });
  }

  handleInputChange = (inputValue: string) => {
    const searchField = inputValue;
    //filter the searched pokemon;
    const { allPokemons } = this.state;

    const searchedPokemons = allPokemons.filter(
      (pokemon: PokemonSchema) => {
        return (
          pokemon.name &&
          pokemon.name
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      }
    );
    this.setState({
      searchField,
      searchedPokemons,
    });
  };

  handleClick = (pokemonName: string) => {
    const { allPokemons } = this.state;

    //find the selected pokemon from allPokemons
    const selectedPokemon = allPokemons.find(
      (pokemon: PokemonSchema) => pokemon.name === pokemonName
    );

    //update the state
    this.setState({ selectedPokemon });
  }

  render() {
    return (
      <div className="app">
        <h1>Pokedex</h1>
        <Pokedex
          pokemons={this.state.searchedPokemons}
          selectedPokemon={this.state.selectedPokemon}
          onInputChange={this.handleInputChange}
          onPokemonClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
