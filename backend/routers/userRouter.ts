import {Hono} from 'hono'
import { Router } from 'itty-router'
const app = new Hono()
const userRouter = Router()

import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

interface validBody{
    name ?: string, 
    password: string,
    email : string,
};


const prisma = new PrismaClient({
    datasourceUrl: `prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmI4N2JmMTYtNzc2Mi00ZTEzLTk5NzktNTNiNjdjZjY0MmNjIiwidGVuYW50X2lkIjoiNzdiOTFiYzVjNzY1Y2QyNTAwOTY2ODEwMDAwMGY4N2UyNGFmZDg5NTkxNmExMDFkY2E1ZjRmMjc2MjkwYmY3YSIsImludGVybmFsX3NlY3JldCI6IjY3MjU2NGE1LTYzMjctNDBlZC04MGNlLTY4OTkyZWUxNWRhMiJ9.OsM55GpS5GRIPCGyd9lYSqFqlee6d7RUPQ1YL80-05Y`,
}).$extends(withAccelerate());

const mySecret = "mySecret";



userRouter.post('/signup', async c => {
    // console.log(c);
    
    const body : validBody = await c.json();
    console.log(body);
    const res1 = await prisma.user.findFirst({
        where: {
            email : body.email
        },
        select : {
            email : true
        }
    });
    // console.log(res1);
    if(res1 !== null){
        const obj = {
            msg : "User already exists."
        };
        return new Response (JSON.stringify(obj),{
            status : 200,
        })
    }

    try{
        const res2 = await prisma.user.create({
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
    const body : validBody = await c.json();
    // console.log(c.env?.DATABASE_URL);
    console.log(body);
    const res1 = await prisma.user.findFirst({
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
    const token = await sign(body, mySecret);
    const obj = {
        msg : "success",
        token : token
    };
    return new Response (JSON.stringify(obj),{
        status : 200,
    })
     
});
export default userRouter;