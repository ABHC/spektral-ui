export const listItemConfig = {
	base: 'list-item',

	variants: {
		variant: {
			flat: 'list-item-flat',
			outlined: 'list-item-outlined',
			ghost: 'list-item-ghost',
			ambient: 'list-item-ambient'
		},

		palette: {
			tone: 'list-item-palette-tone',
			accent: 'list-item-palette-accent',
			neutral: 'list-item-palette-neutral',
			error: 'list-item-palette-error',
			warning: 'list-item-palette-warning',
			success: 'list-item-palette-success',
			info: 'list-item-palette-info'
		},

		size: {
			sm: 'list-item-sm',
			md: 'list-item-md',
			lg: 'list-item-lg'
		},

		elevation: {
			none: 'list-item-elevation-none',
			subtle: 'list-item-elevation-subtle',
			hard: 'list-item-elevation-hard'
		},

		rounded: {
			true: 'list-item-rounded'
		},

		active: {
			true: 'list-item-active'
		}
	}
};
