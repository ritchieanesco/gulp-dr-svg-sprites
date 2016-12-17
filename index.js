/*global module, Buffer */
const gutil = require('gulp-util');
const through = require('through2');
const _ = require('lodash');
const svg = require('dr-svg-sprites');
const fs = require('fs');
const PLUGIN_NAME = 'gulp-dr-svg-sprites';
const defaults = {
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

module.exports = function(opts) {

    let config = _.merge(_.cloneDeep(defaults), opts || {});

    if (config.template) {
      config.template = fs.readFileSync(config.template, 'utf-8');
    }

    return through.obj(function(file, enc, cb) {

        let self;

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
          self = this;
          file.contents = new Buffer(svg(config, function() {
              console.log('SVG GENERATION COMPLETE');
              self.push(file);
            }));
        } catch (err) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
        }

        cb(null, file);
      });
  };
