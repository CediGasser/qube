<script lang="ts">
    import { createEventDispatcher } from 'svelte';

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

    // svelte action to detect click outside of element
    function clickOutside(node: HTMLElement, settings: any) {
        if (!settings.enabled) {
            return;
        }
        const handleClick = (event: MouseEvent) => {
            if (node.contains(event.target as Node)) {
                return;
            }
            settings.callback();
        };
        
        document.addEventListener('click', handleClick);

        return {
            destroy() {
                document.removeEventListener('click', handleClick);
            }
        };
    }
</script>

<dialog use:clickOutside={{ enabled: !!(dialog?.open), callback: dispatchClickoutside }} bind:this={dialog}>
    <slot />
</dialog>