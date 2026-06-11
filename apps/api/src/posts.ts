import { Hono } from 'hono'

const posts = new Hono()

posts.get('/', (c) => c.json({ posts: [] }))
posts.get('/:id', (c) => c.json({ id: c.req.param('id') }))

export default posts