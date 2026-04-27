<script lang="ts">
    import type { Snippet } from 'svelte';
    import { onMount } from 'svelte';
    import { createVariant } from "../../utils/builder.js";
    import { footerConfig } from './footer.config.js';
    import { type PatternPreset, PATTERN_PRESETS, tintPattern } from "../../utils/patterns.js";

    type Palette = "accent" | "tone";

    type Effect = "none" | "glow" | "blur" | "fade";
    type Mask = "none" | "fade" | "ellipse";
    type MaskDirection = "top" | "bottom" | "left" | "right";

    interface Props {
        palette?: Palette;
        rounded?: boolean;
        visible?: boolean;
        padding?: string;
        pattern?: PatternPreset | string;
        pattern_color?: string;
        pattern_opacity?: number;
        pattern_size?: string;
        pattern_effect?: Effect;
        pattern_effect_opacity?: number;
        pattern_mask?: Mask;
        pattern_mask_direction?: MaskDirection;
        pattern_mask_size?: number;
        leading?: Snippet;
        children?: Snippet;
        trailing?: Snippet;
    }

    let {
        palette = "accent",
        rounded = false,
        visible = $bindable(true),
        padding = undefined,
        pattern = "none",
        pattern_color = "white",
        pattern_opacity = 0.4,
        pattern_size = undefined,
        pattern_effect = "none",
        pattern_effect_opacity = 1,
        pattern_mask = "none",
        pattern_mask_direction = "left",
        pattern_mask_size = 70,
        leading,
        children,
        trailing
    }: Props = $props();

    const resolve = createVariant(footerConfig);

    const wrapper_classes = $derived(
        resolve({ palette, rounded }).trim()
    );

    const pattern_bg = $derived.by(() => {
        if (!pattern || pattern === "none") return "none";
        if (pattern in PATTERN_PRESETS) {
            return tintPattern(PATTERN_PRESETS[pattern as Exclude<PatternPreset, "none">], pattern_color);
        }
        return pattern;
    });

    const mask_value = $derived.by(() => {
        if (pattern_mask === "none") return "none";
        if (pattern_mask === "ellipse") {
            return `radial-gradient(ellipse ${pattern_mask_size}% ${pattern_mask_size}% at 50% 50%, black 20%, transparent ${pattern_mask_size}%)`;
        }
        const dir_map: Record<MaskDirection, string> = {
            top: "to top",
            bottom: "to bottom",
            left: "to left",
            right: "to right",
        };
        return `linear-gradient(${dir_map[pattern_mask_direction]}, black 0%, transparent ${pattern_mask_size}%)`;
    });

    const pattern_style = $derived(
        `--footer-pattern-bg: ${pattern_bg};`
        + ` --footer-pattern-opacity: ${pattern_opacity};`
        + ` --footer-pattern-size: ${pattern_size ?? "auto"};`
        + ` --footer-pattern-mask: ${mask_value};`
        + ` --footer-effect-opacity: ${pattern_effect_opacity};`
    );

    const padding_style = $derived(padding ? `--footer-padding: ${padding};` : "");
    const style = $derived([pattern_style, padding_style].filter(Boolean).join(" "));

    let element: HTMLElement | undefined = $state();

    onMount(() => {
        if (!element) return;
        const observer = new IntersectionObserver(
            ([entry]) => { visible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(element);
        return () => observer.disconnect();
    });
</script>

<footer
    class="footer-base {wrapper_classes}"
    {style}
    bind:this={element}
>
    {#if pattern_bg !== "none"}
        <div class="footer-pattern"></div>
    {/if}

    {#if pattern_effect !== "none"}
        <div class="footer-effect footer-effect-{pattern_effect}"></div>
    {/if}

    {#if leading}
        <div class="footer-leading">
            {@render leading()}
        </div>
    {/if}

    {#if children}
        <div class="footer-content">
            {@render children()}
        </div>
    {/if}

    {#if trailing}
        <div class="footer-trailing">
            {@render trailing()}
        </div>
    {/if}
</footer>

<style>
    .footer-base {
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        padding: var(--footer-padding, 10px 3%);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-body);
        margin-top: auto;
        z-index: var(--spk-z-sticky);
    }

    /* Pattern layer -------------------------------------------------------- */

    .footer-pattern {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: var(--footer-pattern-bg);
        background-repeat: repeat;
        background-size: var(--footer-pattern-size);
        opacity: var(--footer-pattern-opacity);
        mask-image: var(--footer-pattern-mask);
        -webkit-mask-image: var(--footer-pattern-mask);
        z-index: var(--spk-z-behind);
    }

    /* Effect layer --------------------------------------------------------- */

    .footer-effect {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: var(--footer-effect-opacity);
        z-index: var(--spk-z-behind);
    }

    .footer-effect-glow {
        background: radial-gradient(
            ellipse 80% 120% at 50% 100%,
            color-mix(in oklch, var(--accent) 12%, transparent),
            transparent
        );
    }

    .footer-effect-blur {
        backdrop-filter: blur(2px);
    }

    .footer-effect-fade {
        background: linear-gradient(
            to bottom,
            transparent 0%,
            color-mix(in oklch, var(--tone-bg) 60%, transparent) 100%
        );
    }

    /* Rounded - top corners only */
    .footer-rounded { border-radius: var(--radius-round) var(--radius-round) 0 0; }

    /* Palette - accent (default: matches layout footer) */
    .footer-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Palette - tone */
    .footer-palette-tone {
        background: var(--tone);
        color: var(--text);
        border-top: 4px solid var(--accent);
    }

    /* Slots layout */
    .footer-leading,
    .footer-trailing {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 0 0 auto;
        min-width: 0;
    }

    .footer-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        flex: 1;
        padding: 0 1rem;
        min-width: 0;
    }
</style>
