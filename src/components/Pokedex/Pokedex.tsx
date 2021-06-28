import React from 'react';
import { PokemonSchema } from '../../types/PokemonSchema';
import Pokelist from '../Pokelist/Pokelist';
import PokeSearchResult from '../PokeSearchResult/PokeSearchResult';
import Searchbox from '../Searchbox/Searchbox';
import './Pokedex.css';

interface PokedexProps {
    pokemons: PokemonSchema[];
    selectedPokemon: PokemonSchema | undefined;
    onInputChange: (inputValue: string) => void;
    onPokemonClick: (pokemonName: string) => void;
}

const Pokedex = ({ 
    pokemons,
    selectedPokemon,
    onPokemonClick,
    onInputChange 
}: PokedexProps) => {
    return (
        <div className="pokedexContainer">
            <div className="pokelistContainer">
                <Searchbox onInputChange={onInputChange} />
                <Pokelist onPokemonClick={onPokemonClick} pokemons={pokemons} />
            </div>
            <div className="pokesearchresultContainer">
                <PokeSearchResult selectedPokemon={selectedPokemon} />
            </div>
        </div>
    )
}

export default Pokedex;
