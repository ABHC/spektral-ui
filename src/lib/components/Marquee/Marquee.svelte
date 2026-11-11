<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { marqueeConfig, defaultMarqueeConfig } from './marquee.config.js';

	// Types ------------------------------------------------------------------

	type Variant = 'flat' | 'outlined' | 'ghost';
	type Palette = 'accent' | 'tone' | 'neutral' | 'error' | 'warning' | 'success' | 'info';
	type Elevation = 'none' | 'subtle' | 'hard';
	type Orientation = 'horizontal' | 'vertical';
	type Direction = 'normal' | 'reverse';
	type Fade = 'none' | 'start' | 'end' | 'both';

	// Props ------------------------------------------------------------------

	interface Props {
		variant?: Variant;
		palette?: Palette;
		elevation?: Elevation;
		orientation?: Orientation;
		direction?: Direction;
		duration?: number;
		repeat?: number;
		pause_on_hover?: boolean;
		fade?: Fade;
		gap?: string;
		rounded?: boolean;
		children: Snippet;
	}

	let {
		variant = defaultMarqueeConfig.variant,
		palette = defaultMarqueeConfig.palette,
		elevation = defaultMarqueeConfig.elevation,
		orientation = defaultMarqueeConfig.orientation,
		direction = defaultMarqueeConfig.direction,
		duration = defaultMarqueeConfig.duration,
		repeat = defaultMarqueeConfig.repeat,
		pause_on_hover = defaultMarqueeConfig.pause_on_hover,
		fade = defaultMarqueeConfig.fade,
		gap = defaultMarqueeConfig.gap,
		rounded = defaultMarqueeConfig.rounded,
		children
	}: Props = $props();

	// Helpers ----------------------------------------------------------------

	const resolve = createVariant(marqueeConfig);

	const classes = $derived(
		resolve({
			variant,
			palette,
			elevation,
			orientation,
			direction,
			fade,
			rounded: rounded ? true : undefined,
			pause_on_hover: pause_on_hover ? true : undefined
		}).trim()
	);

	const style = $derived(`--marquee-duration: ${duration}s; --marquee-gap: ${gap};`);

	const copies = $derived(Array.from({ length: Math.max(1, repeat) }));
</script>

<div class={classes} {style}>
	<div class="marquee-viewport">
		<div class="marquee-track">
			<div class="marquee-group">
				{#each copies as _, i (i)}
					{@render children()}
				{/each}
			</div>
			<div class="marquee-group" aria-hidden="true">
				{#each copies as _, i (i)}
					{@render children()}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	/* Base ----------------------------------------------------------------- */

	.marquee {
		--marquee-radius: 12px;
		position: relative;
		display: flex;
		box-sizing: border-box;
		color: var(--spk-text);
		font-family: var(--spk-font-body);
		padding: 15px;
	}

	.marquee-horizontal {
		width: 100%;
	}

	/* Vertical shrinks to content; parent must supply a bounded height */
	.marquee-vertical {
		width: fit-content;
		height: 100%;
	}

	/* Viewport - holds overflow clipping and the fade mask so they don't
       clip the outer shadow/border. */
	.marquee-viewport {
		flex: 1;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	.marquee-vertical .marquee-viewport {
		width: 100%;
		height: 100%;
	}

	/* Palette - set local custom properties -------------------------------- */

	.marquee-palette-accent {
		--mrq-bg: var(--spk-accent-bg);
		--mrq-border: var(--spk-accent-hover);
	}

	.marquee-palette-tone {
		--mrq-bg: var(--spk-tone);
		--mrq-border: var(--spk-tone-hover);
	}

	.marquee-palette-neutral {
		--mrq-bg: var(--spk-neutral-bg);
		--mrq-border: var(--spk-neutral-hover);
	}

	.marquee-palette-error {
		--mrq-bg: var(--spk-error-bg);
		--mrq-border: var(--spk-error-hover);
	}

	.marquee-palette-warning {
		--mrq-bg: var(--spk-warning-bg);
		--mrq-border: var(--spk-warning-hover);
	}

	.marquee-palette-success {
		--mrq-bg: var(--spk-success-bg);
		--mrq-border: var(--spk-success-hover);
	}

	.marquee-palette-info {
		--mrq-bg: var(--spk-info-bg);
		--mrq-border: var(--spk-info-hover);
	}

	/* Variants ------------------------------------------------------------- */

	.marquee-flat {
		background: var(--mrq-bg);
	}

	.marquee-outlined {
		background: transparent;
		border: var(--spk-border) solid var(--mrq-border);
	}

	.marquee-ghost {
		background: transparent;
	}

	/* Rounded -------------------------------------------------------------- */

	.marquee-rounded {
		border-radius: var(--marquee-radius);
	}

	/* Elevation ------------------------------------------------------------ */

	.marquee-elevation-none {
		box-shadow: none;
	}

	.marquee-elevation-subtle {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.marquee-elevation-hard {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}

	/* Track & groups ------------------------------------------------------- */

	.marquee-track {
		display: flex;
		gap: var(--marquee-gap);
		flex-shrink: 0;
		min-width: 100%;
		will-change: transform;
	}

	.marquee-group {
		display: flex;
		gap: var(--marquee-gap);
		flex-shrink: 0;
		align-items: center;
	}

	.marquee-horizontal .marquee-track {
		animation: marquee-scroll-x var(--marquee-duration) linear infinite;
	}

	.marquee-vertical .marquee-track {
		flex-direction: column;
		min-width: 0;
		min-height: 100%;
		animation: marquee-scroll-y var(--marquee-duration) linear infinite;
	}

	.marquee-vertical .marquee-group {
		flex-direction: column;
	}

	/* Direction ------------------------------------------------------------ */

	.marquee-direction-reverse .marquee-track {
		animation-direction: reverse;
	}

	/* Pause on hover ------------------------------------------------------- */

	.marquee-pause-on-hover:hover .marquee-track {
		animation-play-state: paused;
	}

	/* Fade (mask) ---------------------------------------------------------- */

	.marquee-horizontal.marquee-fade-start .marquee-viewport {
		mask-image: linear-gradient(to right, transparent, black 12%);
		-webkit-mask-image: linear-gradient(to right, transparent, black 12%);
	}

	.marquee-horizontal.marquee-fade-end .marquee-viewport {
		mask-image: linear-gradient(to right, black 88%, transparent);
		-webkit-mask-image: linear-gradient(to right, black 88%, transparent);
	}

	.marquee-horizontal.marquee-fade-both .marquee-viewport {
		mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
	}

	.marquee-vertical.marquee-fade-start .marquee-viewport {
		mask-image: linear-gradient(to bottom, transparent, black 12%);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 12%);
	}

	.marquee-vertical.marquee-fade-end .marquee-viewport {
		mask-image: linear-gradient(to bottom, black 88%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, black 88%, transparent);
	}

	.marquee-vertical.marquee-fade-both .marquee-viewport {
		mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
	}

	/* Keyframes ------------------------------------------------------------ */

	@keyframes marquee-scroll-x {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-50% - var(--marquee-gap) / 2));
		}
	}

	@keyframes marquee-scroll-y {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(calc(-50% - var(--marquee-gap) / 2));
		}
	}

	/* Reduced motion ------------------------------------------------------- */

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
