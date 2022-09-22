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
    } else if (dialog && dialog.open && !opened) {
        console.log('close modal')
        dialog.close();
    }

    const dispatchClickoutside = () => {
        dispatch('clickoutside');
    }
</script>

<dialog use:clickoutside={{ enabled: !!(dialog?.open), callback: dispatchClickoutside }} bind:this={dialog}>
    <slot />
</dialog>