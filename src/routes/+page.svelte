<script>
	import CharacterList from '../CharacterList.svelte';
	import Character from '../Character.js';
	import CharacterDisplay from '../CharacterDisplay.svelte';

	let currentCharacter;
	let characters = [];
	let modalOpen;

	function toggleModal() {
		modalOpen = !modalOpen;
	}

	function createNewCharacter() {
		const newCharacter = new Character();

		characters = [...characters, newCharacter];
		currentCharacter = newCharacter;
	}

	function characterCreation() {
		toggleModal();
	}
</script>

<h1>Character Map</h1>

{#if modalOpen}
	<div class="modalOverlay">
		<button class="exitBtn" on:click={toggleModal}>close</button>

		<div class="modalContent">
            <h2>Character Creation</h2>
            <div>
                <button on:click={() => {location.href="./create"}}>Create from Scratch</button>
                <button>Create from Template</button>
                <button>Import</button>
            </div>
			<button on:click={toggleModal}>Cancel</button>
		</div>
	</div>
{/if}

{#if characters.length > 0}
	<CharacterList {characters} />
{:else}
	<button on:click={characterCreation}>Get Started!</button>
{/if}

{#if currentCharacter}
	<CharacterDisplay {currentCharacter} />
{/if}

<style>
	h1 {
		text-align: center;
	}

	button {
		margin: 0 auto;
		display: block;
	}

	.modalOverlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		overflow: hidden;
	}

	.modalContent {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		max-width: 80%;
	}
</style>
