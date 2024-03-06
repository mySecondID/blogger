import {Hono} from 'hono'
import { Router } from 'itty-router'
const app = new Hono()
const blogRouter = Router()


blogRouter.post('/', c => {
    console.log(c);
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