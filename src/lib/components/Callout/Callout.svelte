<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { calloutConfig } from './callout.config.js';

	type Palette = 'accent' | 'neutral' | 'error' | 'warning' | 'success' | 'info';
	type Align = 'center' | 'start';

	interface Props {
		palette?: Palette;
		align?: Align;
		rounded?: boolean;
		bordered?: boolean;
		style?: string;
		leading?: Snippet;
		children?: Snippet;
		trailing?: Snippet;
	}

	let {
		palette = 'info',
		align = 'center',
		rounded = false,
		bordered = false,
		style,
		leading,
		children,
		trailing
	}: Props = $props();

	const resolve = createVariant(calloutConfig);

	const wrapper_classes = $derived(resolve({ palette, align, rounded, bordered }).trim());
</script>

<div class="callout-base {wrapper_classes}" role="note" {style}>
	{#if leading}
		<div class="callout-leading">
			{@render leading()}
		</div>
	{/if}

	{#if children}
		<div class="callout-content">
			{@render children()}
		</div>
	{/if}

	{#if trailing}
		<div class="callout-trailing">
			{@render trailing()}
		</div>
	{/if}
</div>

<style>
	/* Base */
	.callout-base {
		display: flex;
		gap: 0.75rem;
		padding: 0.9rem 1.1rem;
		background: var(--cb-bg);
		border: var(--spk-border) solid transparent;
		color: var(--spk-text);
		font-family: var(--spk-font-body);
	}

	/* Rounded */
	.callout-rounded {
		border-radius: var(--spk-radius-soft);
	}

	/* Bordered */
	.callout-bordered {
		border-color: var(--cb-muted);
	}

	/* Align */
	.callout-align-center {
		align-items: center;
	}
	.callout-align-start {
		align-items: flex-start;
	}

	/* Palette - set --cb-color, --cb-bg, --cb-border */
	.callout-palette-accent {
		--cb-color: var(--spk-accent);
		--cb-bg: var(--spk-accent-bg);
		--cb-muted: var(--spk-accent-muted);
		--cb-hover: var(--spk-accent-hover);
		--cb-ghost: var(--spk-accent-ghost-hover);
	}
	.callout-palette-neutral {
		--cb-color: var(--spk-neutral);
		--cb-bg: var(--spk-neutral-bg);
		--cb-muted: var(--spk-neutral-muted);
		--cb-hover: var(--spk-neutral-hover);
		--cb-ghost: var(--spk-neutral-ghost-hover);
		--cb-text: var(--spk-text-neutral);
	}

	.callout-palette-error {
		--cb-color: var(--spk-error);
		--cb-bg: var(--spk-error-bg);
		--cb-muted: var(--spk-error-muted);
		--cb-hover: var(--spk-error-hover);
		--cb-ghost: var(--spk-error-ghost-hover);
	}

	.callout-palette-warning {
		--cb-color: var(--spk-warning);
		--cb-bg: var(--spk-warning-bg);
		--cb-muted: var(--spk-warning-muted);
		--cb-hover: var(--spk-warning-hover);
		--cb-ghost: var(--spk-warning-ghost-hover);
		--cb-text: var(--spk-text-warning);
	}

	.callout-palette-success {
		--cb-color: var(--spk-success);
		--cb-bg: var(--spk-success-bg);
		--cb-muted: var(--spk-success-muted);
		--cb-hover: var(--spk-success-hover);
		--cb-ghost: var(--spk-success-ghost-hover);
	}

	.callout-palette-info {
		--cb-color: var(--spk-info);
		--cb-bg: var(--spk-info-bg);
		--cb-muted: var(--spk-info-muted);
		--cb-hover: var(--spk-info-hover);
		--cb-ghost: var(--spk-info-ghost-hover);
	}

	/* Slots */
	.callout-leading {
		color: var(--cb-muted);
		flex-shrink: 0;
		display: flex;
		align-items: inherit;
	}

	.callout-content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.callout-trailing {
		flex-shrink: 0;
		display: flex;
		align-items: inherit;
	}

	/* Typography inside callout content */
	.callout-content :global(p) {
		font-size: 0.85rem;
		line-height: 1.55;
		opacity: var(--spk-opacity-overlay);
		margin: 0;
	}

	.callout-content :global(strong) {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--cb-muted);
		line-height: 1.3;
	}

	/* <code> inside callout content */
	.callout-content :global(code) {
		font-size: 0.85em;
		font-family: monospace;
		font-weight: 600;
		color: var(--spk-text);
		background: var(--cb-ghost);
		padding: 0.1em 0.35em;
		border-radius: var(--spk-radius-edge);
	}

	/* Icon in leading slot */
	.callout-leading :global(.material-symbols-outlined) {
		font-size: 1.2rem;
	}
</style>
