import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import users from './users'
import posts from './posts'

import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'


const app = new Hono().basePath('/api/v1')

// 全局中间件

// 请求日志：控制台打印每个请求的方法、路径、状态码、耗时
app.use('*', logger())

// 跨域配置：允许前端跨域访问
app.use('*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

// Server-Timing 头：响应头里带上各阶段耗时，浏览器 DevTools 可以看到
app.use('*', timing())

// 美化 JSON：请求 URL 加 ?pretty 参数时，返回格式化的 JSON
app.use('*', prettyJSON())

// 安全响应头：自动设置 X-Frame-Options、X-Content-Type-Options 等
app.use('*', secureHeaders())

// 鉴权中间件
// 这里为了先讲清概念，先省略 Hono 的类型声明
/* const authMiddleware = async (c, next) => {
  const apiKey = c.req.header('X-API-Key')

  if (apiKey !== 'my-secret-key') {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  await next()
}

// 需要鉴权的接口
app.get('/api/secret', authMiddleware, (c) => {
  return c.json({ data: 'This is secret' })
})
 */

app.route('/users', users)
app.route('/posts', posts)
// 一次取出所有参数
app.get('/orgs/:orgId/:teamId', (c) => {
  const params = c.req.param()
  // params: { orgId: '...', teamId: '...' }
  return c.json(params)
})
// POST - 接收 JSON body
app.post('/api/users', async (c) => {
  const body = await c.req.json()
  return c.json({ message: 'User created', data: body }, 201)
})
// all - 匹配所有 HTTP 方法
app.all('/health', (c) => c.text('ok'))
export default app