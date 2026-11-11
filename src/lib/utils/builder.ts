interface VariantConfig {
	base?: string;
	variants?: Record<string, Record<string, string>>;
}

// Generic variant resolver
export function createVariant(config: VariantConfig) {
	return function resolve(props: Record<string, string | boolean | undefined>) {
		const classes: string[] = [];

		if (config.base) {
			classes.push(config.base);
		}

		for (const key in config.variants) {
			const value = props[key];
			const mapping = config.variants[key];

			if (value && mapping[String(value)]) {
				classes.push(mapping[String(value)]);
			}
		}

		return classes.join(' ');
	};
}
