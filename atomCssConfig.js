const _merge = require("lodash/merge");
const themeFn = require("./theme");

const theme_en = themeFn("en");

let css_variables = {};
Object.keys(theme_en).forEach(prop => {
	let obj = theme_en[prop];
	let prefix = obj.prefix;
	delete obj.prefix;

	Object.keys(obj).forEach(key => {
		css_variables["$" + prefix + key] = obj[key];
	});
});

let config = {
	cssDest: "./src/style/main.css",
	options: {
		// namespace: '#atomic'
	},
	configs: {
		breakPoints: {
			sm: "@media screen and (min-width: 750px)",
			md: "@media(min-width: 900px)",
			lg: "@media(min-width: 1200px)",
			mdDown: "@media screen and (max-width: 600px)",
			ptr: "@media screen and (orientation:portrait)",
			ldsp: "@media screen and (orientation:landscape)"
		},
		custom: css_variables,
		classNames: [
			"M(0)",
			"P(0)",
			"Fz($fzbody)",
			"Ff($ffprimary)",
			"Fw($fwbody)",
			"Lh($lhbody)"
		]
	}
};

// merging for making up with grunt-atomizer difference
module.exports = _merge(config, config.configs);
