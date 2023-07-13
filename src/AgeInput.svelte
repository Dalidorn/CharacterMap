<script>
	export let character;
    let ageRangeSelected = "Young";
	let showAgeInputs = false;
    let ageEffects = {
        "Young" : "Young characters are inexperienced, but also full of energy and enthusiasm. They gain a +2 bonus to Dexterity and a –2 penalty to Strength, Constitution, and Wisdom. Young characters also lack the experience needed for most typical adventuring roles, and by base rules are limited to NPC classes until reaching maturity.",
        "Mature" : "Mature characters are the standard for adventurers and gain no benefits or penalties due to their age.",
        "Middle Age" : "Middle-aged characters are begining to feel the effects of age slow their bodies, however they've gained much experience in their years. They gain a +1 bonus to Intellegence, Wisdom, and Charisma, but take a –1 penalty to Strength, Dexterity, and Constitution.",
        "Old" : "Old characters are frail, their bodies age supassing their mental ability. They gain a +1 bonus to Intellegence, Wisdom, and Charisma, but take a –2 penalty to Strength, Dexterity, and Constitution.",
        "Venerable" : "Venerable characters are ancient, their bodies on the final step to decay. They maintain a +1 bonus to Intellegence, Wisdom, and Charisma, but take a –3 penalty to Strength, Dexterity, and Constitution."
    }

    function validateAgeValues() {
        if (character.age.ageOfMaturity > 0 && character.age.maximumLifeSpan > 0 && character.age.ageOfMaturity < character.age.maximumLifeSpan) {
            document.getElementById("ageOfMaturity").style.outline = "none";
            document.getElementById("maximumLifeSpan").style.outline = "none";
            return true;
        } else {
            document.getElementById("ageOfMaturity").style.outline = "solid red 5px";
            document.getElementById("maximumLifeSpan").style.outline = "solid red 5px";
            return false;
        }
    }

    function calculateSelectedAge() {
        if (character.age.characterAge < character.age.ageOfMaturity) {
            ageRangeSelected = "Young";
            character.age.ageASMod = {
                STR: -2,
                DEX: 2,
                CON: -2,
                INT: 0,
                WIS: 0,
                CHA: -2
            };
        } else if (character.age.characterAge < character.age.ageRanges["Middle Age"]) {
            ageRangeSelected = "Mature";
            character.age.ageASMod = {
                STR: 0,
                DEX: 0,
                CON: 0,
                INT: 0,
                WIS: 0,
                CHA: 0
            };
        } else if (character.age.characterAge < character.age.ageRanges["Old"]) {
            ageRangeSelected = "Middle Age";
            character.age.ageASMod = {
                STR: -1,
                DEX: -1,
                CON: -1,
                INT: 1,
                WIS: 1,
                CHA: 1
            };
        } else if (character.age.characterAge < character.age.ageRanges["Venerable"]) {
            ageRangeSelected = "Old";
            character.age.ageASMod = {
                STR: -2,
                DEX: -2,
                CON: -2,
                INT: 1,
                WIS: 1,
                CHA: 1
            };
        } else {
            ageRangeSelected = "Venerable";
            character.age.ageASMod = {
                STR: -3,
                DEX: -3,
                CON: -3,
                INT: 1,
                WIS: 1,
                CHA: 1
            };
        }
    }

	function calculateAgeRanges() {

        if (!validateAgeValues()) {
            return;
        } else {
            let ageRanges = {
                "Young": Math.floor(character.age.ageOfMaturity / 2),
                "Middle Age": Math.floor(character.age.ageOfMaturity + (character.age.maximumLifeSpan - character.age.ageOfMaturity) / 2),
                "Old": Math.floor(character.age.ageOfMaturity + (character.age.maximumLifeSpan - character.age.ageOfMaturity) * 0.75),
                "Venerable": Math.floor(character.age.maximumLifeSpan - 1),
            };
    
            character.age.ageRanges = ageRanges;
            console.log(character.age.ageRanges);
        }
	}
</script>

<p>
	To determine the age ranges of each catergory we can use the age of maturity and maximum life span. Maximum life span is different than maximum age! Max age is determined by your DM and is when your character passes of old age. Max life span is typically venerable age plus 1, if your race does not have information on the age ranges work with your DM to determine a max life span as we'll calculate the rest from there.
</p>

<label for="ageOfMaturity">Age of Maturity:</label>
<input type="number" id="ageOfMaturity" on:change={validateAgeValues} bind:value={character.age.ageOfMaturity} />

<label for="maximumLifeSpan">Maximum Life Span:</label>
<input type="number" id="maximumLifeSpan" on:change={validateAgeValues} bind:value={character.age.maximumLifeSpan} />

<p>
	If your race has information on age ranges you can enter them below, otherwise we'll use the generalized formula to calculate the values for you. Once age ranges have been established you can select a starting age.
</p>

<button
	on:click={() => { if(showAgeInputs) {
        showAgeInputs = false;
    } else {
        if(validateAgeValues()) {
            showAgeInputs = true;
        }
    }
	}}>Enter Age Ranges</button
>

{#if showAgeInputs === true}
    <label for="young">Young:</label>  
    <input type="number" id="young" bind:value={character.age.ageRanges['Young']} />

	<label for="middleAge">Middle Age:</label>
	<input type="number" id="middleAge" bind:value={character.age.ageRanges['Middle Age']} />

	<label for="old">Old:</label>
	<input type="number" id="old" bind:value={character.age.ageRanges['Old']} />

	<label for="venerable">Venerable:</label>
	<input type="number" id="venerable" bind:value={character.age.ageRanges['Venerable']} />
{:else}
	<button on:click={calculateAgeRanges}>Generate Age Ranges</button>
{/if}

{#if character.age.ageOfMaturity > 0 && character.age.maximumLifeSpan > 0 && character.age.ageRanges["Middle Age"] > 0 && character.age.ageRanges["Old"] > 0 && character.age.ageRanges["Venerable"] > 0}

<label for="startingAge">Starting Age: {character.age.characterAge}</label>
<input id="startingAge" type="range" min={character.age.ageRanges["Young"]} max={character.age.maximumLifeSpan} bind:value={character.age.characterAge} on:change={calculateSelectedAge}>

<p>Your character is in the {ageRangeSelected} catergory! {ageEffects[ageRangeSelected]}</p>
{/if}

