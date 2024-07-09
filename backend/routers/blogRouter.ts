import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt';


const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string,
        MY_BUCKET : R2Bucket
	}, Variables : {
        prisma : PrismaClient
    }
}>();



blogRouter.use('/*', async (c, next) => {
	try{
        // console.log('opopop',c.req.header("Authorization"))
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
    const body = await c.req.parseBody();
    console.log("body: ", body);
    let pictureKey = "";
    if(!body || !body['file']){
        c.status(400);
        return c.json({
            "message": "no file found"
        })
    }
    try{
        const res = await c.env.MY_BUCKET.put(`${body['title'] || ""}${new Date().getTime()}`, body['file'])
        console.log("res", res);
        pictureKey = (res?.key || "");
    }catch(err){
        console.log("error in uploader", err);
    }
    try{
        let jwt = c.req.header("Authorization");
        jwt = jwt?.split(' ')[1];
        const res = await c.get('prisma').post.create({
            data : {
                title: body.title,
                content: body.content,
                authorId: body.id,
                pictureKey: pictureKey
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
    try{
        let jwt = c.req.header("Authorization") || "abc abc";
        jwt = jwt?.split(' ')[1];
        const body = await c.req.json();
        const res = await c.get('prisma').post.findMany({
            where : {
                id : body.postID
            },select : {
                authorId : true
            }
        });
        const details = decode(jwt).payload;
            console.log(details.email);
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
                c.status(403)
                return c.json({
                    msg: "unauthorized"
                });
            }
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
            msg : "err"
        }),{
            status : 400,
        })
    }
     
});


blogRouter.post('/delete', async c => {
    // console.log(c);
    try{
        let jwt = c.req.header("Authorization");
        const body = await c.req.json();
        jwt = jwt.split(' ')[1];
        const details = decode(jwt).payload;
        console.log("details", details, body);
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
                authorId: true,
                pictureKey: true
            }
        });
        // console.log(userID, owner);
        if(owner && owner[0].authorId && userID && userID[0].id && owner[0].authorId !== userID[0].id){
            c.status(403)
            return c.json({
                msg: "unauthorized"
            });
        }

        try{
            const res = await c.env.MY_BUCKET.delete(owner[0].pictureKey);
        }catch(err){
            c.status(500);
            return c.json({
                message: "picture couldn't be deleted"
            })
        }
        
        const res1 = await c.get('prisma').post.delete({
            where : {
                id : body.postID
            }
        });
        console.log(res1);
        c.status(200);
        return c.json({
            message: "success"
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
                authorId : true,
                pictureKey: true
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
        const respic = await c.env.MY_BUCKET.get(res.pictureKey)
        c.status(200);
        // return c.json(res)
        return c.json({
            ...res,
            respic: respic
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