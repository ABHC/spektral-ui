export interface DataTableConfig {
	variant: 'flat' | 'outlined' | 'ghost';
	palette: 'accent' | 'tone' | 'neutral' | 'error' | 'warning' | 'success' | 'info';
	size: 'sm' | 'md' | 'lg';
	elevation: 'none' | 'subtle' | 'hard';
	rounded: boolean;
}

export const defaultDataTableConfig: DataTableConfig = {
	variant: 'flat',
	palette: 'tone',
	size: 'md',
	elevation: 'none',
	rounded: false
};

export const dataTableConfig = {
	base: 'data-table',

	variants: {
		variant: {
			flat: 'data-table-flat',
			outlined: 'data-table-outlined',
			ghost: 'data-table-ghost'
		},
		palette: {
			accent: 'data-table-palette-accent',
			tone: 'data-table-palette-tone',
			neutral: 'data-table-palette-neutral',
			error: 'data-table-palette-error',
			warning: 'data-table-palette-warning',
			success: 'data-table-palette-success',
			info: 'data-table-palette-info'
		},
		size: {
			sm: 'data-table-sm',
			md: 'data-table-md',
			lg: 'data-table-lg'
		},
		elevation: {
			none: 'data-table-elevation-none',
			subtle: 'data-table-elevation-subtle',
			hard: 'data-table-elevation-hard'
		},
		rounded: {
			true: 'data-table-rounded'
		}
	}
};
