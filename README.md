# Beamcore web

Static landing page for `beamcore.dev`.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Notes

- No build step is required.
- Tailwind is compiled into `assets/css/styles.css`, so the GitHub Pages workflow does not need `node_modules`.
- The hero terminal is HTML/CSS, not a screenshot.
- The runtime diagram is intentionally compact: user input, two context nodes, generated function, local execution, result.
- The install section mirrors the source-first command block style from the live site.
