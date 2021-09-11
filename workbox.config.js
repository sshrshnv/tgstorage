module.exports = {
  swSrc: './build/sw.js',
  swDest: './build/sw.js',
  globDirectory: './build',
  globPatterns: ['*.js', '*.css', '*.html', '*.webmanifest'],
  globIgnores: ['sw.*', '*.map', '*.cache'],
  dontCacheBustURLsMatching: /\.[0-9a-z]{8}\./,
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
}
