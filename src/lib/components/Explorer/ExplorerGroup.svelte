<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder.js";
    import { explorerGroupConfig } from "./explorer.config.js";

    interface Props {
        label: string;
        leading?: Snippet;
        collapsible?: boolean;
        headline?: boolean;
        open?: boolean;
        children: Snippet;
    }

    let {
        label,
        leading,
        collapsible = true,
        headline = true,
        open = true,
        children,
    }: Props = $props();

    let is_open: boolean = $state(open);

    const resolve = createVariant(explorerGroupConfig);

    const group_classes = $derived(
        resolve({
            open: !collapsible ? "true" : is_open ? "true" : "false",
        }).trim()
    );
</script>

<div class={group_classes}>
    {#if collapsible}
        <button
            class="explorer-group-header-btn"
            onclick={() => { is_open = !is_open; }}
            aria-expanded={is_open}
        >
            {#if leading}
                <span class="explorer-group-leading" aria-hidden="true">
                    {@render leading()}
                </span>
            {/if}

            {#if headline}
                <div class="explorer-group-headline">
                    <span class="explorer-group-label">{label}</span>
                    <hr>
                </div>
            {:else}
                <span class="explorer-group-label">{label}</span>
            {/if}

            <span class="explorer-group-chevron" aria-hidden="true">
                <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <polyline points="4 2 8 6 4 10" />
                </svg>
            </span>
        </button>
    {:else}
        <div
            class="explorer-group-header"
            aria-expanded={is_open}
        >
            {#if leading}
                <span class="explorer-group-leading" aria-hidden="true">
                    {@render leading()}
                </span>
            {/if}

            {#if headline}
                <div class="explorer-group-headline">
                    <span class="explorer-group-label">{label}</span>
                    <hr>
                </div>
            {:else}
                <span class="explorer-group-label">{label}</span>
            {/if}
        </div>
    {/if}

    {#if is_open}
        <div class="explorer-group-body">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .explorer-group {
        display: flex;
        flex-direction: column;
    }

    .explorer-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.4rem 0.5rem;
        background: transparent;
        border: none;
        color: var(--explorer-text, currentColor);
        border-radius: var(--radius-edge);
        transition: background var(--spk-duration-quick) ease;
        width: 90%;
        text-align: left;
    }

    .explorer-group-header-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.4rem 0.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--explorer-text, currentColor);
        border-radius: var(--radius-edge);
        transition: background var(--spk-duration-quick) ease;
        width: 100%;
        text-align: left;
    }

    .explorer-group-header-btn:hover {
        background: var(--explorer-hover-bg, rgba(128, 128, 128, 0.1));
    }

    .explorer-group-leading {
        display: flex;
        align-items: center;
        font-size: 1rem;
        line-height: 1;
        flex-shrink: 0;
    }

    .explorer-group-headline {
        display: flex;
        align-items: baseline;
        flex: 1;
        gap: 0.25rem;
    }

    .explorer-group-headline hr {
        flex: 1;
        border-style: solid;                                                                                                                                                                                                            
        border-width: 1px;
        border-color: var(--explorer-text);
    }

    .explorer-group-label {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-family: var(--font-heading, inherit);
        flex: 1;
    }

    .explorer-group-chevron {
        display: flex;
        align-items: center;
        transition: transform var(--spk-duration-base) var(--spk-ease-glide);
        opacity: 1;
        flex-shrink: 0;
    }

    .explorer-group-open .explorer-group-chevron {
        transform: rotate(90deg);
    }

    .explorer-group-body {
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding-left: 0.25rem;
    }
</style>
