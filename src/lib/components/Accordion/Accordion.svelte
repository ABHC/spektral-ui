<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { accordionConfig, defaultAccordionConfig } from './accordion.config.js';

	// Types ----------------------------------------------------------------

	type Variant = 'flat' | 'outlined' | 'ghost';
	type Palette = 'accent' | 'tone' | 'neutral' | 'error' | 'warning' | 'success' | 'info';
	type Size = 'sm' | 'md' | 'lg';
	type Elevation = 'none' | 'subtle' | 'hard';

	// Props ----------------------------------------------------------------

	interface Props {
		variant?: Variant;
		palette?: Palette;
		size?: Size;
		elevation?: Elevation;
		rounded?: boolean;
		children: Snippet;
	}

	let {
		variant = defaultAccordionConfig.variant,
		palette = defaultAccordionConfig.palette,
		size = defaultAccordionConfig.size,
		elevation = defaultAccordionConfig.elevation,
		rounded = defaultAccordionConfig.rounded,
		children
	}: Props = $props();

	// Helpers --------------------------------------------------------------

	const resolve = createVariant(accordionConfig);

	const classes = $derived(
		resolve({
			variant,
			palette,
			size,
			elevation,
			rounded: rounded ? true : undefined
		}).trim()
	);
</script>

<div class={classes}>
	{@render children()}
</div>

<style>
	/* Base ---------------------------------------------------------------- */

	.accordion {
		display: flex;
		flex-direction: column;
		font-family: var(--spk-font-body);
		color: var(--spk-text);
	}

	/* Palette - set local custom properties ------------------------------- */

	.accordion-palette-accent {
		--acc-color: var(--spk-accent);
		--acc-bg: var(--spk-accent-bg);
		--acc-hover: var(--spk-accent-hover);
		--acc-text: var(--spk-text-accent);
		--acc-border: var(--spk-accent-hover);
		--acc-header-flat: var(--spk-accent);
		--acc-header-flat-text: var(--spk-text-accent);
		--acc-header-ghost-text: var(--spk-text);
	}

	.accordion-palette-tone {
		--acc-color: var(--spk-tone);
		--acc-bg: var(--spk-tone);
		--acc-hover: var(--spk-tone-hover);
		--acc-text: var(--spk-text);
		--acc-border: var(--spk-tone-hover);
		--acc-header-flat: var(--spk-tone-hover);
		--acc-header-flat-text: var(--spk-text);
		--acc-header-ghost-text: var(--spk-text);
	}

	.accordion-palette-neutral {
		--acc-color: var(--spk-neutral);
		--acc-bg: var(--spk-neutral-bg);
		--acc-hover: var(--spk-neutral-hover);
		--acc-text: var(--spk-text-neutral);
		--acc-border: var(--spk-neutral-hover);
		--acc-header-flat: var(--spk-neutral);
		--acc-header-flat-text: var(--spk-text-neutral);
		--acc-header-ghost-text: var(--spk-text);
	}

	.accordion-palette-error {
		--acc-color: var(--spk-error);
		--acc-bg: var(--spk-error-bg);
		--acc-hover: var(--spk-error-hover);
		--acc-text: var(--spk-text-error);
		--acc-border: var(--spk-error-hover);
		--acc-header-flat: var(--spk-error);
		--acc-header-flat-text: var(--spk-text-error);
		--acc-header-ghost-text: var(--spk-text);
	}

	.accordion-palette-warning {
		--acc-color: var(--spk-warning);
		--acc-bg: var(--spk-warning-bg);
		--acc-hover: var(--spk-warning-hover);
		--acc-text: var(--spk-text-warning);
		--acc-border: var(--spk-warning-hover);
		--acc-header-flat: var(--spk-warning);
		--acc-header-flat-text: var(--spk-text-warning);
		--acc-header-ghost-text: var(--spk-text);
	}

	.accordion-palette-success {
		--acc-color: var(--spk-success);
		--acc-bg: var(--spk-success-bg);
		--acc-hover: var(--spk-success-hover);
		--acc-text: var(--spk-text-success);
		--acc-border: var(--spk-success-hover);
		--acc-header-flat: var(--spk-success);
		--acc-header-flat-text: var(--spk-text-success);
		--acc-header-ghost-text: var(--spk-text);
	}

	.accordion-palette-info {
		--acc-color: var(--spk-info);
		--acc-bg: var(--spk-info-bg);
		--acc-hover: var(--spk-info-hover);
		--acc-text: var(--spk-text-info);
		--acc-border: var(--spk-info-hover);
		--acc-header-flat: var(--spk-info);
		--acc-header-flat-text: var(--spk-text-info);
		--acc-header-ghost-text: var(--spk-text);
	}

	/* Variants ------------------------------------------------------------ */

	.accordion-flat {
		gap: 0.6rem;
	}

	.accordion-outlined {
		gap: 0.6rem;
	}

	.accordion-ghost {
		gap: 0;
	}

	/* Ghost: separator between items */
	.accordion-ghost > :global(.accordion-header + .accordion-header),
	.accordion-ghost > :global(.accordion-item + .accordion-header) {
		border-top: var(--spk-border) solid var(--acc-border, var(--spk-tone-hover));
	}

	/* Sizes --------------------------------------------------------------- */

	.accordion-sm {
		--acc-header-padding: 0.4rem 0.7rem;
		--acc-item-padding: 0.5rem 0.7rem;
		--acc-font-size: 0.8rem;
	}

	.accordion-md {
		--acc-header-padding: 0.6rem 1rem;
		--acc-item-padding: 0.75rem 1rem;
		--acc-font-size: 0.875rem;
	}

	.accordion-lg {
		--acc-header-padding: 0.8rem 1.2rem;
		--acc-item-padding: 1rem 1.2rem;
		--acc-font-size: 1rem;
	}

	/* Elevation ----------------------------------------------------------- */

	/* Ghost: shadow on parent (items form a single visual block) */
	.accordion-ghost.accordion-elevation-subtle {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.accordion-ghost.accordion-elevation-hard {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}

	/* Flat / Outlined: shadow on each child (items are separated by gap) */
	.accordion-flat.accordion-elevation-subtle > :global(.accordion-header),
	.accordion-outlined.accordion-elevation-subtle > :global(.accordion-header) {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.accordion-flat.accordion-elevation-hard > :global(.accordion-header),
	.accordion-outlined.accordion-elevation-hard > :global(.accordion-header) {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}
</style>
