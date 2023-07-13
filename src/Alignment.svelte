<script>
	export let character;

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

<div class="gridContainer">
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
</div>

<style>
	.gridContainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.alignment-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-gap: 10px;
		width: 80vw;
		height: 80vw;
		max-width: 600px;
		max-height: 600px;
		margin-bottom: 20px;
		padding: 10px;
		outline: solid black 5px;
		border-radius: 20px;
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
</style>
