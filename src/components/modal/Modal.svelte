<script lang="ts">
  import { fade } from 'svelte/transition';
  import { X } from '@lucide/svelte';

  let {
    // Declare 'show' as a prop
    // Then make it bindable with $bindable() in the same line
    show = $bindable(true), // <-- CORRECTED LINE
    closeOnOutsideClick = true,
    titleContent,
    onClose,
  } = $props<{
    show?: boolean; // Type declaration for the prop
    closeOnOutsideClick?: boolean;
    titleContent?: string;
    onClose?: () => void;
  }>();

  // Effect to manage body scroll, reacting to changes in the bindable 'show'
  $effect(() => {
    if (!show) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  });

  function handleOutsideClick(event: MouseEvent) {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      close();
    }
  }

  function close() {
    show = false; // This now correctly updates the parent's binded variable
    // The effect will handle removing the overflow-hidden class
    if (onClose) {
      onClose();
    }
  }
</script>

{#if show}
  <div
    class="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50"
    onclick={handleOutsideClick}
    in:fade={{ duration: 180 }} out:fade={{ duration: 120 }}
    role="dialog"
  >
    <div
      class="relative flex w-[90%] max-w-lg flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      in:scale={{ duration: 220, start: 0.85 }} out:fade={{ duration: 120 }}
    >
      <div class="flex items-center justify-between rounded-t-lg bg-accent px-4 py-3 text-white">
        <h2 id="modal-title" class="text-xl font-bold">
          {titleContent}
        </h2>
        <button
          class="text-2xl leading-none text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent transition-transform duration-150 hover:scale-110"
          onclick={close}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
      </div>
      <div class="p-6 text-gray-700 dark:text-gray-300">
        <slot />
      </div>
    </div>
  </div>
{/if}