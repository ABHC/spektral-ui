// TileGrid / Tile configuration

/*
    Controls image placement.
    - In "image" mode: CSS background-position value ("center", "top", etc.)
    - In "mockup" mode: anchor corner/edge for the floating image element.
      "top-right" | "top-left" | "top-center" | "right" | "left"
    Accepts any string so callers can pass arbitrary CSS bg-position values.
*/
export type ImagePosition =
	'center' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'top-center' | 'right' | 'left' | string;

/*
    How a tile displays its `src` image, layered on top of its variant/palette card:
    - "background" : the image fills the tile as a background (DesignGallery style).
    - "preview" : the card keeps its flat/outlined look, with the image floating
      as a decorative element anchored to a corner/edge (AppsGallery mockup style).
    A tile with no `src` always renders as a plain flat/outlined card regardless
    of this value.
*/
export type TileImageDisplay = 'background' | 'preview';

/*
    Base card look, shared vocabulary with Accordion/Timeline.
    "flat" : filled background using the resolved palette token.
    "outlined" : transparent background, border using the resolved palette token.
*/
export type TileVariant = 'flat' | 'outlined';

/*
    Semantic palette resolved to the matching --spk-* tokens for background/border/hover.
*/
export type TilePalette = 'accent' | 'tone' | 'neutral' | 'error' | 'warning' | 'success' | 'info';

/*
    Number of grid columns on desktop (>= 1024px).
    Tablet always uses 2 columns. Mobile always uses 1 column.
    1 is a special case: the grid switches to a single flex column at every
    breakpoint instead (a plain stacked list) - tablet/mobile forcing no longer
    applies since there's nothing left to force. Hero tiles lose their span
    (half/full have no meaning in a single column) and render like normal tiles.
*/
export type Columns = 1 | 2 | 3 | 4 | 5 | 6;

/*
    How a hero tile spans on desktop.
    "half" → span 2 columns (⅔ of a 3-col grid, full row on a 2-col grid)
    "full" → span all columns (full row regardless of column count)
*/
export type HeroSpan = 'half' | 'full';

/*
    Elevation level applied to a tile.
    "none" → no shadow
    "subtle" → light shadow
    "hard" → strong shadow
*/
export type TileGridElevation = 'none' | 'subtle' | 'hard';

/*
    Visual effect overlaying the whole grid (decorative layer behind the tiles).
*/
export type TileGridEffect = 'none' | 'glow' | 'blur' | 'fade';

/*
    Aspect ratio applied to a *normal* tile.
    "square" → 1/1, "portrait" → 3/4, "video" → 16/9, "wide" → 21/9.
    "auto" → no ratio constraint, height follows content (like Card). Tile.svelte floors
    this at a min-height, since background/preview content is absolutely positioned and
    has no intrinsic height of its own to fall back on.
    Any other string is passed through as a raw CSS aspect-ratio value (e.g. "4/3").
    Hero tiles deliberately ignore this: a hero keeps a fixed per-breakpoint ratio
    (auto on desktop hero-half with columns >= 3 - stretched by CSS Grid to match the
    row height set by its normal-tile neighbours, 8/3 elsewhere) regardless of what's
    set here - see the `.tile-hero-*` rules in Tile.svelte. A hero's box is sized by
    its 2-column span (width) and by the normal tiles sharing its row (height), not by
    its own ratio. Two exceptions, both because a hero then has no normal-tile sibling
    to size against: at columns=1 a hero has no span left to matter at all, so it falls
    back to being sized like a normal tile (this ratio applies again); at columns=2,
    half spans the whole row just like full does, so it takes full's fixed 8/3 ratio.
*/
export type TileAspectRatio = 'square' | 'portrait' | 'video' | 'wide' | 'auto' | string;

const ASPECT_RATIO_PRESETS = {
	square: '1 / 1',
	portrait: '3 / 4',
	video: '16 / 9',
	wide: '21 / 9'
} as const;

/*
    Resolve a TileAspectRatio (preset name or raw CSS aspect-ratio value) into the final
    CSS value. Shared by TileGrid (grid-wide default) and Tile (per-tile override).
*/
export function resolveAspectRatio(aspect_ratio: TileAspectRatio): string {
	if (aspect_ratio === 'auto') return 'auto';
	if (aspect_ratio in ASPECT_RATIO_PRESETS) {
		return ASPECT_RATIO_PRESETS[aspect_ratio as keyof typeof ASPECT_RATIO_PRESETS];
	}
	return aspect_ratio;
}

/*
    Mask shape applied to the pattern layer.
    "ellipse" → centered radial mask
    "fade"    → linear gradient mask along `pattern_mask_direction`
*/
export type TileGridMask = 'none' | 'ellipse' | 'fade';

/*
    Direction of the linear mask gradient when `pattern_mask` is "fade".
*/
export type TileGridMaskDirection = 'top' | 'bottom' | 'left' | 'right';

// Context ----------------------------------------------------------------------

/*
    TileGrid sets this context; Tile reads it as its fallback default and can
    override each value locally through its own matching prop.

    Pattern-related values (background, opacity, size, mask) are *not* part of
    this context - they cascade as plain CSS custom properties from
    `.tile-grid-section` instead, since they're pure style values with no
    markup/class branching involved. A Tile overrides them by setting the same
    custom property locally. Only values that affect which class/markup branch
    a Tile renders go through context.
*/

export const TILEGRID_KEY = Symbol('tilegrid');

export interface TileGridContext {
	readonly image: TileImageDisplay;
	readonly image_position: ImagePosition;
	readonly image_size: string | undefined;
	readonly variant: TileVariant;
	readonly palette: TilePalette;
	readonly hero_span: HeroSpan;
	readonly rounded: boolean;
	readonly elevation: TileGridElevation;
	readonly elevation_persist: boolean;
	readonly aspect_ratio: TileAspectRatio;
}

// Config interface ---------------------------------------------------------

/*
    image : Default image display mode ("background" | "preview"), inherited by every Tile
        unless it overrides it. Only takes effect on tiles that have a `src`.
    image_position : Default CSS background-position, inherited by every Tile
    variant : Default card look ("flat" | "outlined"), inherited by every Tile
    palette : Default semantic palette, inherited by every Tile
    columns : Number of columns on the desktop breakpoint
    hero_span : How hero tiles span on desktop
    gap : Gap between tiles - any valid CSS length value
    rounded : Default --spk-radius-round on every tile
    elevation : Default tile elevation level
    elevation_persist : When true, elevation shadow is shown permanently. When false, only on hover.
    aspect_ratio : Default aspect ratio for normal tiles, inherited by every Tile unless it
        overrides it. Ignored by hero tiles - see TileAspectRatio above.
*/

export interface TileGridConfig {
	image: TileImageDisplay;
	image_position: ImagePosition;
	variant: TileVariant;
	palette: TilePalette;
	columns: Columns;
	hero_span: HeroSpan;
	gap: string;
	rounded: boolean;
	elevation: TileGridElevation;
	elevation_persist: boolean;
	aspect_ratio: TileAspectRatio;
}

// Defaults

export const defaultTileGridConfig: TileGridConfig = {
	image: 'background',
	image_position: 'center',
	variant: 'flat',
	palette: 'tone',
	columns: 3,
	hero_span: 'half',
	gap: '1.5rem',
	rounded: false,
	elevation: 'none',
	elevation_persist: false,
	aspect_ratio: '4/3'
};
