# Enterprise Architecture

## Enterprise Positioning

profile-card-svg is a serverless dynamic image service. In an enterprise context, the same pattern can power branded developer profile cards, campaign badges, status banners, internal scorecards, and documentation badges with centralized governance.

## Architecture Boundaries

- **HTTP entrypoint**: serverless `/api/card` endpoint.
- **Input normalization**: query parameters are truncated, clamped, and escaped.
- **Rendering layer**: SVG string generator with theme and layout variants.
- **Delivery layer**: cache-control headers tuned for GitHub README embedding.
- **Test layer**: smoke tests for escaping, width clamping, compact layout, and cache behavior.

## Enterprise Extension Path

1. Move theme definitions to versioned configuration.
2. Add signed template presets for company-approved branding.
3. Add rate limiting at the edge provider.
4. Add observability through edge logs, request sampling, and error alerts.
5. Add visual snapshot tests for SVG layout stability.

## SLO and Observability

- **Availability target**: 99.9% for public card rendering.
- **Latency target**: p95 under 150ms at the edge.
- **Correctness target**: no unescaped user-controlled SVG/XML content.
- **Core dashboards**: request count, theme usage, invalid parameter rate, 4xx/5xx rate, cache header regressions.

## Security Model

- User input is escaped before rendering.
- Width is clamped to prevent extreme layout or payload sizes.
- No secrets or server-side data are embedded in cards.
- Future enterprise mode should add template allowlists and abuse protection.

## Interview-Level Design Rationale

This project is valuable because it shows how a very small serverless function can still be designed with input safety, cache semantics, and platform-specific behavior in mind.
