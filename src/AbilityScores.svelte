<script>
	export let character;

	let campaignType = '-Select a Campaign Type-';
	let selectedAbilityScore;
	let availablePoints = 0;

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

	function selectAbilityScore(score) {
		if (campaignType === '-Select a Campaign Type-') {
			document.getElementById('campaignType').style.outline = 'solid red 5px';
			return;
		} else if (campaignType === 'Custom' && campaignTypePoints.Custom === 0) {
			document.getElementById('customPoints').style.outline = 'solid red 5px';
		}

		selectedAbilityScore = score;
		const selectedScoreValue = character.abilityScores[selectedAbilityScore];
		const currentScoreCost = abilityScoreCosts[selectedScoreValue];

		let remainingPoints;
		let maxAffordableScore = 7;

		if (availablePoints <= 0) {
			remainingPoints = 0;
			maxAffordableScore = selectedScoreValue;
		} else {
			maxAffordableScore = selectedScoreValue;
			for (let score = selectedScoreValue + 1; score <= 18; score++) {
				if (availablePoints >= abilityScoreCosts[score] - currentScoreCost) {
					maxAffordableScore = score;
				} else {
					break;
				}
			}
		}

		const minRange = 7;
		const maxRange = maxAffordableScore;

		document.getElementById('range-slider').setAttribute('min', minRange);
		document.getElementById('range-slider').setAttribute('max', maxRange);
	}

	function updateAvailablePoints() {
		let totalCost = 0;

		for (const score in character.abilityScores) {
			const abilityScore = character.abilityScores[score];
			totalCost += abilityScoreCosts[abilityScore];
		}

		availablePoints = campaignTypePoints[campaignType] - totalCost;
	}
</script>



<div class="campaignSelection">
	<select
		id="campaignType"
		bind:value={campaignType}
		on:change={() => {
			document.getElementById('campaignType').style.outline = 'none';
			updateAvailablePoints();
		}}
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
				document.getElementById('customPoints').style.outline = 'none';
				updateAvailablePoints();
			}}
		/>
	{/if}
</div>

<div class="abilityScoreContainer">
	{#each Object.keys(character.abilityScores) as score}
		<div class="abilityScore" on:click={selectAbilityScore(score)}>
			<h3>{score}</h3>
			<p>{character.abilityScores[score] + character.race.racialASMod[score] + character.age.ageASMod[score]}</p>
		</div>
	{/each}
</div>

<div class="sliderContainer">
	<input
		class="slider"
		id="range-slider"
		type="range"
		min="7"
		max="18"
		step="1"
		on:change={updateAvailablePoints}
		bind:value={character.abilityScores[selectedAbilityScore]}
		disabled={!selectedAbilityScore}
	/>
	<h4>Remaining Points: {availablePoints}</h4>
</div>

<style>
	.abilityScoreContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.abilityScore {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 100px;
		border: solid black 3px;
		border-radius: 20px;
		margin: 10px;
		cursor: pointer;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
		background-color: lightblue;
	}

    .campaignSelection {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 10px 0;
    }

	.sliderContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 20px;
	}

	.slider {
		-webkit-appearance: none;
		width: 90%;
		margin: 10px;
		height: 20px;
		background-color: lightpink;
		border-radius: 25px;
		border: 1px solid gray;
		transition: all 0.2s ease;
	}

	.slider:hover {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}

	input::-webkit-slider-thumb,
	input::-moz-range-thumb {
		-webkit-appearance: none;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: black;
		cursor: pointer;
	}
</style>
