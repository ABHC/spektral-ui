<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";

    import {
        TILEGRID_KEY,
        type TileGridContext,
        type TileImageDisplay,
        type ImagePosition,
        type TileVariant,
        type TilePalette,
        type TileGridElevation,
        type TileAspectRatio,
        resolveAspectRatio,
    } from "./tilegrid.config.js";

    import { type PatternPreset, resolvePatternBackground } from "../../utils/patterns.js";

    // Props -------------------------------------------------------------------

    /*
        Props
        name : Tile title. Also doubles as the link's accessible name when href is set -
               the link wraps only the title, not the whole tile (see markup note below).
        abstract : Plain text shown under the title. Clamped to a few lines via CSS, not JS.
        href : Renders the title as a link, with the whole tile visually clickable
               (CSS stretched-link: an invisible layer covers the tile, the real <a> wraps
               the title only - keeps the link's accessible name to just the title text).
        blank : Open href in a new tab (target="_blank" + rel="noopener noreferrer" to prevent
                reverse tabnabbing).
        hero : Marks this tile as featured - takes the grid's hero_span on desktop/tablet.
        src : Background/preview image URL. A tile with no src always renders as a plain
              flat/outlined card, regardless of `image`.
        rounded / elevation / elevation_persist / image / image_position / image_size /
        variant / palette / aspect_ratio :
            Override the matching TileGrid default for this tile only. Leave undefined to
            inherit.
        pattern / pattern_color : Override the grid's decorative pattern for this tile only.
        corner : Snippet rendered in the top-right anchor of the tile. Not rendered if omitted.
        meta : Snippet rendered above the title (e.g. tags/badges). Not rendered if omitted.
    */

    interface Props {
        name: string;
        abstract?: string;
        href?: string;
        blank?: boolean;
        hero?: boolean;
        src?: string;
        rounded?: boolean;
        elevation?: TileGridElevation;
        elevation_persist?: boolean;
        image?: TileImageDisplay;
        image_position?: ImagePosition;
        image_size?: string;
        variant?: TileVariant;
        palette?: TilePalette;
        aspect_ratio?: TileAspectRatio;
        pattern?: PatternPreset | string;
        pattern_color?: string;
        corner?: Snippet;
        meta?: Snippet;
    }

    let {
        name,
        abstract = undefined,
        href = undefined,
        blank = false,
        hero = false,
        src = undefined,
        rounded = undefined,
        elevation = undefined,
        elevation_persist = undefined,
        image = undefined,
        image_position = undefined,
        image_size = undefined,
        variant = undefined,
        palette = undefined,
        aspect_ratio = undefined,
        pattern = undefined,
        pattern_color = undefined,
        corner = undefined,
        meta = undefined,
    }: Props = $props();

    // Context -------------------------------------------------------------------

    const ctx = getContext<TileGridContext>(TILEGRID_KEY);

    const resolved_rounded = $derived(rounded ?? ctx.rounded);
    const resolved_elevation = $derived(elevation ?? ctx.elevation);
    const resolved_elevation_persist = $derived(elevation_persist ?? ctx.elevation_persist);
    const resolved_image = $derived(image ?? ctx.image);
    const resolved_image_position = $derived(image_position ?? ctx.image_position);
    const resolved_image_size = $derived(image_size ?? ctx.image_size);
    const resolved_variant = $derived(variant ?? ctx.variant);
    const resolved_palette = $derived(palette ?? ctx.palette);
    const resolved_aspect_ratio = $derived(aspect_ratio ?? ctx.aspect_ratio);
    const is_auto_aspect = $derived(resolveAspectRatio(resolved_aspect_ratio) === "auto");

    // Helpers -----------------------------------------------------------------

    const use_image = $derived(resolved_image === "background" && !!src);
    const use_preview = $derived(resolved_image === "preview" && !!src);
    const preview_pos_class = $derived(use_preview ? `tile-preview-${resolved_image_position}` : "");

    /*
        Resolve the hero span class from the grid's hero_span context value.
        Empty for non-hero tiles - they never span extra columns.
    */
    const span_class = $derived(
        hero ? (ctx.hero_span === "full" ? "tile-hero-full" : "tile-hero-half") : ""
    );

    const classes = $derived(
        [
            "tile",
            `tile-${resolved_variant}`,
            `tile-palette-${resolved_palette}`,
            use_image ? "tile-image-background" : "",
            use_preview ? "tile-image-preview" : "",
            is_auto_aspect ? "tile-aspect-auto" : "",
            hero ? "tile-hero" : "",
            span_class,
            preview_pos_class,
            resolved_rounded ? "tile-rounded" : "",
            resolved_elevation !== "none" ? `tile-elevation-${resolved_elevation}` : "",
            resolved_elevation_persist ? "tile-elevation-persist" : "",
            href ? "tile-interactive" : "",
        ]
            .filter(Boolean)
            .join(" ")
    );

    /*
        Pattern override: only resolved locally (preset lookup + tint) when this tile sets
        its own `pattern` prop. Otherwise the tile inherits --tg-pattern-bg from TileGrid
        through plain CSS cascade - no need to read it back here.
    */
    const pattern_override = $derived(
        pattern !== undefined ? resolvePatternBackground(pattern, pattern_color ?? "white") : undefined
    );

    const root_style = $derived(
        [
            `--tile-aspect: ${resolveAspectRatio(resolved_aspect_ratio)};`,
            use_image && src ? `--bg-image: url('${src}'); --bg-position: ${resolved_image_position};` : "",
            pattern_override !== undefined ? `--tg-pattern-bg: ${pattern_override};` : "",
        ]
            .filter(Boolean)
            .join(" ")
    );

    const target = $derived(blank ? "_blank" : undefined);
    const rel = $derived(blank ? "noopener noreferrer" : undefined);
