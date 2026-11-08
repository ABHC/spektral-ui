<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder.js";
    import { popoverConfig, defaultPopoverConfig } from "./popover.config.js";
    import type { PopoverPalette, PopoverElevation, PopoverDirection, PopoverAlign } from "./popover.config.js";

    /*
        direction_collapsed / align_collapsed : override direction/align below the 1024px
        desktop breakpoint - e.g. a popover anchored bottom/end on desktop can flip to
        top/start once the anchor is likely to sit near the viewport edge on mobile/tablet.
        Pure CSS, same breakpoint TileGrid/Hero already use. Leave undefined to keep
        direction/align unchanged at every size.
    */
    interface Props {
        open?: boolean;
        onclose?: () => void;
        max_height?: string;
        width?: string;
        match_width?: boolean;
        direction?: PopoverDirection;
        align?: PopoverAlign;
        direction_collapsed?: PopoverDirection;
        align_collapsed?: PopoverAlign;
        gap?: string;
        palette?: PopoverPalette;
        rounded?: boolean;
        elevation?: PopoverElevation;
        trigger: Snippet;
        children: Snippet;
    }

    let {
        open = $bindable(false),
        onclose,
        max_height = "320px",
        width,
        match_width = false,
        direction = defaultPopoverConfig.direction,
        align = defaultPopoverConfig.align,
        direction_collapsed = undefined,
        align_collapsed = undefined,
        gap = "6px",
        palette = defaultPopoverConfig.palette,
        rounded = defaultPopoverConfig.rounded,
        elevation = defaultPopoverConfig.elevation,
        trigger,
        children,
    }: Props = $props();

    const resolve = createVariant(popoverConfig);

    const panel_classes = $derived(resolve({ palette, rounded, elevation }));

    const panel_style = $derived(
        `max-height: ${max_height};` +
        (width ? ` width: ${width};` : '') +
        ` --popover-gap: ${gap};`
    );

    let anchor_el: HTMLDivElement;

    function handle_outside(e: MouseEvent) {
        if (open && anchor_el && !anchor_el.contains(e.target as Node)) {
            onclose?.();
        }
    }

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "Escape") onclose?.();
    }
</script>

<svelte:window
    onclick={open ? handle_outside : undefined}
    onkeydown={open ? handle_keydown : undefined}
/>

