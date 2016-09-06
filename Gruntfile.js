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

    env: {
      dev: {
        src: [ '.env' ],
      }
    },

    // .env variables cannot be loaded here because they are undefined on init
    shell: {
      debug: {
        command: 'node debug server.js',
      },
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
        'server.js',
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
  grunt.loadNpmTasks('grunt-env');

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

  // LOAD .env variables and MERGE into shell config
  grunt.registerTask('loadconst', 'Load constants', function() {
    grunt.config('SUNLIGHT_API', process.env.SUNLIGHT_API);
    grunt.config('MONGO_DB_URI', process.env.MONGO_DB_URI);
    grunt.config('POSTGRES_DB_URI', process.env.POSTGRES_DB_URI);
    grunt.config('GUARDIAN_API', process.env.GUARDIAN_API);
    grunt.config('OPENSECRETS_API', process.env.OPENSECRETS_API);
    grunt.config('PROPUBLICA_API', process.env.PROPUBLICA_API);
    grunt.config('GOOGLE_API', process.env.GOOGLE_API);
    grunt.config('TAX_API', process.env.TAX_API);
    grunt.config('MAPBOX_API', process.env.MAPBOX_API);
    grunt.config('MAPBOX_PUBLIC', process.env.MAPBOX_PUBLIC);
    grunt.config('BING_NEWS_API', process.env.BING_NEWS_API);
    grunt.config.merge({
      shell: {
        develop: {
          command: [
            'heroku create',
            'heroku local',
            'heroku config:set SUNLIGHT_API=' + grunt.config.get(['SUNLIGHT_API']),
            'heroku config:set MONGO_DB_URI=' + grunt.config.get(['MONGO_DB_URI']),
            'heroku config:set POSTGRES_DB_URI=' + grunt.config.get(['POSTGRES_DB_URI']),
            'heroku config:set GUARDIAN_API=' + grunt.config.get(['GUARDIAN_API']),
            'heroku config:set OPENSECRETS_API=' + grunt.config.get(['OPENSECRETS_API']),
            'heroku config:set PROPUBLICA_API=' + grunt.config.get(['PROPUBLICA_API']),
            'heroku config:set GOOGLE_API=' + grunt.config.get(['GOOGLE_API']),
            'heroku config:set TAX_API=' + grunt.config.get(['TAX_API']),
            'heroku config:set MAPBOX_API=' + grunt.config.get(['MAPBOX_API']),
            'heroku config:set MAPBOX_PUBLIC=' + grunt.config.get(['MAPBOX_PUBLIC']),
            'heroku config:set BING_NEWS_API=' + grunt.config.get(['BING_NEWS_API']),
            'echo The following ENVIRONMENT variables have assigned to heroku config',
            'heroku config',
            'git push -f heroku develop:master',
            'heroku ps:scale web=1',
            'heroku open',
          ].join('&&'),
        },
        stable: {
          command: [
            'heroku create foxcove',
            'heroku local',
            'heroku config:set SUNLIGHT_API=' + grunt.config.get(['SUNLIGHT_API']),
            'heroku config:set MONGO_DB_URI=' + grunt.config.get(['MONGO_DB_URI']),
            'heroku config:set POSTGRES_DB_URI=' + grunt.config.get(['POSTGRES_DB_URI']),
            'heroku config:set GUARDIAN_API=' + grunt.config.get(['GUARDIAN_API']),
            'heroku config:set OPENSECRETS_API=' + grunt.config.get(['OPENSECRETS_API']),
            'heroku config:set PROPUBLICA_API=' + grunt.config.get(['PROPUBLICA_API']),
            'heroku config:set GOOGLE_API=' + grunt.config.get(['GOOGLE_API']),
            'heroku config:set TAX_API=' + grunt.config.get(['TAX_API']),
            'heroku config:set MAPBOX_API=' + grunt.config.get(['MAPBOX_API']),
            'heroku config:set MAPBOX_PUBLIC=' + grunt.config.get(['MAPBOX_PUBLIC']),
            'heroku config:set BING_NEWS_API=' + grunt.config.get(['BING_NEWS_API']),
            'echo The following ENVIRONMENT variables have assigned to heroku config',
            'heroku config',
            'git push -f heroku master',
            'heroku ps:scale web=1',
            'heroku open',
          ].join('&&'),
        },
      },
    })
  });

  grunt.registerTask('test', '', function(){
    grunt.task.run([ 'env:dev' ]);
    grunt.task.run([ 'loadconst' ]);
  });

  grunt.registerTask('lint', [ 'jshint' ]);

  grunt.registerTask('deploy:stable', [ 'env:dev', 'loadconst', 'shell:stable' ]);

  grunt.registerTask('deploy:develop', [ 'env:dev', 'loadconst', 'shell:develop' ]);

}
