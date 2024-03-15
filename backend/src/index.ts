import { Hono } from 'hono'
import { Router } from 'itty-router'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from 'zod'
import { decode, sign, verify } from 'hono/jwt'
import blogRouter from '../routers/blogRouter'
import userRouter from '../routers/userRouter'
import { cors } from 'hono/cors'
// import { PrismaClient } from '@prisma/client/scripts/default-deno-edge.js'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string
	}, Variables : {
		prisma : PrismaClient
	}
}>();

app.use('/api/*', cors())

app.use("*", async (c, next) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
	c.set('prisma', prisma);
	await next();
});

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
    

	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	try{
		const token = jwt.split(' ')[1];
		// console.log(token)
		const payload = await verify(token, c.env.JWT_SECRET);
		if (!payload) {
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
	}catch(err){
		const obj = {
			msg : "wrong token"
		}
		return new Response(JSON.stringify(obj), {
			status : 400
		})
	}
	await next()
});


app.route('/api/v1/blog', blogRouter)
app.route('/api/v1/user', userRouter)



export default app
