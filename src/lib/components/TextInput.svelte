<script lang="ts">
    export let label: string;
    export let value: string;
</script>

{#if label}
    <label for="input">{label}</label>
{/if}
<input bind:value id="input" type="text"/>

<style>
    label {
        display: block;
    }

    input {
        height: 3rem;
	border: none;
	border-radius: 16px;
	width: 100%;
	background-color: rgba(108, 108, 108, 30);
	box-shadow: inset 4px 4px 4px 0 rgba(0, 0, 0, 20);
    }
</style>
