<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { badgeConfig } from './badge.config.js';

	type Variant = 'flat' | 'outlined';
	type Palette = 'accent' | 'tone' | 'neutral' | 'error' | 'warning' | 'success' | 'info';
	type Size = 'sm' | 'md' | 'lg';
	type Elevation = 'none' | 'subtle' | 'hard';

	/*
        Props _________________________________________________________
        variant : flat | outlined 
        palette : color of the badge
        size : sm | md | lg
        uppercase : Text transform + letter-spacing
        elevation : kind of shadow applied to the badge
        pill : true (default) → capsule shape
               false → rounded rectangle
        href : Renders as <a>
        onclick: Renders as <button>. Implicit - no extra prop needed.
        leading : leading slot for icons or other content
        trailing : trailing slot for icons or other content
        on_trailing_click : Makes the trailing icon an actionable button
        trailing_label : aria-label for the trailing slot
        children : Badge label content
    */

	interface Props {
		variant?: Variant;
		palette?: Palette;
		size?: Size;
		uppercase?: boolean;
		elevation?: Elevation;
		pill?: boolean;
		href?: string;
		onclick?: () => void;
		active?: boolean;
		leading?: Snippet;
		trailing?: Snippet;
		on_trailing_click?: () => void;
		trailing_label?: string;
		children?: Snippet;
	}

	let {
		variant = 'flat',
		palette = 'accent',
		size = 'md',
		uppercase = false,
		elevation = 'none',
		pill = false,
		href = undefined,
		onclick = undefined,
		active = false,
		leading = undefined,
		trailing = undefined,
		on_trailing_click = undefined,
		trailing_label = undefined,
		children
	}: Props = $props();

	// Helpers _____________________________________________________________

	const resolve = createVariant(badgeConfig);

	const type_classes = $derived(resolve({ variant, palette, size, uppercase, elevation, pill }));

	const active_class = $derived(active ? 'badge-active' : '');

	const classes = $derived(`${type_classes} ${active_class}`.trim());

	// Root is interactive when onclick or href is provided (implicit)
	const root_is_button = $derived(!!onclick && !href);

	function handle_trailing(e: MouseEvent) {
		e.stopPropagation();
		on_trailing_click?.();
	}
</script>

<!-- Leading icon snippet ------------------------------------------------------ -->

