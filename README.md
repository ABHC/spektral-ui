# Spektral UI

A Svelte 5 design system.
Customisable, composable and accessible. WCAG-focused and theme driven.

[Documentation](https://spektral.combe.tf/) · [npm](https://www.npmjs.com/package/@abhc/spektral-ui)

## Install

```bash
npm i @abhc/spektral-ui
```

## Quick start

Import the token file once in your app entry point (e.g. `+layout.svelte`):

```ts
import '@abhc/spektral-ui/tokens.css';
```

Then use components anywhere:

```svelte
<script>
  import { Button, Card, Badge } from '@abhc/spektral-ui';
</script>

<Card>
  <Badge palette="success">New</Badge>
  <Button palette="accent">Get started</Button>
</Card>
```

## Components

40+ components across layout, controls, overlays, feedback and content.

### Layout
| Component | Description |
|-----------|-------------|
| `Header` | App header shell |
| `Footer` | App footer shell |
| `Nav` | Navigation bar |
| `Hero` | Full-width section with layout presets, palette, SVG pattern backgrounds and mask effects |
| `TileGrid` | Responsive grid with pattern background support |
| `Explorer` / `ExplorerGroup` / `ExplorerLink` | File-tree style sidebar navigation |

### Controls
| Component | Description |
|-----------|-------------|
| `Button` | Multi-variant button (flat, outlined, ghost, naked) with animation and direction options |
| `Badge` | Inline label with palette, size, elevation and optional trailing action |
| `Input` | Text input |
| `Textarea` | Multiline text input |
| `Select` | Dropdown select built on Popover |
| `CheckboxGroup` | Checkbox list |
| `RadioGroup` | Radio button list |
| `Switch` | Toggle switch |
| `Slider` | Range slider |
| `SearchField` | Search input with clear action |
| `ColorPicker` | OKLCH color picker with hex input |
| `Selector` / `ControlBar` | Segmented control / tab bar |

### Overlays
| Component | Description |
|-----------|-------------|
| `Drawer` | Side panel overlay |
| `Modal` | Dialog overlay |
| `Popover` | Anchored floating panel with direction and alignment options |
| `Tooltip` | Hover tooltip with direction and size variants |
| `Command` | Command palette / search modal |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Toast/notification with semantic variants and viewport positioning |
| `Callout` | Highlighted text block |
| `Progress` | Progress bar |

### Content
| Component | Description |
|-----------|-------------|
| `Card` | Content container with variant, elevation and rounding options |
| `ListItem` | Structured list row |
| `Accordion` / `AccordionHeader` | Collapsible content sections |
| `DataTable` | Sortable data table |
| `CodeBlock` | Syntax-highlighted code with copy, filename, tabs and terminal variants |
| `Avatar` | User avatar with fallback initials |
| `Headline` | Display heading with palette and size variants |
| `Timeline` / `TimelineItem` | Timeline layout |
| `Marquee` | Scrolling content strip |
| `Support` | "Built with Spektral" attribution badge |
| `SwatchRow` | Color swatch display row |

### Branding
| Component | Description |
|-----------|-------------|
| `LogoSpektral` | Spektral UI logo asset |
| `Support` | "Built with Spektral" attribution badge |

## Prop system

All components share a consistent prop vocabulary:

- **`variant`** — visual style: `flat` · `outlined` · `ghost` · `naked`
- **`palette`** — semantic color: `accent` · `tone` · `neutral` · `error` · `warning` · `success` · `info`
- **`size`** — `sm` · `md` · `lg`
- **`elevation`** — shadow level: `none` · `subtle` · `hard`

Not every prop applies to every component — check the [docs](https://spektral.combe.tf/) for per-component APIs.

## Token system

`tokens.css` exposes CSS custom properties for colors (OKLCH palettes), typography, radii and shadows. Light and dark modes are built in and toggled via the `data-theme` attribute or the `ModeToggle` component.

### Customizing tokens

To customize the theme, use the configurator at **https://spektral.combe.tf** to build your custom `tokens.css`. The tool exports a file that matches the package's variable API exactly.

**1. Place your file in `static/`**

Copy the downloaded `tokens.css` into your project's `static/` folder:

```
static/
└── tokens.css   ← your custom file
```

**2. Import the package's `tokens.css` in `app.css`**

```css
/* src/app.css */
@import '@abhc/spektral-ui/tokens.css';
```

This loads the package defaults first, bundled by Vite.

**3. Link your custom file in the root layout**

```svelte
<!-- src/routes/+layout.svelte -->
<svelte:head>
    <link rel="stylesheet" href="/tokens.css" />
</svelte:head>
```

Because `<svelte:head>` links are evaluated after the Vite bundle, your file always loads last — its values override the package defaults through normal CSS cascade.


## Utilities

Two utilities are exported for building custom components that integrate with the variant system:

```ts
import { createVariant } from '@abhc/spektral-ui';
import type { PatternPreset } from '@abhc/spektral-ui';
```

- **`createVariant(config)`** — resolves a set of prop values to a class string using a declarative config object. Used internally by every component.
- **`PatternPreset`** — type for the SVG pattern presets available in `Hero`, `TileGrid` and `Footer`: `scallops` · `grid` · `sunburst` · `lozenge` · `sunrise` · `atoms` · `waves` · `diamonds` · `shippo` · `kumi_kikko`.

Color conversion helpers are also exported for working with the OKLCH color space:

```ts
import { hexToOklch, oklchToHex, hexToRgbChannels } from '@abhc/spektral-ui';
import type { Oklch } from '@abhc/spektral-ui';
```

- **`hexToOklch(hex)`** — converts a hex color string to an `Oklch` object `{ l, c, h }`.
- **`oklchToHex(l, c, h)`** — converts OKLCH channels back to a hex string, with automatic gamut clamping.
- **`hexToRgbChannels(hex)`** — returns the RGB channels as a comma-separated string (e.g. `"255, 128, 0"`), useful for CSS `rgb()` / `rgba()` variables.

All component prop types are also exported from the main entry point, so you never need to reach into `dist/` internals:

```ts
// Data shapes (passed as arrays / objects to components)
import type { CommandItem, CommandGroup } from '@abhc/spektral-ui';
import type { BadgeItem }                 from '@abhc/spektral-ui';
import type { Swatch }                    from '@abhc/spektral-ui';
import type { Tile, TileMedia }           from '@abhc/spektral-ui';
import type { Columns, HeroSpan }         from '@abhc/spektral-ui';

// Prop union types (palette, direction, size…)
import type { Elevation }                                          from '@abhc/spektral-ui';
import type { PopoverPalette, PopoverElevation,
              PopoverDirection, PopoverAlign }                     from '@abhc/spektral-ui';
import type { SearchFieldSize, SearchFieldPalette }                from '@abhc/spektral-ui';
import type { TooltipPalette, TooltipElevation,
              TooltipDirection, TooltipAlign, TooltipSize }        from '@abhc/spektral-ui';
import type { TimelineVariant, TimelinePalette, TimelineSize,
              TimelineElevation, TimelineOrientation,
              TimelineConnectorStyle }                             from '@abhc/spektral-ui';
```

## Requirements

- Svelte `^5.0.0`
- Modern browsers (CSS custom properties, `:has`, `color-mix`)

## Documentation

Full docs, component API, live examples and theming guide: [spektral.combe.tf](https://spektral.combe.tf/)

## License

GPL-3.0 — see [LICENSE](./LICENSE).
