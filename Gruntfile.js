module.exports = function (grunt) {

  grunt.initConfig({
    subgrunt: {
      dev: {
        projects: {
          'client': 'default',
          'server': 'default'
        }
      },
      prod: {
        projects: {
          'client': 'build-prod',  // TODO
          'server': 'build'
        }
      },
      clean: {
        projects: {
          'client': 'clean',
          'server': 'clean'
        }
      },
      watch: {
        projects: {
          'client': 'watch'
        }
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build-dev', ['subgrunt:dev', 'subgrunt:watch']);
  grunt.registerTask('build-prod', ['subgrunt:prod']);
  grunt.registerTask('watch', ['subgrunt:watch']);

  grunt.registerTask('default', ['build-dev']);
};
