import { Hono } from 'hono'
import { Router } from 'itty-router'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// import auth from '../middleware/auth'
import {z} from 'zod'
import { decode, sign, verify } from 'hono/jwt'
import blogRouter from '../routers/blogRouter'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string
	}
}>();
const router = Router()

import * as dotenv from 'dotenv';
import userRouter from '../routers/userRouter'
dotenv.config();


interface validBody{
    name ?: string, 
    password: string,
    email : string,
};


app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	// console.log(jwt)
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	try{
		const token = jwt.split(' ')[1];
		const payload = await verify(token, 'mySecret');
		if (!payload) {
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
		// c.set('email', payload.email);
	}catch(err){
		const obj = {
			msg : "wrong token"
		}
		return new Response(JSON.stringify(obj), {
			status : 400
		})
	}
	await next()
})


app.mount('/api/v1/blog', blogRouter.handle)
app.mount('/api/v1/user', userRouter.handle)



export default app
