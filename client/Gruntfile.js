module.exports = function (grunt) {
  /* jshint camelcase:false */

  grunt.initConfig({

    path: {
      // Source folders
      app: 'app',
      assets: 'assets',
      style: 'style',

      // Intermediate folders (transient)
      temp: 'temp',
      bower: 'bower_components',
      vendor: 'vendor',

      // Output folders (transient)
      build: 'build',
      build_style: 'build/style'
    },

    clean: {
      all: [
        '<%- path.build %>',
        '<%- path.temp %>',
        '<%- path.vendor %>',
        '<%- path.bower %>'
      ],
      build: [
        '<%- path.build %>'
      ]
    },

    less: {
      options: {
        paths: [
          '<%- path.vendor %>',
          '<%- path.temp %>'
        ]
      },

      precompile: {
        files: {
          '<%- path.temp %>/engine-ui-grid-precompile.less': '<%- path.style %>/engine-ui-grid.less'
        }
      },

      app: {
        options: {
          sourceMap: true,
          sourceMapFilename: '<%- path.build_style %>/app.css.map',
          sourceMapBasepath: '<%- path.build_style %>'
        },
        files: {
          '<%- path.build_style %>/app.css': '<%- path.style %>/app.less'
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: '<%- path.vendor %>',
          layout: 'byComponent',
          bowerOptions: {
            production: true
          }
        }
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },

      // sync client/app, client/vendor, and client/index.html
      sync_dev: {
        command: [
          'PROJ_ROOT=$(pwd)',
          'rsync . $PROJ_ROOT/<%- path.build %> ' +
              '--update --delete --recursive --exclude-from $PROJ_ROOT/.build-dev-exclude'
        ].join('&&')
      },

      // build links to support relative paths found in sourcemaps
      sourcemap_links: {
        command: [
          'PROJ_ROOT=$(pwd)',
          'mkdir -p <%- path.build_style %>',
          'cd <%- path.build_style %>',
          'rm -f <%- path.app %>',
          'ln -s $PROJ_ROOT/<%- path.app %> <%- path.app %>',
          'rm -f <%- path.build %>',
          'ln -s $PROJ_ROOT/<%- path.build %> <%- path.build %>'
        ].join('&&')
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },

      app: ['Gruntfile.js', '<%- path.app %>/**/*.js']
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },

      app: ['Gruntfile.js', '<%- path.app %>/**/*.js']
    },

    watch: {
      options: {
        spawn: false
      },

      app: {
        files: [
          'index.html',
          '<%- path.app %>/**/*',
          '<%- path.assets %>/**/*'
        ],
        tasks: ['shell:sync_dev']
      },

      style: {
        files: [
          '<%- path.style %>/**/*',
          '<%- path.vendor %>/engine-ui/less/**/*'
        ],
        tasks: ['less:app']
      },

      // Start livereload server at http://localhost:35729/livereload.js
      livereload: {
        options: {
          cwd: '<%- path.build %>',
          livereload: true
        },

        files: [
          '*.html',
          'views/*.html',
          'app/**/*.html',
          'style/*.css'
        ]
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build-dev', [
    'clean:build',
    'bower',
    'shell:sync_dev',
    'less',
    'shell:sourcemap_links'
  ]);

  grunt.registerTask('default', ['build-dev', 'watch']);
};
