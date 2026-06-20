# 🎨 profile-card-svg

[简体中文](#-简体中文) | [English](#-english)

![Serverless](https://img.shields.io/badge/Serverless-Free-green?style=for-the-badge)
![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)
![SVG](https://img.shields.io/badge/Image-SVG-blue?style=for-the-badge)
![Cache](https://img.shields.io/badge/Cache-Control-important-red?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)

> 让你的 GitHub 个人主页或 README 只需一行链接，就能生成一张实时动态的状态卡片。
> 当别人引用你的卡片时，他们的页面将成为你的“流动广告牌”，带来源源不断的曝光与关注。

---

| 🚀 零门槛部署 | 🧲 病毒式流量 | 🖼️ SVG 原生渲染 | 🔄 实时更新 |
| --- | --- | --- | --- |
| 无需服务器、无需前端构建，一行链接即可启用。 | 每一次嵌入都能把别人的个人主页变成你的品牌曝光位。 | 2K/4K Retina 清晰，文字可选中复制。 | 强制 Cache-Control，避免 GitHub Camo 缓存卡住。 |

---

## 🎬 Demo 预览

![Demo Preview](assets/preview.svg)

**Live Demo 链接**（请替换为你的部署域名）：

`https://your-vercel-domain.vercel.app/api/card?name=Demo&role=OpenSource&skills=SVG,Serverless,Growth&theme=aurora&status=Live%20Demo&width=960`

---

---

## 📌 目录

- [简体中文](#-简体中文)
- [English](#-english)

---

## 🇨🇳 简体中文

### 🚀 项目定位

`profile-card-svg` 是一个面向 GitHub 个人主页的“动态状态卡片生成器”。

它的目标是：

- 让普通开发者在几秒内生成一张可嵌入 GitHub Profile README 的动态卡片。
- 通过 Serverless 和 SVG 技术，实现“零运维、零服务器、零成本”的现代化展示方式。
- 让引用这张卡片的任何页面都变成你的品牌曝光位，产生天然的裂变流量。

> 你不需要复杂的前端部署，只需要把一行动态图片链接放进 README，就能把个人主页变成“可传播的流量入口”。

### ✨ 核心技术亮点

#### 1. 纯 Serverless 架构

- 使用 Vercel 无服务器函数：`/api/card`
- 仅在访问时生成内容，不占用常驻资源。
- 适合开源仓库：免费部署、低维护、快速启动。
- 访问者直接请求你的接口，卡片成为你的外链入口。

#### 2. 动态 SVG 原生渲染

- 使用 SVG 而非 PNG：文字清晰、文件小、缩放自适应。
- 2K / 4K Retina 屏幕上边缘不模糊。
- 文字可被鼠标选中、复制、搜索。
- 后端实时拼接 XML SVG，支持参数驱动的主题、职业、标签、状态。

#### 3. GitHub Camo 缓存绕过策略

GitHub 对外部图片会走 Camo 代理，并且可能产生强缓存。

本项目通过响应头禁用强缓存：

```text
Cache-Control: max-age=0, no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

这样可以确保：

- GitHub 页面刷新的时候优先拉取最新卡片。
- 参数更新后即时生效。
- 卡片状态不会被旧缓存“卡住”。

#### 4. 精致视觉与动效

卡片内置渐变背景、柔和光效和细腻入场动画：

- 模拟“呼吸发光”的视觉节奏
- 入场时的淡入与位移动画
- 适配深色 / 明亮主题
- 支持自定义 `theme` 参数，展现个性化风格

### 📈 为什么这份 README 结构更高级？

- 清晰的“项目定位 + 技术优势 + 快速上手”结构。
- 强调“可传播、可裂变”的增长逻辑。
- 用图标、表格与短语提升扫描效率。
- 兼顾中文与英文读者。

### 🧩 参数自定义说明

| 参数 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| `name` | string | 显示姓名或品牌 | `name=YourName` |
| `role` | string | 当前位置 / 职位 | `role=FullStackDev` |
| `skills` | csv | 技能标签，逗号分隔 | `skills=React,Node,AI` |
| `theme` | string | 主题风格 | `theme=sunset` |
| `status` | string | 自定义状态文案 | `status=Open%20for%20Collaboration` |
| `width` | number | 卡片宽度，可选 | `width=960` |
| `layout` | string | `standard` 或更窄的 `compact` | `layout=compact` |

### 🧪 最佳实践示例

```markdown
![Profile Status](https://your-vercel-domain.vercel.app/api/card?name=Alice&role=Developer&skills=React,Node,AI&theme=aurora&status=Building%20in%20Public&width=960)
```

### 🚀 30 秒免费部署流程

1. Fork 本仓库到你的 GitHub 账号。
2. 登录 Vercel：<https://vercel.com/>
3. 点击 `Import Project`，选择你 Fork 的仓库。
4. 点击 `Deploy`。
5. 部署完成后复制你的专属域名，例如：`https://your-vercel-domain.vercel.app`
6. 在 GitHub Profile README 中替换链接即可。

> 这是一种“零配置、零运维”的体验，适合所有想快速打造个人主页展示窗口的开发者。

### 📣 病毒式引流玩法

- 把卡片链接放在你的 GitHub Profile、博客签名、社交简介中。
- 邀请同事、朋友和社区成员引用这条链接。
- 他们的页面访问即是你的曝光通道。
- 每一次点击都可能带来一个 Star、一位访客或一次合作机会。

### 🤝 贡献与交流

欢迎提交 Issue、PR 或提议新的主题风格。

- 如果你希望支持更多主题颜色，请提交 PR。
- 如果你希望增加更多动态参数（例如 `emoji`、`badge`），欢迎一起优化。

### 📄 许可证

MIT License

---

## 🇬🇧 English

### 🚀 What is this project?

`profile-card-svg` is a Dynamic GitHub Profile Status Card Generator designed for explosive open-source growth.

With one line of markdown, you can embed a serverless SVG card in your GitHub Profile or README. When others use your card URL, their page becomes a moving billboard for your project.

### ✨ Why this is valuable

- One-line embed, no server, no setup.
- SVG-based rendering keeps the card crisp on Retina displays.
- The card is generated on demand, so it can update immediately.
- Every external embed becomes a potential traffic and star source.

### 🔧 Core technical advantages

#### Pure serverless architecture

- Built with Vercel Serverless Function: `/api/card`
- No dedicated server, no persistent process, no maintenance.
- Ideal for open-source usage: low cost, high availability.
- Every request hits your endpoint, turning the card into a distribution channel.

#### Dynamic SVG rendering

- Vector graphics ensure sharp output on 2K / 4K screens.
- File size remains tiny, compared to PNG/WEBP.
- Text is selectable and copyable.
- The backend constructs realtime native XML SVG based on query parameters.

#### Camo-bypass cache control

GitHub proxies external images through Camo and often caches them aggressively.

This project sets response headers:

```text
Cache-Control: max-age=0, no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

That means:

- Each page refresh requests the latest card.
- Parameter updates take effect immediately.
- The card is not stuck on stale cache content.

#### Refined visual motion and themes

- Soft breathing glow effect
- Entrance fade-in animation
- Gradient backgrounds with high contrast text
- Multiple theme presets for personality and branding

### 📊 Parameter reference

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| `name` | string | Display name or brand | `name=YourName` |
| `role` | string | Current role or title | `role=FullStackDev` |
| `skills` | csv | Skill tags separated by commas | `skills=React,Node,AI` |
| `theme` | string | Theme preset | `theme=sunset` |
| `status` | string | Custom status message | `status=Open%20for%20Collaboration` |
| `width` | number | Card width (optional) | `width=960` |
| `layout` | string | `standard` or narrower `compact` | `layout=compact` |

### 🧪 Example usage

```markdown
![Profile Status](https://your-vercel-domain.vercel.app/api/card?name=Alice&role=Developer&skills=React,Node,AI&theme=aurora&status=Building%20in%20Public&width=960)
```

### 🚀 Deploy in 30 seconds

1. Fork this repository.
2. Sign in to Vercel: <https://vercel.com/>
3. Import your forked project.
4. Click `Deploy`.
5. Copy your deployment domain, such as `https://your-vercel-domain.vercel.app`
6. Update your GitHub Profile README with the card URL.

> Launch your own serverless card endpoint in under 30 seconds.

### 📣 Viral growth strategy

- Add the card URL to your GitHub Profile, blog footer, or social bio.
- Ask teammates and friends to embed it in their profiles.
- Every embed becomes a distribution channel back to your project.

### 🤝 Contributing

PRs and issues are welcome.

- Want more theme presets? Submit a PR.
- Want more dynamic parameters like `emoji` or `badge`? Let’s improve it together.

### 📄 License

MIT License
