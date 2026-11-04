<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder.js";
    import { listItemConfig } from './listItem.config.js';

    type Variant = "flat" | "outlined" | "ghost" | "ambient";
    type Size = "sm" | "md" | "lg";
    type Palette = "tone" | "accent" | "neutral" | "error" | "warning" | "success" | "info";
    type Elevation = "none" | "subtle" | "hard";

    interface Props {
        label: string;
        variant?: Variant;
        size?: Size;
        palette?: Palette;
        elevation?: Elevation;
        rounded?: boolean;
        active?: boolean;
        leading?: Snippet;
        trailing?: Snippet;
        children?: Snippet;
        onclick?: () => void;
    }

    let {
        label,
        variant = "flat",
        size = "md",
        palette = "tone",
        elevation = "none",
        rounded = false,
        active = false,
        leading,
        trailing,
        children,
        onclick,
    }: Props = $props();

    const resolve = createVariant(listItemConfig);
    const wrapper_classes = $derived(
        resolve({
            variant,
            size,
            palette,
            elevation,
            rounded: rounded ? true : undefined,
            active: active ? true : undefined,
        }).trim()
    );
</script>

{#snippet content()}
    {#if leading}
        <div class="leading">
            {@render leading()}
        </div>
    {/if}

    <div class="supporting-text">
        <div class="main-supporting">
            {label}
        </div>
        {#if children}
            <div class="extra-supporting">
                {@render children()}
            </div>
        {/if}
    </div>

    {#if trailing}
        <div class="trailing">
            {@render trailing()}
        </div>
    {/if}
{/snippet}

{#if onclick}
    <button class="{wrapper_classes}" {onclick}>
        {@render content()}
    </button>
{:else}
    <div class="{wrapper_classes}">
        {@render content()}
    </div>
{/if}

<style>
    /* Reset button styles */
    button.list-item {
        font: inherit;
        text-align: inherit;
        width: 100%;
        cursor: pointer;
    }

    button.list-item:focus { outline: none; }
    button.list-item:focus-visible {
        outline: var(--spk-focus-ring-width) solid var(--spk-focus-ring);
        outline-offset: var(--spk-focus-ring-offset);
    }

    /* Base */
    .list-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border: var(--spk-border) solid transparent;
        transition: background var(--spk-duration-base) ease, border-color var(--spk-duration-base) ease, box-shadow var(--spk-duration-base) ease;
    }

    /* Palette variables */

    .list-item-palette-tone {
        --li-bg: var(--spk-tone);
        --li-text: var(--spk-text);
        --li-hover: var(--spk-tone-hover);
        --li-ghost-hover: var(--spk-tone-ghost-hover);
        --li-border: var(--spk-accent);
    }

    .list-item-palette-accent {
        --li-bg: var(--spk-accent);
        --li-text: var(--spk-text-accent);
        --li-hover: var(--spk-accent-hover);
        --li-ghost-hover: var(--spk-accent-ghost-hover);
        --li-border: var(--spk-accent-muted);
    }

    .list-item-palette-error {
        --li-bg: var(--spk-error);
        --li-text: var(--spk-text-error);
        --li-hover: var(--spk-error-hover);
        --li-ghost-hover: var(--spk-error-ghost-hover);
        --li-border: var(--spk-error-muted);
    }

    .list-item-palette-warning {
        --li-bg: var(--spk-warning);
        --li-text: var(--spk-text-warning);
        --li-hover: var(--spk-warning-hover);
        --li-ghost-hover: var(--spk-warning-ghost-hover);
        --li-border: var(--spk-warning-muted);
    }

    .list-item-palette-success {
        --li-bg: var(--spk-success);
        --li-text: var(--spk-text-success);
        --li-hover: var(--spk-success-hover);
        --li-ghost-hover: var(--spk-success-ghost-hover);
        --li-border: var(--spk-success-muted);
    }

    .list-item-palette-info {
        --li-bg: var(--spk-info);
        --li-text: var(--spk-text-info);
        --li-hover: var(--spk-info-hover);
        --li-ghost-hover: var(--spk-info-ghost-hover);
        --li-border: var(--spk-info-muted);
    }

    .list-item-palette-neutral {
        --li-bg: var(--spk-neutral);
        --li-text: var(--spk-text-neutral);
        --li-hover: var(--spk-neutral-hover);
        --li-ghost-hover: var(--spk-neutral-ghost-hover);
        --li-border: var(--spk-neutral-muted);
    }

    /* Variant - flat (solid fill, current default look) ----------------- */

    .list-item-flat {
        background: var(--li-bg);
        color: var(--li-text);
    }

    button.list-item-flat:hover {
        background: var(--li-hover);
    }

    button.list-item-flat.list-item-active {
        border-color: var(--li-border);
    }

    /* Variant - outlined (transparent fill, palette-coloured border) ---- */

    .list-item-outlined {
        background: transparent;
        color: var(--spk-text);
        border-color: var(--li-bg);
    }

    button.list-item-outlined:hover {
        background: var(--li-hover);
    }

    button.list-item-outlined.list-item-active {
        border-color: var(--li-border);
    }

    /* Variant - ghost (transparent fill palette-coloured) */

    .list-item-ghost {
        background: transparent;
        color: var(--spk-text);
        padding: 0.25rem;
        border: none;
        border-left: var(--spk-border) solid transparent;
        border-right: var(--spk-border) solid transparent;
    }

    button.list-item-ghost.list-item-active {
        border-left-color: var(--li-border);
    }

    button.list-item-ghost:hover {
        background: var(--li-ghost-hover);
    }

    .list-item-ghost.list-item-active.list-item-rounded {
        border-radius: 0 var(--spk-radius-soft) var(--spk-radius-soft) 0;
    }

    /* Variant - ambient (adapts to context via currentColor, ignores palette) */

    .list-item-ambient {
        background: color-mix(in srgb, currentColor 8%, transparent);
        color: inherit;
    }

    button.list-item-ambient:hover {
        background: color-mix(in srgb, currentColor 15%, transparent);
    }

    button.list-item-ambient.list-item-active {
        border-color: color-mix(in srgb, currentColor 30%, transparent);
    }

    /* Elevation --------------------------------------------------------- */

    .list-item-elevation-subtle {
        box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
    }

    .list-item-elevation-hard {
        box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
    }

    /* Rounded ----------------------------------------------------------- */

    .list-item-rounded {
        border-radius: var(--spk-radius-soft);
    }

    /* Inner elements ---------------------------------------------------- */

    .leading {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .trailing {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-left: auto;
    }

    .supporting-text {
        flex: 1;
        min-width: 0;
    }

    .main-supporting {
        font-weight: 600;
        line-height: 1.2;
    }

    .extra-supporting {
        font-size: 0.8em;
        opacity: var(--spk-opacity-muted);
        margin-top: 0.1rem;
        white-space: pre-line;
    }

    /* Sizes ------------------------------------------------------------- */

    /* small */
    .list-item-sm {
        padding: 0.35rem 0.6rem;
    }

    .list-item-sm .main-supporting {
        font-weight: 500;
        font-size: 0.8rem;
    }

    .list-item-sm .extra-supporting {
        font-size: 0.7rem;
    }

    /* medium */
    .list-item-md {
        padding: 0.6rem 0.9rem;
    }

    .list-item-md .main-supporting {
        font-weight: 600;
    }

    .list-item-md .extra-supporting {
        font-size: 0.8em;
    }

    /* large */
    .list-item-lg {
        padding: 0.9rem 1.25rem;
        font-size: 1.05rem;
    }

    .list-item-lg .main-supporting {
        font-weight: 700;
        font-size: 1.1rem;
    }

    .list-item-lg .extra-supporting {
        font-size: 0.9em;
    }
</style>
