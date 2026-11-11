<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { controlConfig } from './controlbar.config.js';

	type Palette = 'accent' | 'tone' | 'accentbg';

	interface Props {
		leading?: Snippet;
		children: Snippet;
		palette?: Palette;
		rounded?: boolean;
		bordered?: boolean;
	}

	let { leading, children, palette, rounded = false, bordered = true }: Props = $props();

	const resolve = createVariant(controlConfig);

	const wrapper_classes = $derived(resolve({ palette, rounded, bordered }).trim());
</script>

<div class="control-bar {wrapper_classes}">
	{#if leading}
		<div class="control-header">
			{@render leading()}
		</div>
	{/if}
	<div class="control-body">
		{@render children()}
	</div>
</div>

<style>
	.control-bar {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1rem 1.25rem;
		margin-bottom: 1.5rem;
		border: var(--spk-border) solid transparent;
	}

	.control-rounded {
		border-radius: var(--spk-radius-soft);
	}

	/* Header - separator only, no box border */
	.control-header {
		padding-bottom: 0.6rem;
		border-bottom: var(--spk-border) solid var(--spk-tone-hover);
		color: var(--spk-text);
	}

	.control-body {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
	}

	/* Palette - tone -------------------------------------------------- */

	.control-palette-tone {
		background: var(--spk-tone);

		--sel-label-color: var(--spk-text-muted);
		--sel-btn-color: var(--spk-text-muted);
		--sel-btn-border: var(--spk-tone-hover);
		--sel-btn-hover-color: var(--spk-accent);
		--sel-btn-active-bg: var(--spk-accent);
		--sel-btn-active-border: var(--spk-accent);
		--sel-btn-active-color: var(--spk-text-accent);
	}

	.control-palette-tone.control-bordered {
		border-color: var(--spk-tone-hover);
	}

	/* Palette - accent ------------------------------------------------ */

	.control-palette-accent {
		background: var(--spk-accent);

		--sel-label-color: var(--spk-text-accent);
		--sel-btn-color: var(--spk-accent-muted);
		--sel-btn-border: var(--spk-accent-hover);
		--sel-btn-hover-color: var(--spk-text-accent);
		--sel-btn-active-bg: var(--spk-accent-ghost-hover);
		--sel-btn-active-border: var(--spk-text-accent);
		--sel-btn-active-color: var(--spk-text-accent);
	}

	.control-palette-accent.control-bordered {
		border-color: var(--spk-accent-muted);
	}

	.control-palette-accent .control-header {
		color: var(--spk-text-accent);
		border-bottom-color: var(--spk-accent-muted);
	}

	/* Palette - accent-bg --------------------------------------------- */

	.control-palette-accent-bg {
		background: var(--spk-accent-bg);

		--sel-label-color: var(--spk-text-accent);
		--sel-btn-color: var(--spk-accent-muted);
		--sel-btn-border: var(--spk-accent-hover);
		--sel-btn-hover-color: var(--spk-text-accent);
		--sel-btn-active-bg: var(--spk-accent-ghost-hover);
		--sel-btn-active-border: var(--spk-text-accent);
		--sel-btn-active-color: var(--spk-text-accent);
	}

	.control-palette-accent-bg.control-bordered {
		border-color: var(--spk-accent-hover);
	}

	.control-palette-accent-bg .control-header {
		color: var(--spk-text-accent);
		border-bottom-color: var(--spk-accent-hover);
	}
</style>
