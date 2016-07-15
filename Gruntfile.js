module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['lib/*.js'],
                dest: 'debug/myLib.js'
            }
        },
        copy: {
            main: {
                files: [
                    { src: ['*.js','manifest.json'], dest: 'debug',cwd: 'src',expand: true}
                ]
            }
            ,
            copyMyLib : {
                files : [
                    {cwd: 'lib',src: '*.coffee',dest: 'D:/workplace/js/page-action-chrome-plugin/app/',expand: true}
                ]
            }
        },
        watch : {

            build:{

                files:['src/*.js','src/manifest.json'],
                tasks : ['copy:main']

            },
            builLib : {

                files:['lib/*.js'],
                tasks:['concat','copy:copyMyLib']
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认任务
    grunt.registerTask('default', ['concat','copy:main',"watch"]);

}