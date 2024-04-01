import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import {Hono} from 'hono'
import { cors } from 'hono/cors';
import { decode, sign, verify } from 'hono/jwt'

const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string
	}, Variables : {
        prisma : PrismaClient
    }
}>();


blogRouter.use('/*', async (c, next) => {
	try{
        // const body = await c.req.json();
        // console.log(body)
        const jwt = c.req.header("Authorization");
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
		const token = jwt.split(' ')[1];
		const payload = await verify(token, c.env.JWT_SECRET);
		if(!payload){
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
		await next();
	}catch(err){
		const obj = {
			msg : "yoyoyoyoyo"
		}
		return new Response(JSON.stringify(obj), {
			status : 400
		})
	}
});



blogRouter.post('/', async c => {
    const body = await c.req.json();
    // console.log(body);
    try{
        const res = await c.get('prisma').post.create({
            data : {
                title: body.title,
                content : body.content,
                authorId : body.id
            }, select : {
                id : true
            }
        });

        return new Response (JSON.stringify(res),{
            status : 200,
        })
    }catch(err){
        console.log(err);
        return new Response (JSON.stringify({
            msg : err
        }),{
            status : 403,
        })
    }
});


blogRouter.put('/', async c => {
    // console.log(c);
    const body = await c.req.json();
    console.log(body)
    try{
        const res = await c.get('prisma').post.findMany({
            where : {
                id : body.postID
            },select : {
                authorId : true
            }
        });
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 403,
            })
        }
        console.log("put", res);
        const res1 = await c.get('prisma').post.update({
            where : {
                id : body.postID
            }, data : {
                title : body.title,
                content : body.content
            }
        });
        console.log("put", res1);

        return new Response (JSON.stringify({
            msg : "success"
        }),{
            status : 200,
        })
    }catch(err){
        return new Response (JSON.stringify({
            msg : "err"
        }),{
            status : 400,
        })
    }
     
});


blogRouter.delete('/', async c => {
    // console.log(c);
    const body = await c.req.json();
    console.log(body)
    try{
        const res = await c.get('prisma').post.findMany({
            where : {
                id : body.postID
            },select : {
                authorId : true
            }
        });
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 403,
            })
        }
        const res1 = await c.get('prisma').post.delete({
            where : {
                id : body.postID
            }
        });

        return new Response (JSON.stringify({
            msg : "success"
        }),{
            status : 200,
        })
    }catch(err){
        return new Response (JSON.stringify({
            msg : "err"
        }),{
            status : 400,
        })
    }
     
});


blogRouter.get('/bulk/:id', async c => {
    const authorID = c.req.param('id');
    console.log(authorID);
    try{
        const res = await c.get('prisma').post.findMany({
            where : {
                authorId : authorID
            },
            select : {
                title : true,
                content : true,
                id : true,
                time : true
            }
        });
        console.log(res);
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 404,
            })
        }
        return new Response (JSON.stringify(res),{
            status : 200,
        });
    }catch(err){
        return new Response (JSON.stringify({msg : err}), {status : 400});
    }
     

});


blogRouter.get('/bulk', async c => {
    try{
        const res = await c.get('prisma').post.findMany({
            select : {
                title : true,
                content : true,
                id : true,
                time : true
            }
        });
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 404,
            })
        }
        return new Response (JSON.stringify(res),{
            status : 200,
        });
    }catch(err){
        return new Response (JSON.stringify({msg : err}), {status : 400});
    }
     

});


blogRouter.get('/:id', async c => {
    // console.log(c);
    const postID = c.req.param('id');
    console.log(postID)
    try{
        const res = await c.get('prisma').post.findFirst({
            where : {
                id : postID
            }, select : {
                title : true,
                content : true,
                time : true,
                authorId : true
            }
        });
        
        // console.log(res);
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 404,
            })
        }
        return new Response (JSON.stringify(res),{
            status : 200,
        })
    }catch(err){
        console.log(err);
        return new Response (JSON.stringify({
            msg : "fuck off"
        }),{
            status : 400,
        })
    }
    
     
});


export default blogRouter;