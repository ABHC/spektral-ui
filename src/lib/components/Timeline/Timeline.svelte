<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import {
		TIMELINE_KEY,
		timelineConfig,
		defaultTimelineConfig,
		type TimelineContext,
		type TimelineVariant,
		type TimelinePalette,
		type TimelineSize,
		type TimelineElevation,
		type TimelineOrientation,
		type TimelineConnectorStyle
	} from './timeline.config.js';

	// Props ----------------------------------------------------------------

	interface Props {
		variant?: TimelineVariant;
		palette?: TimelinePalette;
		size?: TimelineSize;
		elevation?: TimelineElevation;
		rounded?: boolean;
		orientation?: TimelineOrientation;
		connector?: TimelineConnectorStyle;
		completed?: number;
		reverse?: boolean;
		children: Snippet;
	}

	let {
		variant = defaultTimelineConfig.variant,
		palette = defaultTimelineConfig.palette,
		size = defaultTimelineConfig.size,
		elevation = defaultTimelineConfig.elevation,
		rounded = defaultTimelineConfig.rounded,
		orientation = defaultTimelineConfig.orientation,
		connector = defaultTimelineConfig.connector,
		completed = defaultTimelineConfig.completed,
		reverse = defaultTimelineConfig.reverse,
		children
	}: Props = $props();

	// Context --------------------------------------------------------------

	// Reactive monotonic counter. Each TimelineItem calls register() once
	// at init, keeping its index for life. Exposing the running total via
	// a reactive getter lets items in reverse mode know how many siblings
	// they have so they can light the *last* N instead of the first N.
	let total_items = $state(0);

	const ctx: TimelineContext = {
		register: () => {
			const idx = total_items;
			total_items = total_items + 1;
			return idx;
		},
		get palette() {
			return palette;
		},
		get completed() {
			return completed;
		},
		get orientation() {
			return orientation;
		},
		get connector() {
			return connector;
		},
		get reverse() {
			return reverse;
		},
		get total() {
			return total_items;
		}
	};

	setContext(TIMELINE_KEY, ctx);

	// Helpers --------------------------------------------------------------

	const resolve = createVariant(timelineConfig);

	const classes = $derived(
		resolve({
			variant,
			palette,
			size,
			elevation,
			orientation,
			connector,
			rounded: rounded ? true : undefined
		}).trim()
	);
</script>

<div class={classes}>
	{@render children()}
</div>

<style>
	/* Base ---------------------------------------------------------------- */

	.timeline {
		display: flex;
		font-family: var(--spk-font-body);
		color: var(--spk-text);
		--tl-connector-off: var(--spk-tone-hover);
	}

	.timeline-vertical {
		flex-direction: column;
	}

	.timeline-horizontal {
		flex-direction: row;
		align-items: stretch;
	}

	/* Palette - set local custom properties --------------------------- */

	.timeline-palette-accent {
		--tl-color: var(--spk-accent);
		--tl-bg: var(--spk-accent-bg);
		--tl-hover: var(--spk-accent-hover);
		--tl-marker: var(--spk-text-accent);
		--tl-text: var(--spk-accent-muted);
	}

	.timeline-palette-neutral {
		--tl-color: var(--spk-neutral);
		--tl-bg: var(--spk-neutral-bg);
		--tl-hover: var(--spk-neutral-hover);
		--tl-marker: var(--spk-text-neutral);
		--tl-text: var(--spk-neutral-muted);
	}

	.timeline-palette-error {
		--tl-color: var(--spk-error);
		--tl-bg: var(--spk-error-bg);
		--tl-hover: var(--spk-error-hover);
		--tl-marker: var(--spk-text-error);
		--tl-text: var(--spk-error-muted);
	}

	.timeline-palette-warning {
		--tl-color: var(--spk-warning);
		--tl-bg: var(--spk-warning-bg);
		--tl-hover: var(--spk-warning-hover);
		--tl-marker: var(--spk-text-warning);
		--tl-text: var(--spk-warning-muted);
	}

	.timeline-palette-success {
		--tl-color: var(--spk-success);
		--tl-bg: var(--spk-success-bg);
		--tl-hover: var(--spk-success-hover);
		--tl-marker: var(--spk-text-success);
		--tl-text: var(--spk-success-muted);
	}

	.timeline-palette-info {
		--tl-color: var(--spk-info);
		--tl-bg: var(--spk-info-bg);
		--tl-hover: var(--spk-info-hover);
		--tl-marker: var(--spk-text-info);
		--tl-text: var(--spk-info-muted);
	}

	/* Sizes --------------------------------------------------------------- */

	.timeline-sm {
		--tl-dot-size: 1.5rem;
		--tl-dot-font: 0.75rem;
		--tl-line-width: 2px;
		--tl-dash: 4px;
		--tl-font-size: 0.85rem;
		--tl-meta-font-size: 0.7rem;
		--tl-item-gap: 0.75rem;
		--tl-item-pad: 1rem;
		--tl-container-pad: 1rem;
	}

	.timeline-md {
		--tl-dot-size: 2.25rem;
		--tl-dot-font: 0.95rem;
		--tl-line-width: 3px;
		--tl-dash: 5px;
		--tl-font-size: 1rem;
		--tl-meta-font-size: 0.8rem;
		--tl-item-gap: 1rem;
		--tl-item-pad: 1.5rem;
		--tl-container-pad: 1.25rem;
	}

	.timeline-lg {
		--tl-dot-size: 3.25rem;
		--tl-dot-font: 1.15rem;
		--tl-line-width: 4px;
		--tl-dash: 7px;
		--tl-font-size: 1.15rem;
		--tl-meta-font-size: 0.9rem;
		--tl-item-gap: 1.4rem;
		--tl-item-pad: 2rem;
		--tl-container-pad: 1.75rem;
	}

	/* Variants ------------------------------------------------------------ */

	.timeline-ghost {
		background: transparent;
	}

	.timeline-flat {
		background: var(--spk-tone);
		padding: var(--tl-container-pad);
	}

	.timeline-outlined {
		border: var(--spk-border) solid var(--spk-tone-hover);
		padding: var(--tl-container-pad);
	}

	/* Rounded (container) ------------------------------------------------- */

	.timeline-rounded.timeline-flat,
	.timeline-rounded.timeline-outlined {
		border-radius: var(--spk-radius-soft);
	}

	/* Elevation ----------------------------------------------------------- */

	.timeline-elevation-subtle.timeline-flat,
	.timeline-elevation-subtle.timeline-outlined {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.timeline-elevation-hard.timeline-flat,
	.timeline-elevation-hard.timeline-outlined {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}
</style>
