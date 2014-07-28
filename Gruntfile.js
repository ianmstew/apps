module.exports = function (grunt) {

  grunt.initConfig({
    subgrunt: {
      dev: {
        projects: {
          'client': ['build-dev', 'watch'],
          'server': 'develop'
        }
      },
      prod: {
        projects: {
          'client': ['clean', 'build-prod'],  // TODO
          'server': ['clean', 'build']
        }
      },
      clean: {
        projects: {
          'client': 'clean',
          'server': 'clean'
        }
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('develop', ['subgrunt:dev']);
  grunt.registerTask('build-prod', ['subgrunt:prod']);

  grunt.registerTask('default', ['develop']);
};
