<script>
	export let character;

	let selectedAbilityScores = [];

    function selectAbilityScore(score) {
        if (selectedAbilityScores.includes(score)) {
            selectedAbilityScores = selectedAbilityScores.filter((abilityScore) => {
                return abilityScore !== score;
            });
        } else {
            selectedAbilityScores = [...selectedAbilityScores, score];
        }
    }
</script>

<label for="raceName">Race Name:</label>
<input type="text" id="raceName" bind:value={character.race.name} />

<label for="size">Size:</label>
<input type="text" id="size" bind:value={character.race.size} />

<label for="height">Height:</label>
<input type="text" id="height" bind:value={character.race.height} />

<label for="weight">Weight:</label>
<input type="number" id="weight" bind:value={character.race.weight} />

<label for="type">Type:</label>
<input type="text" id="type" bind:value={character.race.type} />

<label for="baseSpeed">Base Speed:</label>
<input type="number" id="baseSpeed" bind:value={character.race.baseSpeed} />

<label for="senses">Senses:</label>
<input type="text" id="senses" bind:value={character.race.senses} />

<label for="languages">Languages:</label>
<input type="text" id="languages" bind:value={character.race.languages} />

<label for="racialTraits">Racial Traits:</label>
<input type="text" id="racalTraits" bind:value={character.race.traits} />

<p>Ability Score Modifications:</p>
{#each Object.keys(character.abilityScores) as score}
	<button
		on:click={() => {
			selectAbilityScore(score);
			console.log(selectedAbilityScores);
		}}>{score}</button>

    {#if selectedAbilityScores.includes(score)}
        <input type="number" bind:value={character.race.racialASMod[score]} />
    {/if}
{/each}
