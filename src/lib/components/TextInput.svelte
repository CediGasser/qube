<script lang="ts">
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    interface Props {
        label: string;
        value: string;
        placeholder?: string;
    }

    let { label, value = $bindable(), placeholder = '' }: Props = $props();
</script>

{#if label}
    <label for="input">{label}</label>
{/if}
<input placeholder={placeholder} bind:value id="input" type="text" onkeyup={bubble('keyup')} onkeydown={bubble('keydown')} onkeypress={bubble('keypress')}/>

<style>
    label {
    	display: block;
     	margin-block-start: 1rem;   
    	padding-inline-start: 0.5rem;
	margin-block-end: 0.125rem;
    }

    input {
        height: 3rem;
	border: none;
	border-radius: 16px;
	width: 100%;
	background-color: rgba(108, 108, 108, 30%);
	box-shadow: inset 4px 4px 4px 0 rgba(0, 0, 0, 20%);
    	padding: 0;
    	margin-block-end: 1rem;
    }
</style>
