// Hero configuration --------------------------------------------------------

/*
    Flex arrangement of cell_1..cell_4 inside .hero-content.
    "single"      : cell_1 only, column.
    "two-cols"    : cell_1 | cell_2, row.
    "two-rows"    : cell_1 / cell_2, column.
    "main-left"   : cell_1 (2/3) | stack(cell_2, cell_3).
    "main-right"  : stack(cell_1, cell_2) | cell_3 (2/3).
    "grid-2x2"    : cell_1..cell_4, 2x2 wrap.
*/
export type Layout = 'single' | 'two-cols' | 'two-rows' | 'main-left' | 'main-right' | 'grid-2x2';

/*
    Semantic colour palette - drives background/text on the root section.
    "transparent" : --spk-tone-bg background (default).
    "tone"        : --spk-tone background.
    "accent"      : --spk-accent background, --spk-text-accent text.
    "accentbg"    : --spk-accent-bg background, --spk-text text.
*/
export type Palette = 'transparent' | 'tone' | 'accent' | 'accentbg';

/*
    Decorative layer rendered above the pattern, below the content.
    "none" : no layer.
    "glow" : radial accent glow.
    "blur" : backdrop-filter blur.
    "fade" : bottom gradient fade to --spk-tone-bg.
*/
export type Effect = 'none' | 'glow' | 'blur' | 'fade';

/*
    Mask shape applied to the pattern layer.
    "none"    : no mask, pattern fully opaque (within pattern_opacity).
    "ellipse" : centered radial mask.
    "fade"    : linear gradient mask along pattern_mask_direction.
*/
export type Mask = 'none' | 'ellipse' | 'fade';

/*
    Direction of the linear mask gradient when pattern_mask is "fade".
*/
export type MaskDirection = 'top' | 'bottom' | 'left' | 'right';

// Config interface -----------------------------------------------------------

/*
    layout : Cell arrangement - see Layout above.
    palette : Root background/text - see Palette above.
    pattern / pattern_color / pattern_opacity / pattern_size :
        Decorative background pattern - preset name (see utils/patterns.ts) or raw CSS value.
    pattern_effect / pattern_effect_opacity : Decorative layer above the pattern - see Effect above.
    pattern_mask / pattern_mask_direction / pattern_mask_size : Mask applied to the pattern layer.
    height : CSS min-height of the hero (and its content), collapses to auto below 640px.
    gap : Gap between cells - any valid CSS length.
    collapsed_reverse : Below 640px, flips cell order (column-reverse instead of column).
*/
export interface HeroConfig {
	layout: Layout;
	palette: Palette;
	pattern_color: string;
	pattern_opacity: number;
	pattern_effect: Effect;
	pattern_effect_opacity: number;
	pattern_mask: Mask;
	pattern_mask_direction: MaskDirection;
	pattern_mask_size: number;
	height: string;
	gap: string;
	collapsed_reverse: boolean;
}

// Defaults

export const defaultHeroConfig: HeroConfig = {
	layout: 'single',
	palette: 'transparent',
	pattern_color: 'white',
	pattern_opacity: 0.6,
	pattern_effect: 'none',
	pattern_effect_opacity: 1,
	pattern_mask: 'none',
	pattern_mask_direction: 'bottom',
	pattern_mask_size: 70,
	height: '85dvh',
	gap: '0',
	collapsed_reverse: false
};
