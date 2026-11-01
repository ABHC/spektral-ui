<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";

    import {
        TILEGRID_KEY,
        defaultTileGridConfig,
        type TileImageDisplay,
        type ImagePosition,
        type TileVariant,
        type TilePalette,
        type Columns,
        type HeroSpan,
        type TileGridElevation,
        type TileGridEffect,
        type TileGridMask,
        type TileGridMaskDirection,
        type TileGridContext,
        type TileAspectRatio,
    } from "./tilegrid.config.js";

    import { type PatternPreset, resolvePatternBackground } from "../../utils/patterns.js";

    // Props -------------------------------------------------------------------

    /*
        Props
        columns : Number of columns on desktop (>= 1024px) - default: 3
        hero_span : How hero tiles span on desktop - default: "half"
        gap : Gap between tiles - any valid CSS length - default: "1.5rem"
        image / image_position / image_size / variant / palette / rounded / elevation /
        elevation_persist / aspect_ratio :
            Grid-wide defaults, inherited by every child Tile through context unless a Tile
            sets its own matching prop to override it locally.
        pattern / pattern_color / pattern_opacity / pattern_size / pattern_mask* :
            Grid-wide decorative pattern behind flat/mockup tiles. Cascades to children as plain
            CSS custom properties (not context) - a Tile overrides it by setting its own
            `pattern`/`pattern_color` props.
        pattern_effect / pattern_effect_opacity : Decorative layer behind the whole grid section.
        children : Tile elements (or anything else) composed inside the grid.
    */

    interface Props {
        columns?: Columns;
        hero_span?: HeroSpan;
        gap?: string;
        image?: TileImageDisplay;
        image_position?: ImagePosition;
        image_size?: string;
        variant?: TileVariant;
        palette?: TilePalette;
        rounded?: boolean;
        elevation?: TileGridElevation;
        elevation_persist?: boolean;
        aspect_ratio?: TileAspectRatio;
        pattern?: PatternPreset | string;
        pattern_color?: string;
        pattern_opacity?: number;
        pattern_size?: string;
        pattern_effect?: TileGridEffect;
        pattern_effect_opacity?: number;
        pattern_mask?: TileGridMask;
        pattern_mask_direction?: TileGridMaskDirection;
        pattern_mask_size?: number;
        children: Snippet;
    }

    let {
        columns = defaultTileGridConfig.columns,
        hero_span = defaultTileGridConfig.hero_span,
        gap = defaultTileGridConfig.gap,
        image = defaultTileGridConfig.image,
        image_position = defaultTileGridConfig.image_position,
        image_size = undefined,
        variant = defaultTileGridConfig.variant,
        palette = defaultTileGridConfig.palette,
        rounded = defaultTileGridConfig.rounded,
        elevation = defaultTileGridConfig.elevation,
        elevation_persist = defaultTileGridConfig.elevation_persist,
        aspect_ratio = defaultTileGridConfig.aspect_ratio,
        pattern = "none",
        pattern_color = "white",
        pattern_opacity = 0.1,
        pattern_size = undefined,
        pattern_effect = "none",
        pattern_effect_opacity = 1,
        pattern_mask = "none",
        pattern_mask_direction = "bottom",
        pattern_mask_size = 70,
        children,
    }: Props = $props();

    // Helpers -----------------------------------------------------------------

    const pattern_bg = $derived(resolvePatternBackground(pattern, pattern_color));

    /*
        Resolve the CSS mask-image value for the pattern layer.
        "ellipse" → centered radial mask. "fade" → linear gradient along pattern_mask_direction.
    */
    const mask_value = $derived.by(() => {
        if (pattern_mask === "none") return "none";
        if (pattern_mask === "ellipse") {
            return `radial-gradient(ellipse ${pattern_mask_size}% ${pattern_mask_size}% at 50% 50%, black 20%, transparent ${pattern_mask_size}%)`;
        }
        const dir_map: Record<TileGridMaskDirection, string> = {
            top: "to top",
            bottom: "to bottom",
            left: "to left",
            right: "to right",
        };
        return `linear-gradient(${dir_map[pattern_mask_direction]}, black 0%, transparent ${pattern_mask_size}%)`;
    });

    /*
        Inject --tg-columns/--tg-gap (grid layout), --tg-pattern-* (cascades to Tile's
        pattern layer as plain CSS custom properties) and --tg-effect-opacity (section-wide
        decorative layer) as CSS custom properties on the section root.
    */
    const grid_style = $derived(
        [
            `--tg-columns: ${columns}`,
            `--tg-gap: ${gap}`,
            `--tg-pattern-bg: ${pattern_bg}`,
            `--tg-pattern-opacity: ${pattern_opacity}`,
            `--tg-pattern-size: ${pattern_size ?? "auto"}`,
            `--tg-pattern-mask: ${mask_value}`,
            `--tg-effect-opacity: ${pattern_effect_opacity}`,
        ].join("; ")
    );

    // Context -------------------------------------------------------------------

    const ctx: TileGridContext = {
        get image() { return image; },
        get image_position() { return image_position; },
        get image_size() { return image_size; },
        get variant() { return variant; },
        get palette() { return palette; },
        get hero_span() { return hero_span; },
        get rounded() { return rounded; },
        get elevation() { return elevation; },
        get elevation_persist() { return elevation_persist; },
        get aspect_ratio() { return aspect_ratio; },
    };

    setContext(TILEGRID_KEY, ctx);
</script>

<!-- Markup -->

<section class="tile-grid-section" aria-label="Tile grid" style={grid_style}>
    {#if pattern_effect !== "none"}
        <div class="tg-effect tg-effect-{pattern_effect}"></div>
    {/if}

    <div class="tg-grid" data-columns={columns}>
        {@render children()}
    </div>
</section>

<style>
    /* Section wrapper */

    .tile-grid-section {
        position: relative;
        overflow: hidden;
        width: 100%;
        color: var(--spk-text);
    }

    /*
        Grid
        Mobile  (< 640px)  : 1 column, forced
        Tablet  (640-1023) : 2 columns, forced
        Desktop (>= 1024px) : --tg-columns (2, 3, or 4), injected via style=""
    */

    /* Effect layer ---------------------------------------------------- */

    .tg-effect {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: var(--tg-effect-opacity);
        z-index: 0;
    }

    .tg-effect-glow {
        background: radial-gradient(
            ellipse 60% 50% at 50% 40%,
            color-mix(in oklch, var(--spk-accent) 8%, transparent),
            transparent
        );
    }

    .tg-effect-blur {
        backdrop-filter: blur(2px);
    }

    .tg-effect-fade {
        background: linear-gradient(
            to bottom,
            transparent 0%,
            color-mix(in oklch, var(--spk-tone-bg) 80%, transparent) 100%
        );
    }

    .tg-grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--tg-gap, 1.5rem);
        padding: 1rem 0;
    }

    @media (min-width: 640px) {
        .tg-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .tg-grid {
            grid-template-columns: repeat(var(--tg-columns, 3), 1fr);
        }
    }
</style>
