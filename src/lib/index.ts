// Components -----------------------------------------------------------------

export { default as Accordion }       from './components/Accordion/Accordion.svelte';
export { default as AccordionHeader } from './components/Accordion/AccordionHeader.svelte';
export { default as Alert }           from './components/Alert/Alert.svelte';
export { default as Avatar }          from './components/Avatar/avatar.svelte';
export { default as BackToTop }       from './components/Button/BackToTop.svelte';
export { default as Badge }           from './components/Badge/Badge.svelte';
export { default as BadgeGroup }      from './components/Badge/BadgeGroup.svelte';
export { default as Button }          from './components/Button/Button.svelte';
export { default as Callout }         from './components/Callout/Callout.svelte';
export { default as Card }            from './components/Card/Card.svelte';
export { default as CheckboxGroup }   from './components/Checkbox/CheckboxGroup.svelte';
export { default as CodeBlock }       from './components/CodeBlock/CodeBlock.svelte';
export { default as ColorPicker }     from './components/ColorPicker/ColorPicker.svelte';
export { default as Command }         from './components/Command/Command.svelte';
export { default as ControlBar }      from './components/Selector/ControlBar.svelte';
export { default as CopyButton }      from './components/Button/CopyButton.svelte';
export { default as DataTable }       from './components/DataTable/DataTable.svelte';
export { default as Drawer }          from './components/Drawer/Drawer.svelte';
export { default as Explorer }        from './components/Explorer/Explorer.svelte';
export { default as ExplorerGroup }   from './components/Explorer/ExplorerGroup.svelte';
export { default as ExplorerLink }    from './components/Explorer/ExplorerLink.svelte';
export { default as Footer }          from './components/Footer/Footer.svelte';
export { default as Header }          from './components/Header/Header.svelte';
export { default as Headline }        from './components/Headline/Headline.svelte';
export { default as Hero }            from './components/Hero/Hero.svelte';
export { default as Input }           from './components/Input/Input.svelte';
export { default as ListItem }        from './components/ListItem/ListItem.svelte';
export { default as Marquee }         from './components/Marquee/Marquee.svelte';
export { default as Modal }           from './components/Modal/Modal.svelte';
export { default as ModeToggle }      from './components/Button/ModeToggle.svelte';
export { default as Nav }             from './components/Nav/Nav.svelte';
export { default as Popover }         from './components/Popover/Popover.svelte';
export { default as Progress }        from './components/Progress/Progress.svelte';
export { default as RadioGroup }      from './components/RadioGroup/RadioGroup.svelte';
export { default as SearchField }     from './components/SearchField/SearchField.svelte';
export { default as Select }          from './components/Select/Select.svelte';
export { default as Selector }        from './components/Selector/Selector.svelte';
export { default as Slider }          from './components/Slider/Slider.svelte';
export { default as SwatchRow }       from './components/SwatchRow/SwatchRow.svelte';
export { default as Switch }          from './components/Switch/Switch.svelte';
export { default as Textarea }        from './components/Textarea/Textarea.svelte';
export { default as TileGrid }        from './components/TileGrid/TileGrid.svelte';
export { default as Timeline }        from './components/Timeline/Timeline.svelte';
export { default as TimelineItem }    from './components/Timeline/TimelineItem.svelte';
export { default as Tooltip }         from './components/Tooltip/tooltip.svelte';

// Branding assets
export { default as LogoSpektral }    from './components/Support/LogoSpektral.svelte';
export { default as Support }         from './components/Support/Support.svelte';

// Types ----------------------------------------------------------------------

// Data-shape types (passed as props by consumers)
export { type CommandItem, type CommandGroup }                                from './components/Command/command.config.js';
export { type BadgeItem }                                                     from './components/Badge/badge.config.js';
export { type Swatch }                                                        from './components/SwatchRow/swatchRow.config.js';
export { type Tile, type TileMedia, type Columns, type HeroSpan }            from './components/TileGrid/tilegrid.config.js';

// Prop union types
export { type Elevation }                                                     from './components/Modal/modal.config.js';
export { type PopoverPalette, type PopoverElevation,
         type PopoverDirection, type PopoverAlign }                           from './components/Popover/popover.config.js';
export { type SearchFieldSize, type SearchFieldPalette }                      from './components/SearchField/searchfield.config.js';
export { type TooltipPalette, type TooltipElevation,
         type TooltipDirection, type TooltipAlign, type TooltipSize }         from './components/Tooltip/tooltip.config.js';
export { type TimelineVariant, type TimelinePalette, type TimelineSize,
         type TimelineElevation, type TimelineOrientation,
         type TimelineConnectorStyle }                                        from './components/Timeline/timeline.config.js';

// Utilities ------------------------------------------------------------------

export { createVariant } from './utils/builder.js';
export { type PatternPreset } from './utils/patterns.js';
export { hexToOklch, oklchToHex, hexToRgbChannels, type Oklch } from './utils/colors.js';

