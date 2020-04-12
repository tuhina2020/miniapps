module.exports = function(grunt) {
	grunt.initConfig({
		atomizer: {
			pwa: {
				options: {
					configFile: "atomCssConfig.js"
				},
				files: [
					{
						src: ["src/**/*.js"],
						dest: "src/style/main.css"
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
