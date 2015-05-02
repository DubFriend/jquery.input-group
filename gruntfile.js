module.exports = function (grunt) {
    var bannerTemplate = '' +
        '// <%= pkg.name %> version <%= pkg.version %>\n' +
        '// <%= pkg.repository.url %>\n' +
        '// (<%= pkg.license %>) <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '// <%= pkg.author %>\n';

    var devTaskList = ['concat', 'uglify', 'qunit'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n\n',
                banner: bannerTemplate
            },
            dist: {
                src: [
                    'src/intro.js',
                    'src/main.js',
                    'src/outro.js'
                ],
                dest: '<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: { banner: bannerTemplate },
            dist: {
                files: { '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] }
            }
        },

        qunit: {
            all: ['test/index.html']
        },

        watch: {
            scripts: {
                files: ['**/*'],
                tasks: devTaskList,
                options: {
                    livereload: true,
                    spawn: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', devTaskList);
    grunt.registerTask('test', devTaskList);
};