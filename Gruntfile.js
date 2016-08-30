module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // TODO: CONFIGURE mochaTest task
    //
    //

    watch: {
      scripts: {
        files: [ 'client/**/*' ],
        tasks: [ 'jshint' ],
      },
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [ 'client/app/**/*.js', '!*.min.js' ],
        dest: 'client/dist/scripts.min.js',
      },
    },

    cssmin: {
      target: {
        files: {
          'dist/dist.min.css': ['**/*.css', '!client/lib', '!*.min.css' ],
        },
      },
    },

    shell: {
      debug: {
        command: 'node debug server.js',
      },
      deploy: {
        command: [
          'heroku create',
          'heroku config:get SUNLIGHT_API -s  >> .env',
          'heroku config:get MONGO_DB_URI -s  >> .env',
          'heroku config:get POSTGRES_DB_URI -s  >> .env',
          'git push heroku master',
          'heroku ps:scale web=1',
          'heroku open',
        ].join('&&'),
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          },
          cwd: __dirname,
          ignore: ['node_modules/**'],
        }
      },
    },

    jshint: {
      files: [
        // LINT js files in following directories:
        'client/app/**/*.js',
        'server/**/*.js',
        'server.js'
      ],
      options: {
        force: 'true',
        ignores: [
          // IGNORE js files in following directories:
          'client/lib/**/*.js',
          'client/vendor/**/*.js',
          'server/secret/**/*.js'
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');

  // Run nodejs in a different process and display output on the main console
  grunt.registerTask('server-dev', function (target) {
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // TODO: add production server tasks
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('default', [ 'jshint', 'nodemon' ]);

  grunt.registerTask('debug', 'Type "next" to continue to the next line and ".exit" to quit', function(){
    grunt.task.run([ 'shell:debug' ])
  });

  grunt.registerTask('lint', [ 'jshint' ]);

  // grunt.registerTask('test', [ 'mochaTest' ]);

  grunt.registerTask('deploy', [ 'shell:deploy' ]);

}