{#snippet leading_slot()}
	{#if leading}
		<span class="badge-leading-icon" aria-hidden="true">
			{@render leading()}
		</span>
	{/if}
{/snippet}

<!-- Trailing icon snippet --------------------------------------------------- -->

{#snippet trailing_slot()}
	{#if trailing}
		{#if on_trailing_click}
			<button
				class="badge-trailing-btn"
				onclick={handle_trailing}
				tabindex={root_is_button ? -1 : 0}
				aria-label={trailing_label}
				type="button"
			>
				<span class="badge-trailing-icon" aria-hidden="true">
					{@render trailing()}
				</span>
			</button>
		{:else}
			<span class="badge-trailing-icon" aria-hidden="true">
				{@render trailing()}
			</span>
		{/if}
	{/if}
{/snippet}

<!-- Root element ------------------------------------------------------------ -->

{#if href}
	<a {href} class={classes}>
		{@render leading_slot()}
		{@render children?.()}
		{@render trailing_slot()}
	</a>
{:else if onclick}
	<button class={classes} {onclick} type="button" aria-pressed={active}>
		{@render leading_slot()}
		{@render children?.()}
		{@render trailing_slot()}
	</button>
{:else}
	<span class={classes}>
		{@render leading_slot()}
		{@render children?.()}
		{@render trailing_slot()}
	</span>
{/if}

<style>
	/* Base --------------------------------------------------------------- */

	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		line-height: 1;
		font-family: var(--spk-font-body);
		text-decoration: none;
		border: var(--spk-border) solid transparent;
		border-radius: var(--spk-radius-edge);
	}

	/* Reset for button/link roots */
	button.badge {
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
	}

	a.badge {
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
	}

	/* Shape -------------------------------------------------------------- */

	.badge-pill {
		border-radius: var(--spk-radius-pill);
	}

	/* Variants ----------------------------------------------------------- */

	.badge-flat {
		font-weight: 600;
	}

	.badge-outlined {
		background: transparent;
	}

	/* Palette ------------------------------------------------------------ */

	/* accent */
	.badge-palette-accent.badge-flat {
		background: var(--spk-accent);
		border-color: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	.badge-palette-accent.badge-outlined {
		border-color: var(--spk-accent-muted);
		color: var(--spk-accent-muted);
	}

	/* tone */
	.badge-palette-tone.badge-flat {
		background: var(--spk-tone);
		border-color: var(--spk-tone);
		color: var(--spk-text);
	}

	.badge-palette-tone.badge-outlined {
		border-color: var(--spk-tone-muted);
		color: var(--spk-text-muted);
	}

	/* error */
	.badge-palette-error.badge-flat {
		background: var(--spk-error);
		border-color: var(--spk-error);
		color: var(--spk-text-error);
	}

	.badge-palette-error.badge-outlined {
		border-color: var(--spk-error-muted);
		color: var(--spk-error-muted);
	}

	/* warning */
	.badge-palette-warning.badge-flat {
		background: var(--spk-warning);
		border-color: var(--spk-warning);
		color: var(--spk-text-warning);
	}

	.badge-palette-warning.badge-outlined {
		border-color: var(--spk-warning-muted);
		color: var(--spk-warning-muted);
	}

	/* success */
	.badge-palette-success.badge-flat {
		background: var(--spk-success);
		border-color: var(--spk-success);
		color: var(--spk-text-success);
	}

	.badge-palette-success.badge-outlined {
		border-color: var(--spk-success-muted);
		color: var(--spk-success-muted);
	}

	/* info */
	.badge-palette-info.badge-flat {
		background: var(--spk-info);
		border-color: var(--spk-info);
		color: var(--spk-text-info);
	}

	.badge-palette-info.badge-outlined {
		border-color: var(--spk-info-muted);
		color: var(--spk-info-muted);
	}

	/* neutral */
	.badge-palette-neutral.badge-flat {
		background: var(--spk-neutral);
		border-color: var(--spk-neutral);
		color: var(--spk-text-neutral);
	}

	.badge-palette-neutral.badge-outlined {
		border-color: var(--spk-neutral-muted);
		color: var(--spk-neutral-muted);
	}

	/* Elevation ----------------------------------------------------------- */

	.badge-elevation-subtle {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.badge-elevation-hard {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}

	/* Uppercase ---------------------------------------------------------- */

	.badge-uppercase {
		font-size: 0.875rem;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	/* Sizes -------------------------------------------------------------- */

	.badge-lg {
		font-size: 1.125rem;
		font-weight: 700;
		padding: 0.65rem 1.3rem;
	}

	.badge-md {
		padding: 0.45rem 0.9rem;
	}

	.badge-sm {
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
	}

	/* Hover - interactive roots only ------------------------------------ */

	/* accent */
	button.badge-flat.badge-palette-accent:hover,
	a.badge-flat.badge-palette-accent:hover {
		/*background: var(--spk-accent-hover);*/
		background: var(--spk-accent-hover);
		border-color: var(--spk-accent-hover);
	}

	button.badge-outlined.badge-palette-accent:hover,
	a.badge-outlined.badge-palette-accent:hover {
		background: var(--spk-accent);
		border-color: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	/* Tone */
	button.badge-flat.badge-palette-tone:hover,
	a.badge-flat.badge-palette-tone:hover {
		background: var(--spk-tone-hover);
		border-color: var(--spk-tone-hover);
	}

	button.badge-outlined.badge-palette-tone:hover,
	a.badge-outlined.badge-palette-tone:hover {
		background: var(--spk-tone-hover);
		border-color: var(--spk-tone-hover);
		color: var(--spk-text);
	}

	/* Error */
	button.badge-flat.badge-palette-error:hover,
	a.badge-flat.badge-palette-error:hover {
		background: var(--spk-error-hover);
		border-color: var(--spk-error-hover);
	}

	button.badge-outlined.badge-palette-error:hover,
	a.badge-outlined.badge-palette-error:hover {
		background: var(--spk-error);
		border-color: var(--spk-error);
		color: var(--spk-text-error);
	}

	/* Warning */
	button.badge-flat.badge-palette-warning:hover,
	a.badge-flat.badge-palette-warning:hover {
		background: var(--spk-warning-hover);
		border-color: var(--spk-warning-hover);
	}

	button.badge-outlined.badge-palette-warning:hover,
	a.badge-outlined.badge-palette-warning:hover {
		background: var(--spk-warning);
		border-color: var(--spk-warning);
		color: var(--spk-text-warning);
	}

	/* Success */
	button.badge-flat.badge-palette-success:hover,
	a.badge-flat.badge-palette-success:hover {
		background: var(--spk-success-hover);
		border-color: var(--spk-success-hover);
	}

	button.badge-outlined.badge-palette-success:hover,
	a.badge-outlined.badge-palette-success:hover {
		background: var(--spk-success);
		border-color: var(--spk-success);
		color: var(--spk-text-success);
	}

	/* Info */
	button.badge-flat.badge-palette-info:hover,
	a.badge-flat.badge-palette-info:hover {
		background: var(--spk-info-hover);
		border-color: var(--spk-info-hover);
	}

	button.badge-outlined.badge-palette-info:hover,
	a.badge-outlined.badge-palette-info:hover {
		background: var(--spk-info);
		border-color: var(--spk-info);
		color: var(--spk-text-info);
	}

	/* Neutral */
	button.badge-flat.badge-palette-neutral:hover,
	a.badge-flat.badge-palette-neutral:hover {
		background: var(--spk-neutral-hover);
		border-color: var(--spk-neutral-hover);
	}

	button.badge-outlined.badge-palette-neutral:hover,
	a.badge-outlined.badge-palette-neutral:hover {
		background: var(--spk-neutral);
		border-color: var(--spk-neutral);
		color: var(--spk-text-neutral);
	}

	/* Selected - mirrors hover styles ------------------------------------ */

	/* accent */
	button.badge-flat.badge-palette-accent.badge-active,
	a.badge-flat.badge-palette-accent.badge-active {
		background: var(--spk-accent-hover);
		border-color: var(--spk-accent-muted);
	}

	button.badge-outlined.badge-palette-accent.badge-active,
	a.badge-outlined.badge-palette-accent.badge-active {
		background: var(--spk-accent);
		border-color: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	/* Tone */
	button.badge-flat.badge-palette-tone.badge-active,
	a.badge-flat.badge-palette-tone.badge-active {
		background: var(--spk-tone-hover);
		border-color: var(--spk-tone-muted);
	}

	button.badge-outlined.badge-palette-tone.badge-active,
	a.badge-outlined.badge-palette-tone.badge-active {
		background: var(--spk-tone-hover);
		border-color: var(--spk-accent);
		color: var(--spk-text);
	}

	/* Error */
	button.badge-flat.badge-palette-error.badge-active,
	a.badge-flat.badge-palette-error.badge-active {
		background: var(--spk-error-hover);
		border-color: var(--spk-error-muted);
	}

	button.badge-outlined.badge-palette-error.badge-active,
	a.badge-outlined.badge-palette-error.badge-active {
		background: var(--spk-error);
		border-color: var(--spk-error);
		color: var(--spk-text-error);
	}

	/* Warning */
	button.badge-flat.badge-palette-warning.badge-active,
	a.badge-flat.badge-palette-warning.badge-active {
		background: var(--spk-warning-hover);
		border-color: var(--spk-warning-muted);
	}

	button.badge-outlined.badge-palette-warning.badge-active,
	a.badge-outlined.badge-palette-warning.badge-active {
		background: var(--spk-warning);
		border-color: var(--spk-warning);
		color: var(--spk-text-warning);
	}

	/* Success */
	button.badge-flat.badge-palette-success.badge-active,
	a.badge-flat.badge-palette-success.badge-active {
		background: var(--spk-success-hover);
		border-color: var(--spk-success-muted);
	}

	button.badge-outlined.badge-palette-success.badge-active,
	a.badge-outlined.badge-palette-success.badge-active {
		background: var(--spk-success);
		border-color: var(--spk-success);
		color: var(--spk-text-success);
	}

	/* Info */
	button.badge-flat.badge-palette-info.badge-active,
	a.badge-flat.badge-palette-info.badge-active {
		background: var(--spk-info-hover);
		border-color: var(--spk-info-muted);
	}

	button.badge-outlined.badge-palette-info.badge-active,
	a.badge-outlined.badge-palette-info.badge-active {
		background: var(--spk-info);
		border-color: var(--spk-info);
		color: var(--spk-text-info);
	}

	/* Neutral */
	button.badge-flat.badge-palette-neutral.badge-active,
	a.badge-flat.badge-palette-neutral.badge-active {
		background: var(--spk-neutral-hover);
		border-color: var(--spk-neutral-muted);
	}

	button.badge-outlined.badge-palette-neutral.badge-active,
	a.badge-outlined.badge-palette-neutral.badge-active {
		background: var(--spk-neutral);
		border-color: var(--spk-neutral);
		color: var(--spk-text-neutral);
	}

	/* Leading icon --------------------------------------------------------- */

	.badge-leading-icon {
		display: inline-flex;
		align-items: center;
		line-height: 1;
	}

	.badge-leading-icon :global(*) {
		font-size: 1em;
		line-height: 1;
	}

	/* Trailing icon ------------------------------------------------------ */

	.badge-trailing-icon {
		display: inline-flex;
		align-items: center;
		line-height: 1;
	}

	.badge-trailing-icon :global(*) {
		font-size: 1em;
		line-height: 1;
	}

	.badge-trailing-btn {
		display: inline-flex;
		align-items: center;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		color: inherit;
		opacity: var(--spk-opacity-muted);
		transition: opacity var(--spk-duration-quick) ease;
		/*font-family: inherit;*/
	}

	.badge-trailing-btn:hover {
		opacity: 1;
	}
</style>
