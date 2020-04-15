module.exports = function(grunt) {
	const basePath = grunt.option('basePath');
	grunt.log.writeln(basePath);
	if (!basePath) {
		grunt.log.error("Please specify A Base Directory");
		return
	}
	grunt.initConfig({
		atomizer: {
			pwa: {
				options: {
					configFile: "atomCssConfig.js"
				},
				files: [
					{
						src: [`src/${basePath}/*.js`],
						dest: "src/styles/main.css"
					}
				]
			}
		},
		// htmlmin: {
		// 	pwa: {
		// 		options: {
		// 			removeComments: true,
		// 			collapseWhitespace: true,
		// 			minifyCSS: true,
		// 			minifyJS: true
		// 		},
		// 		files: {
		// 			"dist/index.html": "dist/index.html"
		// 		}
		// 	}
		// }
	});

	grunt.loadNpmTasks("grunt-atomizer");
	// grunt.loadNpmTasks("grunt-contrib-htmlmin");

	grunt.registerTask("default", ["atomizer"]);
};
