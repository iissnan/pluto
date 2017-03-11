'use strict';

const fs = require('fs');
const path = require('path');
const bluebird = require('bluebird');
const _ = require('lodash');

const readdir = bluebird.promisify(fs.readdir);
const stat = bluebird.promisify(fs.stat);

module.exports = function walk(dir, root) {
  return readdir(dir).map(function(entry) {
    var currentPath = path.join(dir, entry);
    return stat(currentPath).then(function (stats) {
      if (stats.isDirectory()) {
        return walk(currentPath, root);
      }
      if (stats.isFile()) {
        let entry = path.resolve(root, currentPath);
        entry = path.normalize(entry).replace('\\\\', '/');
        return entry;
      }
    });
  }).filter(function (entry) {
    return _.endsWith(entry, '.png') ||
      _.endsWith(entry, '.jpg') ||
      _.endsWith(entry, '.jpeg') ||
      _.endsWith(entry, '.gif') ||
      _.endsWith(entry, '.mp4');
  }).reduce(function (entries, item) {
    return entries.concat(item);
  }, []);
};
