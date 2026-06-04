import { Hono } from 'hono'

const app = new Hono()

// 单个参数
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id })
})

// 多个参数
app.get('/posts/:postId/comments/:commentId', (c) => {
  const postId = c.req.param('postId')
  const commentId = c.req.param('commentId')
  return c.json({ postId, commentId })
})

// 一次取出所有参数
app.get('/orgs/:orgId/:teamId', (c) => {
  const params = c.req.param()
  // params: { orgId: '...', teamId: '...' }
  return c.json(params)
})

export default app