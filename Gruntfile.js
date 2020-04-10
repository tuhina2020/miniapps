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
		htmlmin: {
			pwa: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true
				},
				files: {
					"build/index.html": "build/index.html"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-atomizer");
	// grunt.loadNpmTasks("grunt-contrib-htmlmin");

	grunt.registerTask("default", ["atomizer"]);
};
