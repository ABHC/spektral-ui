// Avatar configuration

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'offline' | 'absent' | 'do-not-disturb';
export type AvatarPalette = 'accent' | 'tone';
export type AvatarShape = 'rounded' | 'circular' | 'square';
export type AvatarElevation = 'none' | 'subtle' | 'hard';

export const avatarConfig = {
	base: 'avatar-base',

	variants: {
		size: {
			xs: 'avatar-xs',
			sm: 'avatar-sm',
			md: 'avatar-md',
			lg: 'avatar-lg',
			xl: 'avatar-xl',
			'2xl': 'avatar-2xl'
		},

		palette: {
			accent: 'avatar-palette-accent',
			tone: 'avatar-palette-tone'
		},

		shape: {
			rounded: 'avatar-rounded',
			circular: 'avatar-circular',
			square: 'avatar-square'
		},

		elevation: {
			subtle: 'avatar-elevation-subtle',
			hard: 'avatar-elevation-hard'
		},

		status: {
			online: 'avatar-online',
			offline: 'avatar-offline',
			absent: 'avatar-absent',
			'do-not-disturb': 'avatar-do-not-disturb'
		}
	}
};
