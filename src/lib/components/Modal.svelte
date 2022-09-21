<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { clickoutside } from '@svelteuidev/composables'
	import { Button } from '@svelteuidev/core';

    const dispatch = createEventDispatcher();
    
    export let opened: boolean = false;

    let dialog: HTMLDialogElement;

    $: if (dialog && !(dialog.open) && opened) {
        console.log('open modal')
        dialog.showModal();
    }

    const closeModal = () => {
        opened = false;
        dialog.close();
        dispatch('close');
    }
</script>

<dialog use:clickoutside={{ enabled: !!(dialog?.open), callback: closeModal }} bind:this={dialog}>
    <slot />
    <Button on:click={closeModal} />
</dialog>