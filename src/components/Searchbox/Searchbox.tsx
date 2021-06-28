import React from 'react';
import './Searchbox.css';

interface SearchboxProps {
    onInputChange: (inputValue: string) => void;
}

const Searchbox = ({ onInputChange }: SearchboxProps) => {
    return (
        <input 
            onInput={(e) => {
                onInputChange((e.target as HTMLTextAreaElement).value);
            }}
            className="search"
            type="search"
            placeholder="Search Pokemons"
        />
    )
}

export default Searchbox;
