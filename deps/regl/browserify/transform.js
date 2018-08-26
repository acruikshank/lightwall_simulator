import Stream from 'stream';
var PassThrough = Stream.PassThrough
var Transform = Stream.Transform
import util from 'util';
import path from 'path';
import fs from 'fs';

var REGL_PATH = path.normalize(path.join(__dirname,
  '../regl.js'))
var REGL_MAIN_PATH = path.normalize(path.join(__dirname,
  '../',
  require('../package.json').main))
var UNCHECKED = fs.readFileSync(path.join(__dirname,
  '../dist/regl.min.js')).toString()

function ReplaceREGL (options) {
  Transform.call(this, options)
}
util.inherits(ReplaceREGL, Transform)

ReplaceREGL.prototype._transform = function (chunk, enc, cb) {
  cb()
}

ReplaceREGL.prototype._flush = function (cb) {
  this.push(UNCHECKED)
  cb()
}

export default function (file, options) {
  var nfile = path.normalize(file)
  if ((options._flags && options._flags.debug) ||
    (nfile !== REGL_PATH && nfile !== REGL_MAIN_PATH)) {
    return new PassThrough()
  }
  return new ReplaceREGL()
};
