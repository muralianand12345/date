# Do you wanna help plan for our first date? 💕

A cute, interactive single-page website that asks one very important question.
Click **Yes** and hearts rain down; click **No** and... good luck catching that button. 😉

## Files
- `index.html` — page structure
- `styles.css` — the pink romantic theme
- `script.js` — reacting GIFs, growing "Yes", dodging "No", heart confetti

## Run locally
Just open `index.html` in a browser. No build step.

Or serve it:
```bash
npx serve .
```

## Deploy to Vercel
This is a zero-config static site, so deploying is quick:

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel        # follow prompts, then `vercel --prod`
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Other** (no build command, output is the repo root).
4. Click **Deploy**.
`