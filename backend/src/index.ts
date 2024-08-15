import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode,sign,verify} from 'hono/jwt';

// Create the main Hono app
const app = new Hono<{Bindings:{// Define the bindings to identify DATABASE_URL that it is a string not a url
  DATABASE_URL:string
  JWT_SECRET:string
}}>();

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,

  }).$extends(withAccelerate());
  const body = await c.req.json();
  try{
  const user = await prisma.user.create({
	data:{
		email:body.email,
		password:body.password,
	}
  })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({jwt})}
	catch(e){
		return c.json({"error":"while signing up"+e})
	}
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try{
		const user = await prisma.user.findUnique({
			where:{
				email:body.email,
				password:body.password,
				
			}
		})
		if(!user){
			return c.json({"error":"user not found"})
		}
		const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
		return c.json("Welcome back")
	}
	catch(e){
		return c.json({"error":"while signing in"})
	}
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
