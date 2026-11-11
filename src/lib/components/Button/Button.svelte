<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { buttonConfig } from './button.config.js';

	type Variant = 'flat' | 'outlined' | 'ghost' | 'naked';
	type Palette = 'accent' | 'tone' | 'neutral' | 'error' | 'warning' | 'success' | 'info';
	type Size = 'sm' | 'md' | 'lg';
	type Animate = 'left' | 'right' | 'top' | 'bottom';
	type Elevation = 'none' | 'subtle' | 'hard';
	type Direction = 'row' | 'column';

	interface Props {
		variant?: Variant;
		palette?: Palette;
		size?: Size;
		elevation?: Elevation;
		elevation_persist?: boolean;
		uppercase?: boolean;
		animate?: Animate;
		active?: boolean;
		rounded?: boolean;
		direction?: Direction;
		aria_label?: string;
		href?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		variant = 'flat',
		palette = 'accent',
		size = 'md',
		elevation = 'none',
		elevation_persist = false,
		uppercase = false,
		animate = undefined,
		active = false,
		rounded = false,
		direction = 'row',
		aria_label = undefined,
		href = undefined,
		onclick = undefined,
		children
	}: Props = $props();

	const resolve = createVariant(buttonConfig);

	const classes = $derived(
		resolve({
			variant,
			palette,
			size,
			elevation,
			elevation_persist,
			animate,
			uppercase,
			active,
			rounded,
			direction
		}).trim()
	);
</script>

