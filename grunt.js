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
        src : 'spec/coffeescripts/**/*_spec.coffee',
        dest: 'spec/javascripts',
        options: {
          preserve_dirs: true,
          base_path: 'spec/coffeescripts'
        }
      }
    },
    coffeedoc: {
      dist: {
        target: 'src',
        options: {
          output: 'docs',
          parser: 'commonjs',
          renderer: 'html'
        }
      }
    },
    watch: {
      files: ['src/**/*.coffee', 'spec/index.html', '<config:coffee.specs.src>'],
      tasks: 'default'
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
      mochaPassed: {
        title: 'Mocha',
        message: 'Tests passed successfully'
      },
      mochaFailed: {
        title: 'Mocha',
        message: 'Tests failed'
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

  grunt.registerMultiTask('coffeedoc', 'Generate source documents from CoffeeScript files.', function(){
    var target  = this.data.target,
        binary  = this.data.binary || 'node_modules/coffeedoc/bin/coffeedoc',
        options = this.data.options || {},
        args    = [binary],
        done    = this.async();

    Object.keys(options).forEach(function(opt) {
      args.push('--' + opt + '=' + options[opt]);
    });
    args.push(target);

    grunt.verbose.write('Writing documentation from target '+target+'...');

    var cd = grunt.util.spawn({
      cmd: 'coffee',
      args: args
    }, function(err, result, code) {
      if (code === 0) {
        grunt.verbose.ok();
      } else {
        grunt.log.error(result);
        grunt.fail.warn('CoffeeDoc failed. You may need to install coffee-script via: `npm install -g coffee-script`');
      }
      done(!code);
    });
  });

  grunt.registerTask('mocha', 'run mocha-phantomjs', function () {
    var done = this.async();
    var mocha = grunt.util.spawn({
      cmd: 'node',
      args: [
        'node_modules/mocha-phantomjs/bin/mocha-phantomjs',
        './spec/index.html'
      ]
    }, function(err, result, code){
      done(!code)
    });

    mocha.stdout.pipe(process.stdout);
    mocha.stderr.pipe(process.stderr);
  });

  grunt.registerTask('default', 'snockets growl:snockets coffee growl:coffee coffeedoc mocha min copy');
};
