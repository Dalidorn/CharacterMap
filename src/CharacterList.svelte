<script>
    export let characters;

</script>

<ul>
    {#each characters as character}
        <li>{character.name}</li>
    {/each}
</ul>


<style>


</style>