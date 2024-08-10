import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode,sign,verify} from 'hono/jwt';

// Create the main Hono app
const app = new Hono<{Bindings:{// Define the bindings to identify DATABASE_URL that it is a string not a url
  DATABASE_URL:string
}}>();

app.post('/api/v1/signup', (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,

  }).$extends(withAccelerate());
  
  return c.text("hello hono")
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
