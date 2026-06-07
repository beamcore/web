# Beamcore Web

Static GitHub Pages landing page for the Beamcore Agent.

The content is aligned with the current `beamcore/agent` codebase:

- autonomous F1 development workflow;
- focused F2 chat mode;
- bounded local-first F3 research mode;
- provider-neutral routing and per-mode model selection;
- append-only timeline with checkpoints, rewind, fork, interrupt, and resume;
- workspace-bound guarded tools and atomic file mutation;
- Elixir/OTP supervision and persistent runtime services.

The site intentionally does **not** claim full filesystem rollback or independent two-model Deep Research orchestration because those capabilities are not present in the inspected Agent code.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Structure

```text
web/
├── index.html
├── 404.html
├── site.webmanifest
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── tailwind.config.js
│   ├── img/
│   └── diagrams/
│       ├── provider-runtime.svg / .png
│       └── reversible-timeline.svg / .png
└── .github/workflows/pages.yml
```

## Deployment

Push to `main`. The GitHub Pages workflow uploads the static repository and deploys it without a build step.
