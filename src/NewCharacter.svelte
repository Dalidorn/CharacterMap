<script>
	import AbilityScores from './AbilityScores.svelte';
	import AgeInput from './AgeInput.svelte';
	import Alignment from './Alignment.svelte';
	import RaceInput from './RaceInput.svelte';
	export let createNew;
	import { createNewCharacter } from './charactersStore.js';

	let character = {
		name: '',
		abilityScores: {
			STR: 10,
			DEX: 10,
			CON: 10,
			INT: 10,
			WIS: 10,
			CHA: 10
		},
		alignment: '',
		race: {
			name: '',
			size: '',
			type: '',
			baseSpeed: 0,
			height: '',
			weight: 0,
			senses: [],
			languages: [],
			racialTraits: [],
			racialASMod: {
				STR: 0,
				DEX: 0,
				CON: 0,
				INT: 0,
				WIS: 0,
				CHA: 0
			}
		},
		age: {
			ageOfMaturity: 0,
			maximumLifeSpan: 0,
			ageRanges: {
				Young: 0,
				'Middle Age': 0,
				Old: 0,
				Venerable: 0
			},
			ageASMod: {
				STR: 0,
				DEX: 0,
				CON: 0,
				INT: 0,
				WIS: 0,
				CHA: 0
			},
			characterAge: 0
		},
		gender: ''
	};
</script>

<h1>Creating a new character!</h1>

<label for="name">Character Name</label>
<input type="text" id="name" placeholder="Character Name" bind:value={character.name} />

<label for="gender">Gender</label>
<input type="text" id="gender" placeholder="Gender" bind:value={character.gender} />

<h2>Race</h2>
<RaceInput bind:character />

<h2>Age</h2>
<AgeInput bind:character />
<h2>Alignment</h2>
<Alignment bind:character />
<h2>Ability Scores</h2>
<AbilityScores bind:character />

<button on:click={() => {
	createNewCharacter(character)
	createNew = false;
	}}>Create Character</button>

<style>
	h2 {
		margin-top: 50px;
		text-align: center;
	}

	/* Add your custom styles here */
</style>
