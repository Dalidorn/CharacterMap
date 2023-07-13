import { writable, get } from 'svelte/store';
import Character from './Character.js';

// Create a writable store with an initial value of an empty array
export const charactersStore = writable([]);

export function createNewCharacter(character) {
    // Create a new Character instance
    const newCharacter = new Character(character);

    // Update the charactersStore by appending the newCharacter to the array
    charactersStore.update(characters => [...characters, newCharacter]);
    console.log(get(charactersStore));
    localStorage.setItem('characters', JSON.stringify(get(charactersStore)));
}

export function fetchCharacters() {
    const characters = JSON.parse(localStorage.getItem('characters'));
    charactersStore.set(characters);
}