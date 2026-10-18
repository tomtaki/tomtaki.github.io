// Production entry point. Wraps Astro's standalone handler so requests to the
// bare domain are redirected to www before any page or static file is served.
import http from 'node:http';

const CANONICAL_HOST = 'www.tomtaki.com';
const REDIRECT_HOSTS = new Set(['tomtaki.com']);

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('./dist/server/entry.mjs');

const port = Number(process.env.PORT ?? 8080);
const host = process.env.HOST ?? '0.0.0.0';

http
  .createServer((req, res) => {
    const reqHost = (req.headers.host ?? '').split(':')[0].toLowerCase();
    if (REDIRECT_HOSTS.has(reqHost)) {
      res.writeHead(301, { location: `https://${CANONICAL_HOST}${req.url ?? '/'}` });
      res.end();
      return;
    }
    handler(req, res);
  })
  .listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