</script>

<!-- Markup -->

<!--
    The tile root is not a link. Only the title is a real <a>, stretched visually over the
    whole tile via ::after (position: absolute; inset: 0). This keeps the link's accessible
    name to just the title text instead of a screen reader announcing the whole card
    (title + meta + abstract) as one link, while the whole card still looks and behaves
    clickable.
-->
<article class={classes} style={root_style}>
    {#if corner}
        <span class="tile-corner">
            {@render corner()}
        </span>
    {/if}

    {#if !use_image}
        <div class="tile-pattern"></div>
    {/if}

    {#if use_preview && src}
        <img
            class="tile-preview-img"
            {src}
            alt=""
            aria-hidden="true"
            style={resolved_image_size ? `--tile-preview-size: ${resolved_image_size};` : undefined}
        />
    {/if}

    <div class="tile-layout {use_image || use_preview ? 'tile-overlay' : ''}">
        <div class="tile-content">
            {#if meta}
                <div class="tile-meta">
                    {@render meta()}
                </div>
            {/if}

            <h3 class="tile-name">
                {#if href}
                    <a
                        class="tile-name-link"
                        {href}
                        {target}
                        {rel}
                        data-sveltekit-preload-data="hover"
                    >
                        {name}
                    </a>
                {:else}
                    {name}
                {/if}
            </h3>

            {#if abstract}
                <p class="tile-abstract">{abstract}</p>
            {/if}
        </div>
    </div>
</article>

<style>
    /* Base tile ------------------------------------------------------- */

    .tile {
        display: flex;
        position: relative;
        overflow: hidden;
        color: inherit;
        aspect-ratio: var(--tile-aspect, 4 / 3);
        transition: transform var(--spk-duration-slow) ease, box-shadow var(--spk-duration-slow) ease;
    }

    /*
        aspect-ratio: auto has no height source of its own - background/preview content
        (.tile-overlay, .tile-preview-img) is absolutely positioned and never contributes
        to layout size. In a grid row shared with a ratio'd sibling, CSS Grid's default
        stretch saves it; alone in its row (e.g. a lone hero tile), it collapses to 0.
        This floor keeps it visible either way.
    */
    .tile-aspect-auto {
        min-height: 12rem;
    }

    .tile-interactive {
        cursor: pointer;
    }

    .tile-rounded {
        border-radius: var(--spk-radius-round);
    }

    /* Elevation - hover only (default) -------------------------------- */

    .tile-elevation-subtle:hover {
        box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
    }

    .tile-elevation-hard:hover {
        box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
    }

    /* Elevation - constant (elevation_persist=true) ------------------- */

    .tile-elevation-persist.tile-elevation-subtle {
        box-shadow: var(--spk-elevation-subtle) var(--spk-shadow-subtle);
    }

    .tile-elevation-persist.tile-elevation-hard {
        box-shadow: var(--spk-elevation-hard) var(--spk-shadow-hard);
    }

    /* Hero span --------------------------------------------------------
        Mobile (< 640px)  : no span, hero = 1 column like the others.
        Tablet (640-1023) : 2-col grid, span 2 = full row.
        Desktop (>= 1024px): span 2 over N columns, or 1/-1 for hero-full.
    */

    @media (min-width: 640px) {
        .tile-hero-half {
            grid-column: span 2;
        }

        .tile-hero-full {
            grid-column: 1 / -1;
        }
    }

    /* Corner zone ------------------------------------------------------ */

    .tile-corner {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        z-index: 10;
        pointer-events: none;
    }

    /* Palette - set local custom properties ------------------------------- */

    .tile-palette-accent {
        --tl-bg: var(--spk-accent-bg);
        --tl-border: var(--spk-accent-muted);
        --tl-border-hover: var(--spk-accent-hover);
    }

    .tile-palette-tone {
        --tl-bg: var(--spk-tone);
        --tl-border: var(--spk-tone-hover);
        --tl-border-hover: var(--spk-tone-hover);
    }

    .tile-palette-neutral {
        --tl-bg: var(--spk-neutral-bg);
        --tl-border: var(--spk-neutral-muted);
        --tl-border-hover: var(--spk-neutral-hover);
    }

    .tile-palette-error {
        --tl-bg: var(--spk-error-bg);
        --tl-border: var(--spk-error-muted);
        --tl-border-hover: var(--spk-error-hover);
    }

    .tile-palette-warning {
        --tl-bg: var(--spk-warning-bg);
        --tl-border: var(--spk-warning-muted);
        --tl-border-hover: var(--spk-warning-hover);
    }

    .tile-palette-success {
        --tl-bg: var(--spk-success-bg);
        --tl-border: var(--spk-success-muted);
        --tl-border-hover: var(--spk-success-hover);
    }

    .tile-palette-info {
        --tl-bg: var(--spk-info-bg);
        --tl-border: var(--spk-info-muted);
        --tl-border-hover: var(--spk-info-hover);
    }

    /* Variants -------------------------------------------------------------
        The base card look. Resolved on top of the palette's --tl-* custom
        properties above. The image layer (background/preview, below) is layered
        on top of this - background-color here stays visible as a fallback
        under a preview image, and is simply hidden under a background image.
        Hover feedback is NOT handled here - see "Hover glow" below, the single
        hover mechanism shared by every variant/image combination.
    */

    .tile-flat {
        background-color: var(--tl-bg);
    }

    .tile-outlined {
        background-color: transparent;
        border: var(--spk-border) solid var(--tl-border);
    }

    .tile-outlined:hover {
        border-color: var(--tl-border-hover);
    }

    /* Hover glow -------------------------------------------------------
        A single, subtle hover mechanism shared by flat, outlined, background
        and preview tiles alike: a palette-tinted glow in the top-left corner,
        layered above the pattern/preview image/background image but below the
        text content, so it reads consistently regardless of what's underneath
        instead of each mode swapping its background a different way.
    */

    .tile::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background: radial-gradient(circle at 15% 15%, var(--tl-border-hover) 0%, transparent 65%);
        opacity: 0;
        transition: opacity var(--spk-duration-slow) ease;
    }

    .tile:hover::after {
        opacity: 0.35;
    }


    /* IMAGE DISPLAY: background ------------------------------------------
        Background image fills the tile. The pattern layer is not rendered
        in this mode (see Tile.svelte, `{#if !use_image}`).
    */

    .tile-image-background {
        background-image: var(--bg-image);
        background-size: cover;
        background-position: var(--bg-position, center);
        background-repeat: no-repeat;
    }

    /* IMAGE DISPLAY: preview --------------------------------------------
        Flat/outlined card look + a <img> anchored to a corner/edge via
        position:absolute. The tile's overflow:hidden clips the image at
        the border-radius boundary, creating the "peek-out" effect without
        the image leaving the card.
        image_position controls the CSS class (tile-preview-top-right, etc.).
        image_size passes --tile-preview-size to control the image dimension.
    */

    .tile-preview-img {
        position: absolute;
        object-fit: contain;
        pointer-events: none;
        user-select: none;
        z-index: 1;
    }

    /* Top anchors: width-driven (controls how much of the tile width the image takes) */
    .tile-preview-top-right .tile-preview-img,
    .tile-preview-top-left  .tile-preview-img,
    .tile-preview-top-center .tile-preview-img {
        width: var(--tile-preview-size, 55%);
        height: auto;
    }

    /* Side anchors: height-driven */
    .tile-preview-right .tile-preview-img,
    .tile-preview-left  .tile-preview-img {
        height: var(--tile-preview-size, 90%);
        width:  auto;
    }

    /* Placement per anchor */
    .tile-preview-top-right .tile-preview-img {
        top: 0;
        right: 0;
    }

    .tile-preview-top-left .tile-preview-img {
        top: 0;
        left: 0;
    }

    .tile-preview-top-center .tile-preview-img {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .tile-preview-right .tile-preview-img {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
    .tile-preview-left .tile-preview-img {
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }

    /* Text layout: reserve space on the opposite side from the image */
    .tile-preview-right .tile-layout { padding-right: 42%; }
    .tile-preview-left  .tile-layout { padding-left:  42%; }

    /* Hero sizing ----------------------------------------------------- */

    /*
        Hero tiles deliberately ignore --tile-aspect (the aspect_ratio prop) - a hero's
        box is sized by its 2-column span (width) and, on desktop hero-half, by the
        normal tiles sharing its grid row (height, via CSS Grid's default stretch acting
        on this `auto` ratio). hero-full/tablet get a fixed panoramic ratio instead since
        they're always alone in their row with nothing to stretch to - same for hero-half
        at columns=2 (see below): half of 2 columns is the whole row, so there's never a
        normal-tile sibling there either.
        Desktop (>= 1024px), hero-half, columns >= 3, aspect-ratio auto (stretched to row height)
        Desktop (>= 1024px), hero-half, columns = 2, aspect-ratio 8/3, hero alone in its line
        Desktop (>= 1024px), hero-full, aspect-ratio 8/3, hero alone in its line
        Tablet (640-1023px), aspect-ratio 8/3, hero alone in its line
        Mobile (< 640px), aspect-ratio 4/3, like other tiles
    */

    @media (min-width: 1024px) {
        .tile.tile-hero-half {
            aspect-ratio: auto;
        }

        .tile.tile-hero-full {
            aspect-ratio: 8 / 3;
        }

        /*
            columns=2: half spans the whole row here too (half of 2 = both columns), so
            there's no normal-tile sibling for the auto ratio above to stretch against -
            force the same fixed ratio hero-full already uses instead of guessing at a
            min-height floor.
        */
        :global(.tg-grid[data-columns="2"]) .tile.tile-hero-half {
            aspect-ratio: 8 / 3;
        }
    }

    @media (min-width: 640px) and (max-width: 1023px) {
        .tile.tile-hero {
            aspect-ratio: 8 / 3;
        }
    }

    /*
        columns=1: the grid is a flex column (see TileGrid's .tg-grid-list), so a hero's
        span has no sibling row to line up with at any breakpoint - it's just another
        stacked tile. Reset it back to the normal ratio-driven sizing above. Specificity
        (4 selectors) beats the media-query rules regardless of source order.
    */
    :global(.tg-grid[data-columns="1"]) .tile.tile-hero {
        aspect-ratio: var(--tile-aspect, 4 / 3);
    }

    /* Inside styles of the tile (layout, overlay, content, etc...) --- */
    .tile-layout {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.5rem;
        z-index: 2;
        transition: background var(--spk-duration-slow) ease;
    }

    .tile-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.35) 45%,
            rgba(0, 0, 0, 0.04) 100%
        );
    }

    .tile-meta {
        display: flex;
        gap: 0.45rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .tile-content {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        z-index: 3;
    }

    .tile-name {
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Stretched link: a real <a> around the title only, visually covering the whole
       tile through ::after so the accessible name stays just the title text. */
    .tile-name-link {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }

    .tile-name-link::after {
        content: "";
        position: absolute;
        inset: 0;
    }

    .tile-abstract {
        font-style: italic;
        margin: 0;
        opacity: var(--spk-opacity-overlay);
        line-clamp: 2;
        overflow: hidden;
    }

    .tile-hero .tile-abstract {
        line-clamp: 4;
    }

    .tile-overlay .tile-name,
    .tile-overlay .tile-abstract {
        color: var(--spk-text-light);
    }

    .tile-pattern {
        position: absolute;
        inset: 0;
        pointer-events: none;
        user-select: none;
        z-index: 0;
        background-image: var(--tg-pattern-bg, none);
        background-repeat: repeat;
        background-size: var(--tg-pattern-size, auto);
        opacity: var(--tg-pattern-opacity, 0);
        mask-image: var(--tg-pattern-mask, none);
        -webkit-mask-image: var(--tg-pattern-mask, none);
    }
</style>
