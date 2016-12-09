'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const _ = require('lodash');
const svg = require('dr-svg-sprites');
const PLUGIN_NAME = 'gulp-dr-svg-sprites';

var defaults = {
    spriteElementPath: 'svgs',
    spritePath: 'images',
    cssPath: 'styles',
    cssPrefix: 'tmp',
    sizes: {
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24
      },
    refSize: 'lg',
    cssPngPrefix: '.no-svg',
    layout: 'vertical',
    unit: 10
  };

module.exports = opts => {

    config = _.merge(_.cloneDeep(defaults), opts || {});

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

          file.contents = new Buffer(svg(config, () => {
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
