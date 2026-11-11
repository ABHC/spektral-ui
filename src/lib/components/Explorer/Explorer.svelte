<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createVariant } from '../../utils/builder.js';
	import { explorerConfig } from './explorer.config.js';

	type Palette = 'accent' | 'tone';

	interface Props {
		palette?: Palette;
		children: Snippet;
		aria_label?: string;
	}

	let { palette = 'tone', children, aria_label = 'Explorer' }: Props = $props();

	const resolve = createVariant(explorerConfig);

	const root_classes = $derived(
		resolve({
			palette
		}).trim()
	);
</script>

<nav class={root_classes} aria-label={aria_label}>
	{@render children()}
</nav>

<style>
	.explorer-component {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-family: var(--spk-font-body);
	}

	.explorer-palette-accent {
		color: var(--spk-text-accent);
		--explorer-text: var(--spk-text-accent);
		--explorer-muted: var(--spk-text-accent);
		--explorer-border: var(--spk-tone-ghost-hover);
		--explorer-hover-bg: var(--spk-tone-ghost-hover);
		--explorer-active: var(--spk-text-accent);
		--explorer-active-border: var(--spk-text-accent);
	}

	.explorer-palette-tone {
		color: var(--spk-text);
		--explorer-text: var(--spk-text);
		--explorer-muted: var(--spk-text-muted);
		--explorer-border: var(--spk-tone-hover);
		--explorer-hover-bg: var(--spk-tone-hover);
		--explorer-active: var(--spk-accent-muted);
		--explorer-active-border: var(--spk-accent-muted);
	}
</style>
