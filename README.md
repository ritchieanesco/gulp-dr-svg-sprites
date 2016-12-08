# gulp-dr-svg-sprites [![Build Status](https://travis-ci.org/ritchieanesco/gulp-dr-svg-sprites.svg?branch=master)](https://travis-ci.org/ritchieanesco/gulp-dr-svg-sprites)

> Port of the popular grunt-dr-svg-sprites plugin


## Install

```
$ npm install --save-dev gulp-dr-svg-sprites
```


## Usage

```js
const gulp = require('gulp');
const drsvgsprites = require('gulp-dr-svg-sprites');

gulp.task('default', () => {
	gulp.src('src')
		.pipe(drsvgsprites())
		.pipe(gulp.dest('dist'))
);
```


## API

### drsvgsprites([options])

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

MIT © [Ritchie Anesco](http://www.ritchieanesco.com)
