import {Hono} from 'hono'
import { Router } from 'itty-router'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import userRouter from './userRouter'
import blogRouter from './blogRouter'
// import auth from '../middleware/auth'

import * as dotenv from 'dotenv';
dotenv.config();

const mySecret = "mySecret";

const app = new Hono()
const mainRouter = Router()

interface validBody{
    name ?: string, 
    password: string,
    email : string,
};


const prisma = new PrismaClient({
    datasourceUrl: `prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmI4N2JmMTYtNzc2Mi00ZTEzLTk5NzktNTNiNjdjZjY0MmNjIiwidGVuYW50X2lkIjoiNzdiOTFiYzVjNzY1Y2QyNTAwOTY2ODEwMDAwMGY4N2UyNGFmZDg5NTkxNmExMDFkY2E1ZjRmMjc2MjkwYmY3YSIsImludGVybmFsX3NlY3JldCI6IjY3MjU2NGE1LTYzMjctNDBlZC04MGNlLTY4OTkyZWUxNWRhMiJ9.OsM55GpS5GRIPCGyd9lYSqFqlee6d7RUPQ1YL80-05Y`,
}).$extends(withAccelerate());





app.mount('/blog', blogRouter.handle)

// mainRouter.post('/blog', async c => {
//     const body = await c.json();    
//     // console.log("yaha pe", body)

//     const obj = {
//         msg : "success"
//     };
//     return new Response (JSON.stringify(obj),{
//         status : 200,
//     })
     
// });


// mainRouter.put('/blog/', c => {
//     console.log(c);
//     const obj = {
//         msg : "success"
//     };
//     return new Response (JSON.stringify(obj),{
//         status : 200,
//     })
     
// });



// mainRouter.get('/blog/:id', c => {
//     console.log(c);
//     const obj = {
//         msg : "success"
//     };
//     return new Response (JSON.stringify(obj),{
//         status : 200,
//     })
     
// });


// mainRouter.get('/blog/bulk', c => {
//     console.log(c);
//     const obj = {
//         msg : "success"
//     };
//     return new Response (JSON.stringify(obj),{
//         status : 200,
//     })
     
// });


export default mainRouter;