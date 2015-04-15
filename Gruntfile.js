module.exports = function (grunt) {

  grunt.initConfig({
    subgrunt: {
      develop: {
        projects: {
          'client': 'develop',
          'server': 'build'
        }
      },
      build: {
        projects: {
          'client': 'build',
          'server': 'build'
        }
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('develop', ['subgrunt:develop']);
  grunt.registerTask('build', ['subgrunt:build']);

  grunt.registerTask('default', ['develop']);
};
