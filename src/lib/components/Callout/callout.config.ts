// Declarative Callout configuration
export const calloutConfig = {
	base: 'callout-base',

	variants: {
		// Semantic colour palette - drives --cb-color, background, and border.
		palette: {
			accent: 'callout-palette-accent',
			neutral: 'callout-palette-neutral',
			error: 'callout-palette-error',
			warning: 'callout-palette-warning',
			success: 'callout-palette-success',
			info: 'callout-palette-info'
		},

		// Vertical alignment of leading / children / trailing.
		align: {
			center: 'callout-align-center',
			start: 'callout-align-start'
		},

		// Border radius.
		rounded: {
			true: 'callout-rounded'
		},

		// Border radius.
		bordered: {
			true: 'callout-bordered'
		}
	}
};
