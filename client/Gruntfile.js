module.exports = function (grunt) {
  // Note: inline supression not yet released to npm, but this will work soon.
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

  grunt.initConfig({

    path: {
      // Source folders
      app: 'app',
      test: 'test',
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

    copy: {
      npm_assets: {
        files: [{
          src: 'node_modules/chai/chai.js',
          dest: '<%- path.vendor %>/chai/chai.js'
        }, {
          src: 'node_modules/chai-jquery/chai-jquery.js',
          dest: '<%- path.vendor %>/chai-jquery/chai-jquery.js'
        }, {
          src: 'node_modules/mocha/mocha.js',
          dest: '<%- path.vendor %>/mocha/mocha.js'
        }, {
          src: 'node_modules/mocha/mocha.css',
          dest: '<%- path.vendor %>/mocha/css/mocha.css'
        }, {
          src: 'node_modules/sinon/pkg/sinon.js',
          dest: '<%- path.vendor %>/sinon/sinon.js'
        }, {
          src: 'node_modules/sinon-chai/lib/sinon-chai.js',
          dest: '<%- path.vendor %>/sinon-chai/sinon-chai.js'
        }, {
          src: 'node_modules/chai-as-promised/lib/chai-as-promised.js',
          dest: '<%- path.vendor %>/chai-as-promised/chai-as-promised.js'
        }]
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },

      // sync development resources, jekyll-style (everything except for build-dev-exclude)
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
          '<%- path.assets %>/**/*',
          '<%- path.test %>/**/*'
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

  grunt.registerTask('libs', ['bower', 'copy:npm_assets']);

  grunt.registerTask('build-dev', [
    'clean:build',
    'libs',
    'shell:sync_dev',
    'less',
    'shell:sourcemap_links'
  ]);

  grunt.registerTask('default', ['build-dev']);
};