<div class="popover-anchor" bind:this={anchor_el}>
    {@render trigger()}

    {#if open}
        <div
            class="{panel_classes} popover-direction-{direction} popover-align-{align}
                {direction_collapsed ? `popover-direction-collapsed-${direction_collapsed}` : ''}
                {align_collapsed ? `popover-align-collapsed-${align_collapsed}` : ''}"
            class:popover-match-width={match_width}
            style={panel_style}
        >
            {@render children()}
        </div>
    {/if}
</div>

<style>
    /* Anchor ---------------------------------------------------------- */

    .popover-anchor {
        position: relative;
    }

    /* Panel ----------------------------------------------------------- */

    .popover {
        position: absolute;
        z-index: var(--spk-z-floating);
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        box-sizing: border-box;
    }

    /* Direction - main axis ------------------------------------------- */

    .popover-direction-bottom {
        top: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-bottom var(--spk-duration-quick) var(--spk-ease-out);
    }

    .popover-direction-top {
        bottom: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-top var(--spk-duration-quick) var(--spk-ease-out);
    }

    .popover-direction-left {
        right: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-left var(--spk-duration-quick) var(--spk-ease-out);
    }

    .popover-direction-right {
        left: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-right var(--spk-duration-quick) var(--spk-ease-out);
    }

    /* Align - cross axis for top/bottom ------------------------------- */

    .popover-direction-top.popover-align-start,
    .popover-direction-bottom.popover-align-start {
        left: 0;
    }

    .popover-direction-top.popover-align-center,
    .popover-direction-bottom.popover-align-center {
        left: 50%;
        translate: -50% 0;
    }

    .popover-direction-top.popover-align-end,
    .popover-direction-bottom.popover-align-end {
        right: 0;
    }

    /* Align - cross axis for left/right ------------------------------- */

    .popover-direction-left.popover-align-start,
    .popover-direction-right.popover-align-start {
        top: 0;
    }

    .popover-direction-left.popover-align-center,
    .popover-direction-right.popover-align-center {
        top: 50%;
        translate: 0 -50%;
    }

    .popover-direction-left.popover-align-end,
    .popover-direction-right.popover-align-end {
        bottom: 0;
    }

    /*
        Responsive override - below 1024px, direction_collapsed/align_collapsed (if set)
        take over from direction/align. Same single-class specificity as the rules above;
        placed after them so source order settles the tie once the media query matches.
    */

    @media (max-width: 1023px) {
        .popover.popover-direction-collapsed-bottom {
            top: calc(100% + var(--popover-gap, 6px));
            bottom: auto;
            animation: popover-in-bottom var(--spk-duration-quick) var(--spk-ease-out);
        }

        .popover.popover-direction-collapsed-top {
            bottom: calc(100% + var(--popover-gap, 6px));
            top: auto;
            animation: popover-in-top var(--spk-duration-quick) var(--spk-ease-out);
        }

        .popover.popover-direction-collapsed-left {
            right: calc(100% + var(--popover-gap, 6px));
            left: auto;
            animation: popover-in-left var(--spk-duration-quick) var(--spk-ease-out);
        }

        .popover.popover-direction-collapsed-right {
            left: calc(100% + var(--popover-gap, 6px));
            right: auto;
            animation: popover-in-right var(--spk-duration-quick) var(--spk-ease-out);
        }

        :is(.popover-direction-top, .popover-direction-bottom,
            .popover-direction-collapsed-top, .popover-direction-collapsed-bottom).popover-align-collapsed-start {
            left: 0;
            right: auto;
            translate: none;
        }

        :is(.popover-direction-top, .popover-direction-bottom,
            .popover-direction-collapsed-top, .popover-direction-collapsed-bottom).popover-align-collapsed-center {
            left: 50%;
            right: auto;
            translate: -50% 0;
        }

        :is(.popover-direction-top, .popover-direction-bottom,
            .popover-direction-collapsed-top, .popover-direction-collapsed-bottom).popover-align-collapsed-end {
            right: 0;
            left: auto;
            translate: none;
        }

        :is(.popover-direction-left, .popover-direction-right,
            .popover-direction-collapsed-left, .popover-direction-collapsed-right).popover-align-collapsed-start {
            top: 0;
            bottom: auto;
        }

        :is(.popover-direction-left, .popover-direction-right,
            .popover-direction-collapsed-left, .popover-direction-collapsed-right).popover-align-collapsed-center {
            top: 50%;
            bottom: auto;
            translate: 0 -50%;
        }

        :is(.popover-direction-left, .popover-direction-right,
            .popover-direction-collapsed-left, .popover-direction-collapsed-right).popover-align-collapsed-end {
            bottom: 0;
            top: auto;
        }
    }

    /* Match width - panel stretches to anchor width -------------------- */

    .popover-match-width {
        left: 0;
        right: 0;
        translate: none;
    }

    /* Animations ------------------------------------------------------ */

    @keyframes popover-in-bottom {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes popover-in-top {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes popover-in-left {
        from { opacity: 0; transform: translateX(4px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes popover-in-right {
        from { opacity: 0; transform: translateX(-4px); }
        to { opacity: 1; transform: translateX(0); }
    }

    /* Palette - tone -------------------------------------------------- */

    .popover-palette-tone {
        background: var(--spk-tone);
        border: var(--spk-border) solid var(--spk-tone-hover);
        color: var(--spk-text);
        scrollbar-color: var(--spk-tone-hover) var(--spk-tone)
    }

    /* Palette - accent ------------------------------------------------ */

    .popover-palette-accent {
        background: var(--spk-accent);
        border: var(--spk-border) solid var(--spk-accent-hover);
        color: var(--spk-text-accent);
        scrollbar-color: var(--spk-accent-muted) var(--spk-accent)
    }

    /* Palette - accentbg ---------------------------------------------- */

    .popover-palette-accentbg {
        background: var(--spk-accent-bg);
        border: var(--spk-border) solid var(--spk-tone-hover);
        color: var(--spk-text-accent);
        scrollbar-color: var(--spk-accent-hover) var(--spk-accent-bg)
    }

    /* Rounded --------------------------------------------------------- */

    .popover-rounded {
        border-radius: var(--spk-radius-soft);
    }

    /* Elevation ------------------------------------------------------- */

    .popover-elevation-none {
        box-shadow: none;
    }

    .popover-elevation-subtle {
        box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
    }

    .popover-elevation-hard {
        box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
    }
</style>
