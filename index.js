'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const svg = require('dr-svg-sprites');
const PLUGIN_NAME = 'gulp-dr-svg-sprites';

module.exports = opts => {

    opts = opts || {};

    return through.obj((file, enc, cb) => {
        if (file.isNull()) {
          cb(null, file);
          return;
        }

        if (file.isStream()) {
          cb(new gutil.PluginError(PLUGIN_NAME,
          'Streaming not supported'));
          return;
        }

        try {
          file.contents = new Buffer(svg(opts, () => {
              console.log('SVG GENERATION COMPLETE');
              done();
            }));
          this.push(file);
        } catch (err) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
        }

        cb(null, file);
      });
  };
