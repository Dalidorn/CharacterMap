<script>
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
		race: '',
		gender: '',
		traits: []
	};

	// ABILITY SCORE LOGIC
	let campaignType = '-Select a Campaign Type-';
	let selectedAbilityScore = '';

	const campaignTypePoints = {
		'Low Fantasy': 10,
		'Standard Fantasy': 15,
		'High Fantasy': 20,
		'Epic Fantasy': 25,
		Custom: 0
	};

	const abilityScoreCosts = {
		7: -4,
		8: -2,
		9: -1,
		10: 0,
		11: 1,
		12: 2,
		13: 3,
		14: 5,
		15: 7,
		16: 10,
		17: 13,
		18: 17
	};

	function selectAbilityScore(e) {
    selectedAbilityScore = e.target.innerText;
  }

	function openPointBuy(type) {
		let availiblePoints = campaignTypePoints[type];

		if (campaignType === '-Select a Campaign Type-') {
			document.querySelector('select').classList.toggle('error');
			return;
		} else if (campaignType === 'Custom' && campaignTypePoints.Custom === 0) {
			document.getElementById('customPoints').classList.toggle('error');
		}
	}

	// ALIGNMENT LOGIC
	const alignments = [
		{ name: 'Lawful Good', type: 'good' },
		{ name: 'Neutral Good', type: 'good' },
		{ name: 'Chaotic Good', type: 'good' },
		{ name: 'Lawful Neutral', type: 'neutral' },
		{ name: 'True Neutral', type: 'neutral' },
		{ name: 'Chaotic Neutral', type: 'neutral' },
		{ name: 'Lawful Evil', type: 'evil' },
		{ name: 'Neutral Evil', type: 'evil' },
		{ name: 'Chaotic Evil', type: 'evil' }
	];

	let selectedAlignment = character.alignment || 'True Neutral';

	const handleAlignmentClick = (alignment) => {
		selectedAlignment = alignment.name;
		character.alignment = alignment.name;
	};
</script>

<h1>Creating a new character!</h1>

<label for="name">Character Name</label>
<input type="text" id="name" placeholder="Character Name" bind:value={character.name} />

<h2>Alignment</h2>
<div class="alignment-grid">
	{#each alignments as align}
		<div
			class="alignment-cell {selectedAlignment === align.name && 'selected'} {align.type}"
			on:click={() => handleAlignmentClick(align)}
		>
			{align.name}
		</div>
	{/each}
</div>

<label for="race">Race</label>
<!-- Add input component for race selection -->

<label for="gender">Gender</label>
<input type="text" id="gender" placeholder="Gender" bind:value={character.gender} />

<!-- <label for="traits">Traits and Drawbacks</label>
{#each character.traits as trait, index}
	<div class="trait-row">
		<input type="text" placeholder="Trait or Drawback" bind:value={trait} />
		<button on:click={() => removeTrait(index)}>Remove</button>
	</div>
{/each}
<button on:click={addTrait}>Add Trait or Drawback</button> -->

<select
	on:change={() => {
		document.querySelector('select').classList.remove('error');
	}}
	bind:value={campaignType}
>
	<option>-Select a Campaign Type-</option>
	<option>Low Fantasy</option>
	<option>Standard Fantasy</option>
	<option>High Fantasy</option>
	<option>Epic Fantasy</option>
	<option>Custom</option>
</select>

{#if campaignType === 'Custom'}
	<label for="customPoints">Total Points</label>
	<input
		type="number"
		id="customPoints"
		placeholder="Custom Point Buy"
		bind:value={campaignTypePoints.Custom}
		on:change={() => {
			document.getElementById('customPoints').classList.remove('error');
		}}
	/>
{/if}

{#each Object.keys(character.abilityScores) as score}
	<div on:click={selectAbilityScore}>
		<h3>{score}</h3>
        <p>{character.abilityScores[score]}</p>
	</div>
{/each}

<h4>{character.abilityScores[selectedAbilityScore]}</h4>
<input
	type="range"
	min="7"
	max="18"
	step="1"
	bind:value={character.abilityScores[selectedAbilityScore]}
/>

<style>
	.alignment-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-gap: 10px;
		width: 400px;
		height: 400px;
		margin-bottom: 20px;
		padding: 10px;
		outline: solid black 5px;
	}

	.alignment-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-radius: 20px;
		transition: background-color 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}

	.good {
		background-color: rgba(0, 255, 0, 0.3);
	}

	.neutral {
		background-color: lightgray;
	}

	.evil {
		background-color: rgba(255, 0, 0, 0.3);
	}

	.selected {
		outline: solid black 5px;
	}

	.error {
		outline: solid red 5px;
	}

	/* Add your custom styles here */
</style>
