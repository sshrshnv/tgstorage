module.exports = {
  swSrc: './build/sw.js',
  swDest: './build/sw.js',
  globDirectory: './build',
  globIgnores: ['sw.js', '*.map', '*.cache'],
  dontCacheBustURLsMatching: /\.build\.[0-9a-z]{8}\./,
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
}
