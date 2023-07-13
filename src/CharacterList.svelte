<script>
    export let characters;
    export let currentCharacter;
</script>

<ul>
    {#each characters as character, i}
        <li><button on:click={() => {currentCharacter = characters[i]}}>{character.name}</button></li>
    {/each}
</ul>


<style>


</style>