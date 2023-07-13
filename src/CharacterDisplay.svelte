<script>
	export let currentCharacter;

	function toggleExpand(i) {
		currentCharacter.levels[i].expanded = !currentCharacter.levels[i].expanded;
	}
</script>

<div>
	<h2>{currentCharacter.name}</h2>
	<h3>{currentCharacter.race.name}</h3>
	<img src={currentCharacter.icon} alt="Character icon" />
	{#if currentCharacter.classes.length > 0}
		<h3>{currentCharacter.classes}</h3>
	{/if}
	<h3>{currentCharacter.alignment}</h3>
	<div>
		<p>{currentCharacter.age.characterAge} years old</p>
		<p>{currentCharacter.gender}</p>
		<p>{currentCharacter.race.height}</p>
		<p>{currentCharacter.race.weight}</p>
		{#if currentCharacter.languages.length > 0}
			{#each currentCharacter.languages as language}
				<p>{language}</p>
			{/each}
		{/if}
	</div>
</div>

<table>
	<tr>
		<th>Level</th>
		<th>BaB</th>
		<th
			><div>
				Saves
				<div>Fortitude - Reflex - Will</div>
			</div></th
		>
		<th>Skills</th>
		<th>Class Features</th>
		{#if currentCharacter.casterlevel > 0}
			<th>Spells</th>
		{/if}
		<th>Feats</th>
	</tr>

	{#each currentCharacter.levels as level, i}
		<tr on:click={() => toggleExpand(i)}>
			<td>{level.level}</td>
			<td>{level.bab}</td>
			<td>{level.fortitude} - {level.reflex} - {level.will}</td>
			<td>
				<ul>
					{#each level.skills as skill}
						<li>{skill}</li>
					{/each}
				</ul>
			</td>
			<td>
				<ul>
					{#each level.classFeatures as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</td>
			{#if currentCharacter.casterlevel > 0}
				<td>
					<ul>
						{#each level.spells as spell}
							<li>{spell}</li>
						{/each}
					</ul>
				</td>
			{/if}
			<td>
				<ul>
					{#each level.feats as feat}
						<li>{feat}</li>
					{/each}
				</ul>
			</td>
		</tr>
	{/each}
</table>
