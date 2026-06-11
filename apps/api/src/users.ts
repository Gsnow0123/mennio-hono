import { Hono } from 'hono'

const users = new Hono()

users.get('/', (c) => c.json({ users: [] }))
users.get('/:id', (c) => c.json({ id: c.req.param('id') }))
users.post('/', (c) => c.json({ message: 'user created' }, 201))
users.put('/:id', (c) => c.json({ message: 'updated' }))
users.delete('/:id', (c) => c.json({ message: 'deleted' }))

export default users