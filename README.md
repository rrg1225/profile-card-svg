# profile-card-svg

[简体中文](#简体中文) | [English](#english)

A zero-dependency serverless SVG profile card generator for GitHub README pages. It is designed for Vercel deployment, safe query handling, cache-aware responses, and easy portfolio reuse.

> Resume and interview brief: [PORTFOLIO.md](PORTFOLIO.md)
> Enterprise architecture: [docs/ENTERPRISE_ARCHITECTURE.md](docs/ENTERPRISE_ARCHITECTURE.md)

![Demo Preview](assets/preview.svg)

---

## 简体中文

### 项目亮点

- **Serverless 动态 SVG**：通过 `/api/card` 根据 URL 参数实时生成 GitHub Profile 卡片。
- **零依赖实现**：没有前端构建链和运行时依赖，部署成本低。
- **安全参数处理**：对 `name`、`role`、`skills`、`status` 做 HTML 转义、长度截断和宽度限制。
- **主题与布局**：支持 `indigo`、`aurora`、`midnight` 等主题和 `compact` 布局。
- **缓存控制**：返回 `ETag`、`Cache-Control` 和 `X-Content-Type-Options`，适合 GitHub 图片代理场景。
- **可测试核心逻辑**：SVG 构建、参数归一化、条件请求都由 Node test 覆盖。

### 使用示例

```text
https://your-vercel-domain.vercel.app/api/card?name=Demo&role=OpenSource&skills=SVG,Serverless,Growth&theme=aurora&status=Live%20Demo&width=960
```

### 本地验证

```bash
npm install
npm test
```

### 查询参数

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `name` | `Developer` | 显示名称 |
| `role` | `Full Stack Engineer` | 角色或定位 |
| `skills` | `JavaScript,React,Node` | 逗号分隔技能标签 |
| `theme` | `indigo` | 卡片主题 |
| `status` | `Building in public` | 当前状态 |
| `width` | `880` | 宽度，限制在 520 到 1200 |
| `layout` | `standard` | `standard` 或 `compact` |

---

## English

### Highlights

- **Serverless SVG generation** through `/api/card`.
- **Zero runtime dependencies** for simple deployment and maintenance.
- **Defensive query normalization** with escaping, truncation, width clamping, and theme fallback.
- **Theme and layout support** for reusable profile branding.
- **Cache-aware responses** with `ETag`, `Cache-Control`, and `X-Content-Type-Options`.
- **Automated tests** for SVG rendering, sanitization, compact layout, and conditional requests.

### Scripts

```bash
npm test
```

### Repository Topics

`github-profile`, `svg`, `serverless`, `vercel`, `profile-card`
