/*
 * grunt-buddha-janeluck
 *
 *
 * Copyright (c) 2015 janeluck
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var path = require('path');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_janeluck', 'code is far away from bug with the animal protecting', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        who: 'alpaca',
        commentSymbol: '//'
      }),
      testExistRegexMap = {
        'alpaca': /神兽保佑/
      };

    var  who = options.who,
      commentSymbol = options.commentSymbol,
      commentFilepathMap ={
        'alpaca': 'assets/alpaca.txt'
      },
      commentFilepath = path.join(__dirname,commentFilepathMap[who]),
      commentContent = grunt.file.read(commentFilepath),
      lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));
    lineCommentArr.forEach(function(value, index, arr){
      arr[index] = commentSymbol + value;
    });

    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
     file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
          newFileContent = commentContent +
            grunt.util.normalizelf('\n0')+
            originalFileContent;


        if(testExistRegexMap[who].test(originalFileContent)){
          return;
        }
        grunt.file.write(filepath,newFileContent);
      });





      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
