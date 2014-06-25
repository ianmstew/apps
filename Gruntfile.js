var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    path: {
      // Source folders
      app: 'client/app',
      assets: 'client/assets',
      style: 'client/style',

      // Intermediate folders (transient)
      temp: 'temp',
      bower: 'bower_components',
      vendor: 'client/vendor',

      // Output folders (transient)
      build: 'client-build',
      build_style: 'client-build/style'
    },
    copy: {
      vendor: {
        files: [
          {
            expand: true, cwd: 'bower_components/bootstrap/',
            src: ['js/**', 'less/**'], dest: 'public/vendor/bootstrap/'
          },
          {
            expand: true, cwd: 'bower_components/backbone/',
            src: ['backbone.js'], dest: 'public/vendor/backbone/'
          },
          {
            expand: true, cwd: 'bower_components/font-awesome/',
            src: ['fonts/**', 'less/**'], dest: 'public/vendor/font-awesome/'
          },
          {
            expand: true, cwd: 'bower_components/html5shiv/dist/',
            src: ['html5shiv.js'], dest: 'public/vendor/html5shiv/'
          },
          {
            expand: true, cwd: 'bower_components/jquery/dist/',
            src: ['jquery.js'], dest: 'public/vendor/jquery/'
          },
          {
            expand: true, cwd: 'bower_components/momentjs/',
            src: ['moment.js'], dest: 'public/vendor/momentjs/'
          },
          {
            expand: true, cwd: 'bower_components/respond/src/',
            src: ['respond.js'], dest: 'public/vendor/respond/'
          },
          {
            expand: true, cwd: 'bower_components/underscore/',
            src: ['underscore.js'], dest: 'public/vendor/underscore/'
          }
        ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: [
            'node_modules/**',
            'public/**'
          ],
          ext: 'js'
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      clientJS: {
         files: [
          'public/layouts/**/*.js', '!public/layouts/**/*.min.js',
          'public/views/**/*.js', '!public/views/**/*.min.js'
         ],
         tasks: ['newer:uglify', 'newer:jshint:client']
      },
      serverJS: {
         files: ['views/**/*.js'],
         tasks: ['newer:jshint:server']
      },
      clientLess: {
         files: [
          'public/layouts/**/*.less',
          'public/views/**/*.less',
          'public/less/**/*.less'
         ],
         tasks: ['newer:less']
      },
      app: {
        files: [
          '<%- path.client %>/index.html',
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
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(filePath) {
          return filePath + '.map';
        }
      },
      layouts: {
        files: {
          'public/layouts/core.min.js': [
            'public/vendor/jquery/jquery.js',
            'public/vendor/underscore/underscore.js',
            'public/vendor/backbone/backbone.js',
            'public/vendor/bootstrap/js/affix.js',
            'public/vendor/bootstrap/js/alert.js',
            'public/vendor/bootstrap/js/button.js',
            'public/vendor/bootstrap/js/carousel.js',
            'public/vendor/bootstrap/js/collapse.js',
            'public/vendor/bootstrap/js/dropdown.js',
            'public/vendor/bootstrap/js/modal.js',
            'public/vendor/bootstrap/js/tooltip.js',
            'public/vendor/bootstrap/js/popover.js',
            'public/vendor/bootstrap/js/scrollspy.js',
            'public/vendor/bootstrap/js/tab.js',
            'public/vendor/bootstrap/js/transition.js',
            'public/vendor/momentjs/moment.js',
            'public/layouts/core.js'
          ],
          'public/layouts/ie-sucks.min.js': [
            'public/vendor/html5shiv/html5shiv.js',
            'public/vendor/respond/respond.js',
            'public/layouts/ie-sucks.js'
          ],
          'public/layouts/admin.min.js': ['public/layouts/admin.js']
        }
      },
      views: {
        files: [{
          expand: true,
          cwd: 'public/views/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'public/views/',
          ext: '.min.js'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      client: {
        options: {
          jshintrc: '.jshintrc-client',
          ignores: [
            'public/layouts/**/*.min.js',
            'public/views/**/*.min.js'
          ]
        },
        src: [
          'public/layouts/**/*.js',
          'public/views/**/*.js'
        ]
      },
      server: {
        options: {
          jshintrc: '.jshintrc-server'
        },
        src: [
          'schema/**/*.js',
          'views/**/*.js'
        ]
      },
      app: ['Gruntfile.js', '<%- path.app %>/**/*.js']
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      app: ['Gruntfile.js', '<%- path.app %>/**/*.js']
    },
    less: {
      options: {
        compress: true,
        paths: [
          '<%- path.vendor %>',
          '<%- path.temp %>'
        ]
      },
      layouts: {
        files: {
          'public/layouts/core.min.css': [
            'public/less/bootstrap-build.less',
            'public/less/font-awesome-build.less',
            'public/layouts/core.less'
          ],
          'public/layouts/admin.min.css': ['public/layouts/admin.less']
        }
      },
      views: {
        files: [{
          expand: true,
          cwd: 'public/views/',
          src: ['**/*.less'],
          dest: 'public/views/',
          ext: '.min.css'
        }]
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
    clean: {
      all: [
        '<%- path.build %>',
        '<%- path.temp %>',
        '<%- path.vendor %>',
        '<%- path.bower %>'
      ],
      build: [
        '<%- path.build %>'
      ],
      js: {
        src: [
          'public/layouts/**/*.min.js',
          'public/layouts/**/*.min.js.map',
          'public/views/**/*.min.js',
          'public/views/**/*.min.js.map'
        ]
      },
      css: {
        src: [
          'public/layouts/**/*.min.css',
          'public/views/**/*.min.css'
        ]
      },
      vendor: {
        src: ['public/vendor/**']
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
          'cd client',
          'rsync . $PROJ_ROOT/<%- path.build %> ' +
              '--update --delete --recursive --exclude style'
        ].join('&&')
      },

      // build links to support relative paths found in sourcemaps
      sourcemap_links: {
        command: [
          'PROJ_ROOT=$(pwd)',
          'mkdir -p <%- path.build_style %>',
          'cd <%- path.build_style %>',
          'rm -f app',
          'ln -s $PROJ_ROOT/<%- path.app %> app',
          'rm -f client-build',
          'ln -s $PROJ_ROOT/<%- path.build %> client-build'
        ].join('&&')
      }
    }


  });

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('build-dev', [
    'clean:build',
    'bower',
    'shell:sync_dev',
    'less',
    'shell:sourcemap_links'
  ]);
  grunt.registerTask('default', ['copy:vendor', 'newer:uglify', 'newer:less', 'concurrent', 'build-dev']);
  grunt.registerTask('build', ['copy:vendor', 'uglify', 'less']);
  grunt.registerTask('lint', ['jshint']);
};
