import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import {Hono} from 'hono'
import { Router } from 'itty-router'

const blogRouter  = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string
	}, Variables : {
        prisma : PrismaClient
    }
}>();




blogRouter.post('/', async c => {
    const body = await c.req.json();
    console.log(body);
    try{
        const res = await c.get('prisma').post.create({
            data : {
                title: body.title,
                content : body.content
            }, select : {
                id : true
            }
        });

        return new Response (JSON.stringify({
            msg : "success"
        }),{
            status : 200,
        })
    }catch(err){
        return new Response (JSON.stringify({
            msg : err
        }),{
            status : 400,
        })
    }
});


blogRouter.put('/', async c => {
    // console.log(c);
    const body = await c.req.json();
    try{
        const res = await c.get('prisma').post.find({
            where : {
                id : body.postID
            }
        });
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 403,
            })
        }
        const res1 = await c.get('prisma').post.update({
            where : {
                id : body.postID
            }, data : {
                title : body.title,
                content : body.content
            }
        });
        return new Response (JSON.stringify({
            msg : "success"
        }),{
            status : 200,
        })
    }catch(err){
        return new Response (JSON.stringify({
            msg : err
        }),{
            status : 400,
        })
    }
     
});


blogRouter.get('/bulk/:id', async c => {
    const authorID = c.req.param('id');
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
        })
        return new Response (JSON.stringify(res),{
            status : 200,
        })
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
                time : true
            }
        });
        // console.log(res);
        if(!res){
            return new Response (JSON.stringify({
                msg : "post not found"
            }),{
                status : 403,
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