<script lang="ts">
	import { createVariant } from "../../utils/builder.js";
	import {
		avatarConfig,
		type AvatarSize,
		type AvatarStatus,
		type AvatarPalette,
		type AvatarShape,
		type AvatarElevation,
	} from "./avatar.config.js";

	interface Props {
		size?: AvatarSize;
		status?: AvatarStatus;
		palette?: AvatarPalette;
		shape?: AvatarShape;
		elevation?: AvatarElevation;
		src?: string;
		alt?: string;
		label?: string;
		onclick?: () => void;
	}

	let {
		size = "md",
		status = undefined,
		palette = "accent",
		shape = "rounded",
		elevation = "none",
		src = undefined,
		alt = "",
		label = undefined,
		onclick = undefined,
	}: Props = $props();

	// Helpers ----------------------------------------------------------------

	const resolve = createVariant(avatarConfig);

	const avatar_classes = $derived(resolve({ size, palette, shape, elevation }));
	const status_class = $derived(resolve({ status }));

	const dot_classes = $derived(
		status != undefined ? `state-dot ${status_class}`.trim() : ""
	);

	const truncated_label = $derived(label?.slice(0, 3).toUpperCase());
</script>

{#if onclick}
	<button class={avatar_classes} {onclick} type="button">
		{#if src}
			<img class="avatar-img" {src} {alt} />
		{:else if truncated_label}
			{truncated_label}
		{/if}
		{#if status}
			<span class={dot_classes}></span>
		{/if}
	</button>
{:else}
	<div class={avatar_classes}>
		{#if src}
			<img class="avatar-img" {src} {alt} />
		{:else if truncated_label}
			{truncated_label}
		{/if}
		{#if status}
			<span class={dot_classes}></span>
		{/if}
	</div>
{/if}

<style>
	.avatar-base {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.65rem;
		font-weight: 700;
		flex-shrink: 0;
		letter-spacing: 0.02em;
		overflow: visible;
	}

	button.avatar-base {
		cursor: pointer;
		border: none;
		padding: 0;
	}

	/* Palette ---------------------------------------------------------------- */

	.avatar-palette-accent {
		background: var(--spk-accent);
		color: var(--spk-text-accent);
	}

	.avatar-palette-tone {
		background: var(--spk-tone-hover);
		color: var(--spk-text-muted);
	}

	/* Sizes ------------------------------------------------------------------ */

	.avatar-xs {
		width: 32px;
		height: 32px;
		font-size: 0.55rem;
	}

	.avatar-sm {
		width: 48px;
		height: 48px;
		font-size: 0.7rem;
	}

	.avatar-md {
		width: 72px;
		height: 72px;
		font-size: 0.9rem;
	}

	.avatar-lg {
		width: 112px;
		height: 112px;
		font-size: 1.1rem;
	}

	.avatar-xl {
		/* Fluid between lg (112px/1.1rem @ 375px viewport) and the fixed 160px/1.5rem (@ 1280px+) */
		width: clamp(112px, calc(92px + 5.3vw), 160px);
		height: clamp(112px, calc(92px + 5.3vw), 160px);
		font-size: clamp(1.1rem, calc(0.93rem + 0.044vw), 1.5rem);
	}

	.avatar-2xl {
		/* Fluid between 140px/1.5rem (@ 375px viewport) and the fixed 320px/2.5rem (@ 1280px+) */
		width: clamp(140px, calc(65px + 19.9vw), 320px);
		height: clamp(140px, calc(65px + 19.9vw), 320px);
		font-size: clamp(1.5rem, calc(1.09rem + 0.11vw), 2.5rem);
	}

	/* Shape ------------------------------------------------------------------ */

	.avatar-rounded {
		border-radius: var(--spk-radius-soft);
	}

	.avatar-circular {
		border-radius: var(--spk-radius-circle);
	}

	.avatar-square {
		border-radius: 0;
	}

	/* Elevation -------------------------------------------------------------- */

	.avatar-elevation-subtle {
		box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
	}

	.avatar-elevation-hard {
		box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
	}

	/* Image ------------------------------------------------------------------ */

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}

	/* State dot -------------------------------------------------------------- */

	.state-dot {
		position: absolute;
		left: 95%;
		top: 95%;
		transform: translate(-50%, -50%);
		width: 22%;
		height: 22%;
		border-radius: var(--spk-radius-circle);
		border: var(--spk-border) solid var(--dot-bg, var(--spk-tone-bg));
	}

	/* On a circular avatar, anchor the dot at 85%/85% so it sits on the
	   45° edge of the circle rather than overflowing the bounding box. */
	.avatar-circular .state-dot {
		left: 85%;
		top: 85%;
	}

	button.state-dot {
		cursor: pointer;
	}

	.avatar-online {
		background: var(--spk-success);
	}

	.avatar-offline {
		background: var(--spk-error);
	}

	.avatar-absent {
		background: var(--spk-warning);
	}

	.avatar-do-not-disturb {
		background: var(--dot-bg, var(--spk-tone-bg));
		box-shadow: inset 0 0 0 2px var(--spk-neutral);
	}
</style>
