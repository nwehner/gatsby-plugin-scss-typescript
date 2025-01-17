import { RuleSetUseItem } from 'webpack';

type ObjectRule = Exclude<RuleSetUseItem, string | Function>;

// While `rules` isn't used here, we must have it around for tests
export const onCreateWebpackConfig = ({ stage, plugins, actions, rules }, options) => {
	const { setWebpackConfig } = actions;
	const isProduction = !stage.includes('develop');

	const {
		cssMinifyOptions,
		cssExtractOptions,
		cssLoaderOptions,
		sassLoaderOptions,
		declarationOptions,
	} = options;

	const useCss: ObjectRule[] = rules.css(cssLoaderOptions).use;
	const useCssModules: ObjectRule[] = rules.cssModules(cssLoaderOptions).use;

	const sassLoader: ObjectRule = {
		loader: "sass-loader",
		options: {
			sourceMap: !isProduction,
			...sassLoaderOptions
		},
	};
	const typeLoader: ObjectRule = {
		loader: "dts-css-modules-loader",
		options: {
			...declarationOptions,
			namedExport: true
		}
	};

	const sassLoaders = [ ...useCss, sassLoader ];
	const typeLoaders = [ typeLoader, ...useCssModules, sassLoader ];

	switch (stage) {
		case 'develop':
		case 'build-javascript':
		case 'build-html':
		case 'develop-html': {
			setWebpackConfig({
				module: {
					rules: [
						{
							oneOf: [
								{
									test: /\.module\.s(a|c)ss$/,
									use: typeLoaders,
								},
								{
									test: /\.s(a|c)ss$/,
									use: sassLoaders,
								},
							],
						},
					],
				},
				optimization: {
					minimizer: [plugins.minifyCss(cssMinifyOptions)],
				},
				plugins: [
					plugins.extractText(cssExtractOptions),
					plugins.ignore(/css\.d\.ts$/),
				],
			});
		}
	}
};
