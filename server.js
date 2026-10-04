// Small web server for the Intellectt website (no extra packages needed).
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, 'public');
const PORT = process.env.PORT || 10000;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.avif': 'image/avif', '.md': 'text/plain; charset=utf-8'
};
const MEDIA = new Set(['.mp4', '.webm']);
const HIDDEN = new Set(['.gitkeep']);

function sendMedia(req, res, file, size, type) {
  // videos need byte-range support so browsers (Safari especially) can stream and seek
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  const base = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'public, max-age=604800', 'X-Content-Type-Options': 'nosniff' };
  if (!range) { res.writeHead(200, { ...base, 'Content-Length': size }); return req.method === 'HEAD' ? res.end() : fs.createReadStream(file).pipe(res); }
  let start = range[1] ? parseInt(range[1], 10) : size - parseInt(range[2], 10), end = range[1] && range[2] ? parseInt(range[2], 10) : size - 1;
  if (isNaN(start) || start < 0) start = 0; end = Math.min(end, size - 1);
  if (start > end) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); return res.end(); }
  res.writeHead(206, { ...base, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file, { start, end }).pipe(res);
}

function send(req, res, file, status = 200) {
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';
  const headers = {
    'Content-Type': type,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=604800',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN'
  };
  const zip = /text|javascript|json|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '');
  if (zip) headers['Content-Encoding'] = 'gzip';
  res.writeHead(status, headers);
  if (req.method === 'HEAD') return res.end();
  const stream = fs.createReadStream(file);
  (zip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
}

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  let url = decodeURIComponent((req.url || '/').split('?')[0]);
  if (url === '/healthz') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('ok'); }
  if (url.endsWith('/')) url += 'index.html';
  const file = path.normalize(path.join(ROOT, url));
  if (!file.startsWith(ROOT + path.sep) && file !== ROOT || HIDDEN.has(path.basename(file))) { res.writeHead(404); return res.end('Not found'); }
  fs.stat(file, (err, st) => {
    if (!err && st.isFile()) {
      const ext = path.extname(file).toLowerCase();
      return MEDIA.has(ext) ? sendMedia(req, res, file, st.size, TYPES[ext]) : send(req, res, file);
    }
    // a missing video or model returns 404 so the page can fall back to its images
    if (/\.(mp4|webm|glb|gltf)$/i.test(url)) { res.writeHead(404); return res.end('Not found'); }
    // any unknown page falls back to the site (the site handles its own pages)
    send(req, res, path.join(ROOT, 'index.html'));
  });
}).listen(PORT, '0.0.0.0', () => console.log('Intellectt website running on port ' + PORT));