{#if href}
	<a {href} class={classes} aria-label={aria_label} aria-current={active ? 'page' : undefined}>
		{@render children?.()}
	</a>
{:else}
	<button
		class={classes}
		aria-label={aria_label}
		aria-current={active ? 'page' : undefined}
		{onclick}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	/* Base -------------------------------------------------------------- */

	a.btn {
		text-decoration: none;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
		transition:
			background var(--spk-duration-base) var(--spk-ease-out),
			color var(--spk-duration-base) var(--spk-ease-out),
			border-color var(--spk-duration-base) var(--spk-ease-out),
			box-shadow var(--spk-duration-base) var(--spk-ease-out),
			transform var(--spk-duration-base) var(--spk-ease-out);
		width: fit-content;
		height: fit-content;
		line-height: 1;
		font-family: var(--spk-font-body);
	}

	.btn:focus {
		outline: none;
	}
	.btn:focus-visible {
		outline: var(--spk-focus-ring-width) solid var(--spk-focus-ring);
		outline-offset: var(--spk-focus-ring-offset);
	}

	/* Variant structure (style only, no color) -------------------------- */

	/* Flat - solid fill */
	.btn-flat {
		border: var(--spk-border) solid transparent;
	}

	/* Outlined - transparent bg, visible border */
	.btn-outlined {
		background: transparent;
		border: var(--spk-border) solid transparent;
	}

	/* Ghost - transparent, nav-style bg-on-hover + active indicator */
	.btn-ghost {
		background: transparent;
		border: none;
		gap: 0.25rem;
		padding: 0.25rem;
		border-top: var(--spk-border) solid transparent;
		border-bottom: var(--spk-border) solid transparent;
	}

	/* Textual - transparent, opacity-only hover */
	.btn-naked {
		border: none;
		background: transparent;
		padding: 0.25rem 0.5rem;
		border-bottom: var(--spk-border) solid transparent;
	}

	.btn-ghost:hover {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.btn-ghost.btn-active.btn-rounded,
	.btn-naked.btn-active.btn-rounded {
		border-radius: var(--spk-radius-soft) var(--spk-radius-soft) 0 0;
	}

	/* Palette × Variant colors ------------------------------------------ */

	/* accent */
	.btn-palette-accent.btn-flat {
		background: var(--spk-accent);
		border-color: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	.btn-palette-accent.btn-flat:hover {
		background: var(--spk-accent-hover);
		border-color: var(--spk-accent-hover);
	}

	.btn-palette-accent.btn-flat.btn-active {
		background: var(--spk-accent-hover);
		border-color: var(--spk-accent-muted);
		color: var(--spk-text-accent);
	}

	.btn-palette-accent.btn-outlined {
		border-color: var(--spk-accent-muted);
		color: var(--spk-accent-muted);
	}

	.btn-palette-accent.btn-outlined:hover {
		background: var(--spk-accent);
		border-color: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	.btn-palette-accent.btn-outlined.btn-active {
		background: var(--spk-accent-hover);
		border-color: var(--spk-accent-hover);
		color: var(--spk-text-accent);
	}

	.btn-palette-accent.btn-ghost {
		color: var(--spk-text-accent);
	}

	.btn-palette-accent.btn-ghost:hover {
		background: var(--spk-accent-ghost-hover);
	}

	.btn-palette-accent.btn-ghost.btn-active {
		border-bottom-color: var(--spk-text-accent);
	}

	.btn-palette-accent.btn-naked {
		color: var(--spk-accent-muted);
	}

	.btn-palette-accent.btn-naked:hover {
		color: var(--spk-accent);
	}

	.btn-palette-accent.btn-naked.btn-active {
		color: var(--spk-accent-muted);
		border-color: var(--spk-accent);
	}

	/* tone */
	.btn-palette-tone.btn-flat {
		background: var(--spk-tone);
		color: var(--spk-text);
	}

	.btn-palette-tone.btn-flat:hover {
		background: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	.btn-palette-tone.btn-flat.btn-active {
		background: var(--spk-accent);
		border-color: var(--spk-tone-muted);
		color: var(--spk-text-accent);
	}

	.btn-palette-tone.btn-outlined {
		border-color: var(--spk-tone-muted);
		color: var(--spk-tone-muted);
	}

	.btn-palette-tone.btn-outlined:hover {
		background: var(--spk-accent);
		border-color: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	.btn-palette-tone.btn-outlined.btn-active {
		background: var(--spk-accent-hover);
		border-color: var(--spk-accent-hover);
		color: var(--spk-text-accent);
	}

	.btn-palette-tone.btn-ghost {
		color: var(--spk-text);
	}

	.btn-palette-tone.btn-ghost:hover {
		background: var(--spk-tone-ghost);
	}

	.btn-palette-tone.btn-ghost.btn-active {
		border-bottom-color: var(--spk-accent);
	}

	.btn-palette-tone.btn-naked {
		color: var(--spk-text-muted);
	}

	.btn-palette-tone.btn-naked:hover {
		color: var(--spk-text);
	}

	.btn-palette-tone.btn-naked.btn-active {
		color: var(--spk-text);
		border-color: var(--spk-text);
	}

	/* error */
	.btn-palette-error.btn-flat {
		background: var(--spk-error);
		border-color: var(--spk-error);
		color: var(--spk-text-error);
	}

	.btn-palette-error.btn-flat:hover {
		background: var(--spk-error-hover);
		border-color: var(--spk-error-hover);
	}

	.btn-palette-error.btn-flat.btn-active {
		background: var(--spk-error-hover);
		border-color: var(--spk-error-muted);
		color: var(--spk-text-error);
	}

	.btn-palette-error.btn-outlined {
		border-color: var(--spk-error-muted);
		color: var(--spk-error-muted);
	}

	.btn-palette-error.btn-outlined:hover {
		background: var(--spk-error);
		border-color: var(--spk-error);
		color: var(--spk-text-error);
	}

	.btn-palette-error.btn-outlined.btn-active {
		background: var(--spk-error-hover);
		border-color: var(--spk-error-hover);
		color: var(--spk-text-error);
	}

	.btn-palette-error.btn-ghost {
		color: var(--spk-error-muted);
	}

	.btn-palette-error.btn-ghost:hover {
		background: var(--spk-error-ghost-hover);
		color: var(--spk-error-muted);
	}

	.btn-palette-error.btn-ghost.btn-active {
		border-bottom-color: var(--spk-error-muted);
	}

	.btn-palette-error.btn-naked {
		color: var(--spk-error-muted);
	}

	.btn-palette-error.btn-naked:hover {
		color: var(--spk-error);
	}

	.btn-palette-error.btn-naked.btn-active {
		color: var(--spk-error-muted);
		border-color: var(--spk-error);
	}

	/* warning */
	.btn-palette-warning.btn-flat {
		background: var(--spk-warning);
		border-color: var(--spk-warning);
		color: var(--spk-text-warning);
	}

	.btn-palette-warning.btn-flat:hover {
		background: var(--spk-warning-hover);
		border-color: var(--spk-warning-hover);
	}

	.btn-palette-warning.btn-flat.btn-active {
		background: var(--spk-warning-hover);
		border-color: var(--spk-warning-muted);
		color: var(--spk-text-warning);
	}

	.btn-palette-warning.btn-outlined {
		border-color: var(--spk-warning-muted);
		color: var(--spk-warning-muted);
	}

	.btn-palette-warning.btn-outlined:hover {
		background: var(--spk-warning);
		border-color: var(--spk-warning);
		color: var(--spk-text-warning);
	}

	.btn-palette-warning.btn-outlined.btn-active {
		background: var(--spk-warning-hover);
		border-color: var(--spk-warning-hover);
		color: var(--spk-text-warning);
	}

	.btn-palette-warning.btn-ghost {
		color: var(--spk-warning-muted);
	}

	.btn-palette-warning.btn-ghost:hover {
		background: var(--spk-warning-ghost-hover);
		color: var(--spk-warning-muted);
	}

	.btn-palette-warning.btn-ghost.btn-active {
		border-bottom-color: var(--spk-warning-muted);
	}

	.btn-palette-warning.btn-naked {
		color: var(--spk-warning-muted);
	}

	.btn-palette-warning.btn-naked:hover {
		color: var(--spk-warning);
	}

	.btn-palette-warning.btn-naked.btn-active {
		color: var(--spk-warning-muted);
		border-color: var(--spk-warning);
	}

	/* success */
	.btn-palette-success.btn-flat {
		background: var(--spk-success);
		border-color: var(--spk-success);
		color: var(--spk-text-success);
	}

	.btn-palette-success.btn-flat:hover {
		background: var(--spk-success-hover);
		border-color: var(--spk-success-hover);
	}

	.btn-palette-success.btn-flat.btn-active {
		background: var(--spk-success-hover);
		border-color: var(--spk-success-muted);
		color: var(--spk-text-success);
	}

	.btn-palette-success.btn-outlined {
		border-color: var(--spk-success-muted);
		color: var(--spk-success-muted);
	}

	.btn-palette-success.btn-outlined:hover {
		background: var(--spk-success);
		border-color: var(--spk-success);
		color: var(--spk-text-success);
	}

	.btn-palette-success.btn-outlined.btn-active {
		background: var(--spk-success-hover);
		border-color: var(--spk-success-hover);
		color: var(--spk-text-success);
	}

	.btn-palette-success.btn-ghost {
		color: var(--spk-success-muted);
	}

	.btn-palette-success.btn-ghost:hover {
		background: var(--spk-success-ghost-hover);
		color: var(--spk-success-muted);
	}

	.btn-palette-success.btn-ghost.btn-active {
		border-bottom-color: var(--spk-success-muted);
	}

	.btn-palette-success.btn-naked {
		color: var(--spk-success-muted);
	}

	.btn-palette-success.btn-naked:hover {
		color: var(--spk-success);
	}

	.btn-palette-success.btn-naked.btn-active {
		color: var(--spk-success-muted);
		border-color: var(--spk-success);
	}

	/* info */
	.btn-palette-info.btn-flat {
		background: var(--spk-info);
		border-color: var(--spk-info);
		color: var(--spk-text-info);
	}

	.btn-palette-info.btn-flat:hover {
		background: var(--spk-info-hover);
		border-color: var(--spk-info-hover);
	}

	.btn-palette-info.btn-flat.btn-active {
		background: var(--spk-info-hover);
		border-color: var(--spk-info-muted);
		color: var(--spk-text-info);
	}

	.btn-palette-info.btn-outlined {
		border-color: var(--spk-info-muted);
		color: var(--spk-info-muted);
	}

	.btn-palette-info.btn-outlined:hover {
		background: var(--spk-info);
		border-color: var(--spk-info);
		color: var(--spk-text-info);
	}

	.btn-palette-info.btn-outlined.btn-active {
		background: var(--spk-info-hover);
		border-color: var(--spk-info-hover);
		color: var(--spk-text-info);
	}

	.btn-palette-info.btn-ghost {
		color: var(--spk-info-muted);
	}

	.btn-palette-info.btn-ghost:hover {
		background: var(--spk-info-ghost-hover);
		color: var(--spk-info-muted);
	}

	.btn-palette-info.btn-ghost.btn-active {
		border-bottom-color: var(--spk-info-muted);
	}

	.btn-palette-info.btn-naked {
		color: var(--spk-info-muted);
	}

	.btn-palette-info.btn-naked:hover {
		color: var(--spk-info);
	}

	.btn-palette-info.btn-naked.btn-active {
		color: var(--spk-info-muted);
		border-color: var(--spk-info);
	}

	/* neutral */
	.btn-palette-neutral.btn-flat {
		background: var(--spk-neutral);
		border-color: var(--spk-neutral);
		color: var(--spk-text-neutral);
	}

	.btn-palette-neutral.btn-flat:hover {
		background: var(--spk-neutral-hover);
		border-color: var(--spk-neutral-hover);
	}

	.btn-palette-neutral.btn-flat.btn-active {
		background: var(--spk-neutral-hover);
		border-color: var(--spk-neutral-muted);
		color: var(--spk-text-neutral);
	}

	.btn-palette-neutral.btn-outlined {
		border-color: var(--spk-neutral-muted);
		color: var(--spk-neutral-muted);
	}

	.btn-palette-neutral.btn-outlined:hover {
		background: var(--spk-neutral);
		border-color: var(--spk-neutral);
		color: var(--spk-text-neutral);
	}

	.btn-palette-neutral.btn-outlined.btn-active {
		background: var(--spk-neutral-hover);
		border-color: var(--spk-neutral-hover);
		color: var(--spk-text-neutral);
	}

	.btn-palette-neutral.btn-ghost {
		color: var(--spk-neutral-muted);
	}

	.btn-palette-neutral.btn-ghost:hover {
		background: var(--spk-neutral-ghost-hover);
		color: var(--spk-neutral-muted);
	}

	.btn-palette-neutral.btn-ghost.btn-active {
		border-bottom-color: var(--spk-neutral-muted);
	}

	.btn-palette-neutral.btn-naked {
		color: var(--spk-neutral-muted);
	}

	.btn-palette-neutral.btn-naked:hover {
		color: var(--spk-neutral);
	}

	.btn-palette-neutral.btn-naked.btn-active {
		color: var(--spk-neutral-muted);
		border-color: var(--spk-neutral);
	}

	/* Elevation - hover only (default) --------------------------------- */

	.btn-elevation-subtle:hover {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.btn-elevation-hard:hover {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}

	/* Elevation - constant (elevation_persist=true) -------------------- */

	.btn-elevation-persist.btn-elevation-subtle {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.btn-elevation-persist.btn-elevation-hard {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}

	/* Sizes ------------------------------------------------------------- */

	.btn-lg {
		font-size: 1.125rem;
		font-weight: 700;
		padding: 0.9rem 1.8rem;
	}

	.btn-md {
		font-weight: 600;
		padding: 0.6rem 1.2rem;
	}

	.btn-sm {
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
	}

	/* ghost: size classes control padding (matches old btn-nav behaviour) */
	.btn-ghost.btn-lg {
		font-size: 1.125rem;
		font-weight: 700;
	}
	.btn-ghost.btn-sm {
		font-size: 0.75rem;
	}

	/* textual: compact padding regardless of size */
	.btn-naked.btn-lg {
		font-size: 1.125rem;
		font-weight: 700;
		padding: 0.3rem 0.6rem;
	}
	.btn-naked.btn-md {
		padding: 0.25rem 0.5rem;
	}
	.btn-naked.btn-sm {
		font-size: 0.75rem;
		padding: 0.15rem 0.35rem;
	}

	/* Rounded ----------------------------------------------------------- */

	.btn-rounded {
		border-radius: var(--spk-radius-soft);
	}

	/* Direction --------------------------------------------------------- */

	.btn-row {
		flex-direction: row;
	}

	/* column - icon + label stacked, square aspect ratio */
	.btn-column {
		flex-direction: column;
		aspect-ratio: 1;
		padding: 0.25rem;
		overflow: hidden;
	}

	.btn-column.btn-sm {
		width: 48px;
		font-size: 0.65rem;
	}
	.btn-column.btn-md {
		width: 64px;
		font-size: 0.8rem;
	}
	.btn-column.btn-lg {
		width: 76px;
		font-size: 1rem;
	}

	/* Animate ----------------------------------------------------------- */

	.btn-animate-left:hover {
		transform: translateX(-4px);
	}
	.btn-animate-right:hover {
		transform: translateX(4px);
	}
	.btn-animate-top:hover {
		transform: translateY(-4px);
	}
	.btn-animate-bottom:hover {
		transform: translateY(4px);
	}

	/* Uppercase --------------------------------------------------------- */

	.btn-uppercase {
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}
</style>
