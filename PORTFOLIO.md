# Portfolio Brief: profile-card-svg

## Resume Bullets

- Built a serverless SVG profile-card generator for GitHub README pages with parameterized themes, layout options, cache-control headers, and smoke tests.
- Implemented dynamic SVG rendering without a browser build step, making the service lightweight enough for free serverless deployment.
- Designed cache-bypass behavior for GitHub Camo so profile cards can update predictably.

## What This Proves

- Serverless API design and dynamic image generation.
- Practical understanding of SVG, HTTP cache headers, and GitHub README embedding.
- Small-tool packaging with a clear public developer experience.

## Verification

```bash
npm ci
npm test
```

## Interview Talking Points

- How SVG enables crisp, text-searchable visual output.
- Why GitHub image caching requires explicit cache-control behavior.
- How query parameters map to safe visual customization.
