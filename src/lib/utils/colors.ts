export interface Oklch {
	l: number; // Perceptual lightness, 0–1
	c: number; // Chroma, 0–~0.4
	h: number; // Hue angle, 0–360
}

export function parseRgbComponents(color: string): [number, number, number] | null {
	const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
	if (hex) return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
	const rgba = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(color);
	if (rgba) return [parseInt(rgba[1]), parseInt(rgba[2]), parseInt(rgba[3])];
	return null;
}

function toLinear(c: number): number {
	const n = c / 255;
	return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

function fromLinear(c: number): number {
	if (c <= 0.0031308) return c * 12.92;
	return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function hexToOklch(color: string): Oklch | null {
	const rgb = parseRgbComponents(color);
	if (!rgb) return null;

	const r = toLinear(rgb[0]);
	const g = toLinear(rgb[1]);
	const b = toLinear(rgb[2]);

	const lms_l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const lms_m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const lms_s = 0.0883024619 * r + 0.2024326609 * g + 0.6892650165 * b;

	const l_ = Math.cbrt(lms_l);
	const m_ = Math.cbrt(lms_m);
	const s_ = Math.cbrt(lms_s);

	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const bOk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

	const C = Math.sqrt(a * a + bOk * bOk);
	let H = (Math.atan2(bOk, a) * 180) / Math.PI;
	if (H < 0) H += 360;

	return { l: L, c: C, h: H };
}

function oklchToLinearRgb(L: number, C: number, H: number): [number, number, number] {
	const a = C * Math.cos((H * Math.PI) / 180);
	const b = C * Math.sin((H * Math.PI) / 180);

	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	return [
		+4.0767416621 * l_ ** 3 - 3.3077115913 * m_ ** 3 + 0.2309699292 * s_ ** 3,
		-1.2684380046 * l_ ** 3 + 2.6097574011 * m_ ** 3 - 0.3413193965 * s_ ** 3,
		-0.0041960863 * l_ ** 3 - 0.7034186147 * m_ ** 3 + 1.707614701 * s_ ** 3
	];
}

function isInSrgbGamut(r: number, g: number, b: number): boolean {
	const EPS = -0.001;
	return r >= EPS && r <= 1.001 && g >= EPS && g <= 1.001 && b >= EPS && b <= 1.001;
}

export function oklchToHex(L: number, C: number, H: number): string {
	let rgb = oklchToLinearRgb(L, C, H);

	if (!isInSrgbGamut(rgb[0], rgb[1], rgb[2])) {
		let lo = 0,
			hi = C;
		for (let i = 0; i < 24; i++) {
			const mid = (lo + hi) / 2;
			rgb = oklchToLinearRgb(L, mid, H);
			if (isInSrgbGamut(rgb[0], rgb[1], rgb[2])) lo = mid;
			else hi = mid;
		}
		rgb = oklchToLinearRgb(L, lo, H);
	}

	const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
	const ch = (v: number) =>
		Math.round(clamp01(fromLinear(clamp01(v))) * 255)
			.toString(16)
			.padStart(2, '0');

	return `#${ch(rgb[0])}${ch(rgb[1])}${ch(rgb[2])}`;
}

export function hexToRgbChannels(color: string): string | null {
	const rgb = parseRgbComponents(color);
	if (!rgb) return null;
	return rgb.join(', ');
}
