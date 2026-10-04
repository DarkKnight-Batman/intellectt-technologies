# Intellectt website

A static website: everything the browser needs is in `public/`.
No build step and no packages to install.

```
intellectt-website/
  public/            <- the website (this is what gets published)
    index.html
    img/  logo/  video/
    robots.txt
  netlify.toml       <- Netlify settings
  render.yaml        <- Render settings
  server.js          <- optional Node server (only for Render "Web Service" or local testing)
  package.json  Dockerfile
  ASSETS-NEEDED.md   <- photos, film and models to replace before launch (not published)
```

## Deploy on Netlify (easiest)

**Option A: drag and drop**
1. Log in to app.netlify.com and open **Sites**.
2. Drag the `public` folder onto the page. The site is live in about a minute.

**Option B: from GitHub**
1. Push this folder to a GitHub repository.
2. In Netlify choose **Add new site > Import an existing project** and pick the repo.
3. Leave the build command empty. The publish directory is read from `netlify.toml` (`public`).
4. Click **Deploy**.

## Deploy on Render

**Static Site (recommended, free)**
1. Push this folder to a GitHub repository.
2. In Render choose **New > Blueprint** and pick the repo. `render.yaml` sets everything up.
   Or choose **New > Static Site**, leave the build command empty and set **Publish directory** to `public`.

**Web Service (only if you want the Node server)**
1. **New > Web Service**, pick the repo.
2. Build command: leave empty. Start command: `npm start`.
3. Render sets the port automatically. Health check path: `/healthz`.

## Test on your computer

```
npm start
```
Then open http://localhost:10000. (Opening index.html by double-clicking also works,
but the blueprint lens on the homepage needs the site to be served, so use `npm start`.)

## Custom domain
Add your domain in the Netlify or Render dashboard under **Domains** and follow the DNS steps shown there.
Both give free HTTPS automatically.

## Adding the hero film
Put `intellectt-hero.mp4` in `public/video/`. The homepage picks it up automatically.
