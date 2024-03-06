import {Hono} from 'hono'
import { Router } from 'itty-router'
import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import { decode, sign, verify } from 'hono/jwt'

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		DIRECT_URL : string,
		JWT_SECRET : string
	}, Variables : {
        prisma : PrismaClient
    }
}>();


interface validBody{
    name ?: string, 
    password: string,
    email : string,
};


userRouter.post('/signup', async c => {
    // console.log(c);
    const body : validBody = await c.req.json();
    console.log(body, c.get('prisma'));
    
    const res1 = await c.get('prisma').user.findFirst({
        where: {
            email : body.email
        },
        select : {
            email : true
        }
    });
    console.log(res1);
    if(res1 !== null){
        const obj = {
            msg : "User already exists."
        };
        return new Response (JSON.stringify(obj),{
            status : 200,
        })
    }

    try{
        const res2 = await c.get('prisma').user.create({
            data:{
                name : body.name ,
                email : body.email,
                password : body.password
            },
            select : {
                id : true,
            }
        });
    }catch(err){
        const obj = {
            msg : err
        };
        return new Response (JSON.stringify(obj),{
            status : 200,
        })
    }
    const obj = {
        msg : "success"
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
});


userRouter.post('/signin', async c => {
    const body : validBody = await c.req.json();
    console.log(body);
    const res1 = await c.get("prisma").user.findFirst({
        where: {
            email : body.email
        },
        select : {
            email : true
        } 
    });
    if(res1 === null){
        const obj = {
            msg : "User not found."
        }
        return new Response (JSON.stringify(obj),{
            status : 404,
        })
    }
    const token = await sign(body, c.env.JWT_SECRET);
    const obj = {
        msg : "success",
        token : token
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
     
});
export default userRouter;