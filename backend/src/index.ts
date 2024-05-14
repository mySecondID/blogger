import { Hono } from 'hono'
import { Router } from 'itty-router'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import blogRouter from '../routers/blogRouter'
import userRouter from '../routers/userRouter'
import verifyRouter from '../routers/verifyRouter'
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

app.use('/*', cors())

app.use('/*', async (c, next) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
	c.set('prisma', prisma);
	await next();
});


app.route('/api/v1/blog/', blogRouter)
app.route('/api/v1/user/', userRouter)
app.route('/api/v1/verifyPost', verifyRouter);


export default app
