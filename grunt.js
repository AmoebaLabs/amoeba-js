module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      buildDirectory: '.',
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    snockets: {
      core: {
        src: 'src/<%= pkg.name %>.coffee',
        options: {
          concat: {
            destExtension: 'js',
            destDir: '<config:meta.buildDirectory>'
          }
        }
      }
    },
    coffee: {
      specs: {
        src : 'spec/coffeescripts/*.coffee',
        dest: 'spec/javascripts'
      }
    },
    watch: {
      files: ['<config:coffee.specs.src>', '<config:coffee.dist.src>'],
      tasks: 'snockets growl:snockets coffee growl:coffee mocha growl:mocha min copy'
    },
    growl: {
      snockets: {
        title: 'App',
        message: 'Compiled successfully'
      },
      coffee: {
        title: 'Specs',
        message: 'Compiled successfully'
      },
      mocha: {
        title: 'Mocha',
        message: 'Tests passed successfully'
      }
    },
    copy: {
      main: {
        files: [
          { src: ['<%= pkg.name %>.js'], dest: 'vendor/assets/javascripts/' },
          { src: ['<%= pkg.name %>.min.js'], dest: 'vendor/assets/javascripts/' }
        ]
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<%= pkg.name %>.js'],
        dest: '<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-barkeep');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('mocha', 'run mocha-phantomjs', function () {
    var done = this.async();
    require('child_process').exec('mocha-phantomjs ./tests/index.html', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  grunt.registerTask('default', grunt.config('watch.tasks'));
};
