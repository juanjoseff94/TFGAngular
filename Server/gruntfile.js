module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify:{
            t1:{ 
                files: {
                        'wwwroot/css/TMS000/site.min.css' : ['wwwroot/css/TMS000/site.css']
                }
            }
        }

    });
};