## 技术栈

- **Cloudflare Workers** - 无服务器边缘计算平台
- **Hono.js** - 轻量级高性能 Web 框架
- **Zod** - TypeScript 优先的模式验证库

## 快速开始

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
