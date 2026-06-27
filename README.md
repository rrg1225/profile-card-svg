# profile-card-svg

[![CI](https://github.com/rrg1225/profile-card-svg/actions/workflows/ci.yml/badge.svg)](https://github.com/rrg1225/profile-card-svg/actions/workflows/ci.yml)
![Serverless](https://img.shields.io/badge/Serverless-Vercel-black?logo=vercel)
![SVG](https://img.shields.io/badge/Image-SVG-0EA5E9)
![Dependencies](https://img.shields.io/badge/Runtime%20Deps-0-green)
![License](https://img.shields.io/badge/License-MIT-green)

`profile-card-svg` is a zero-dependency serverless SVG card generator for GitHub profile READMEs. It turns a simple image URL into a branded, dynamic, cache-aware developer card.

> Resume and interview brief: [PORTFOLIO.md](PORTFOLIO.md)
> Enterprise architecture: [docs/ENTERPRISE_ARCHITECTURE.md](docs/ENTERPRISE_ARCHITECTURE.md)

![Demo Preview](assets/preview.svg)

## Features

- Dynamic SVG generation from query parameters.
- Safe HTML escaping, text truncation, theme fallback, and width clamping.
- Themes: `indigo`, `green`, `sunset`, `midnight`, `aurora`, and `dark`.
- Layouts: `standard` and `compact`.
- Cache-aware response headers with `ETag`.
- Vercel-ready serverless function at `/api/card`.
- Zero runtime dependencies.

## Usage

```md
![Profile Card](https://your-vercel-domain.vercel.app/api/card?name=Demo&role=OpenSource&skills=SVG,Serverless,Growth&theme=aurora&status=Live%20Demo&width=960)
```

## Query Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `name` | `Developer` | Display name |
| `role` | `Full Stack Engineer` | Role or tagline |
| `skills` | `JavaScript,React,Node` | Comma-separated skill badges |
| `theme` | `indigo` | Visual theme |
| `status` | `Building in public` | Current status line |
| `width` | `880` | Card width, clamped to 520-1200 |
| `layout` | `standard` | `standard` or `compact` |

## Local Development

```bash
npm install
npm run check
npm test
```

## Architecture

```text
GitHub README image URL
  -> Vercel function /api/card
  -> query normalization
  -> SVG renderer
  -> cache-aware response
```

## Quality Gates

- `npm run check` validates the serverless function syntax.
- `npm test` covers query normalization, escaping, SVG output, and ETag generation.
- CI runs on pull requests and `main`.

## Roadmap

- Add signed preset URLs for teams that want shared profile themes.
- Add optional GitHub stats blocks while preserving zero runtime dependencies.
- Add visual regression snapshots for generated SVG themes.

## License

MIT
