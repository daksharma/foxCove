module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: [ 'client/**/*' ],
        tasks: [ 'jshint' ],
      },
    },

    // TODO: CONFIGURE ochaTest task
    //
    // TODO: CONFIGURE cssmin task
    //
    // TODO: CONFIGURE shell task

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

  grunt.registerTask('lint', [ 'jshint' ]);

  // grunt.registerTask('test', [ 'mochaTest' ]);

  grunt.registerTask('deploy', [ 'concat', 'uglify', 'cssmin', 'mochaTest', 'shell' ]);

}
