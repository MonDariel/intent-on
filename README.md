# Intent-0n Lightweight Prototype

This is the lightweight version of the Intent-0n website. It includes the complete UI and logic, but it intentionally does not include the large MP4 files.

## Included

- `index.html` — landing page, intent builder, mock agent competition, architecture, roadmap.
- `agents.html` — compact clickable agent market with video-ready cards and placeholder animations.
- `create-agent.html` — create-your-own-agent page with simulated skill installer.
- `config.js` — central project configuration.
- `data/agents.js` — 6 full featured agents + 10 future/teaser agents.
- `app.js` — scoring logic, modals, support bot, skill installer, video fallback handling.
- `styles.css` — violet-dark anime/cyber UI theme.
- `assets/logo.png` — Intent-0n logo.
- `assets/agents/README.md` — instructions for adding compressed videos.

## Add your compressed videos later

Place compressed MP4 files in `assets/agents/` with these exact filenames:

- `stable-farmer.mp4`
- `risk-balancer.mp4`
- `aggressive-yield.mp4`
- `hedge-guardian.mp4`
- `alpha-hunter.mp4`
- `social-copy.mp4`
- `network-loop.mp4`

Until those videos are added, the website displays animated violet placeholder panels.

## Run locally

Open `index.html` directly in your browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Prototype disclaimer

No wallet, backend, API, Solidity, or real asset movement is included. All agent data and execution routes are mocked for demonstration.
