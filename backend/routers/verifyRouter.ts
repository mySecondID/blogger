import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import { decode, sign, verify } from 'hono/jwt'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string
	}, Variables : {
        prisma : PrismaClient
    }
}>();

app.use('/', async c => {
    try{
        let jwt = c.req.header("Authorization");
        const body = await c.req.json();
        console.log(body)
        console.log(jwt);
        jwt = jwt?.split(' ')[1];
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        const payload = await verify(jwt, c.env.JWT_SECRET);
		if(!payload){
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
        const details = decode(jwt).payload;
        // console.log(details.email);
        const userID = await c.get('prisma').user.findMany({
            where:{
                email: details.email
            },
            select: {
                id: true
            }
        });
        const owner = await c.get('prisma').post.findMany({
            where:{
                id : body.postID
            }, 
            select: {
                authorId: true
            }
        });
        // console.log(userID, owner);
        if(owner[0].authorId !== userID[0].id){
            c.status(401);
            return c.json({
                msg: "Unauthorized"
            })
        }
        return c.json({
            msg: "ok"
        });
	}
    catch(err){
		return new Response(JSON.stringify(err), {
			status : 400
		})
	}
});

export default app;