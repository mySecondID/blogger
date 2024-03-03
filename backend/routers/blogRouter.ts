import {Hono} from 'hono'
import { Router } from 'itty-router'

const blogRouter  = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string
	}
}>();

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'




blogRouter.post('/', async c => {
    const body = await c.req.json();
    console.log(body);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const res = await prisma.post.create({
        data : {
            title: body.title,
            content : body.content
        }
    }
    );


    const obj = {
        msg : "success"
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
     
});


blogRouter.put('/', c => {
    console.log(c);
    const obj = {
        msg : "success"
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
     
});



blogRouter.get('/:id', c => {
    console.log(c);
    const obj = {
        msg : "success"
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
     
});


blogRouter.get('/bulk', c => {
    console.log(c);
    const obj = {
        msg : "success"
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
     
});

export default blogRouter;