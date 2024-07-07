import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import { Hono } from 'hono'

const uploader = new Hono<{
  Bindings: {
    MY_BUCKET: R2Bucket
	}, Variables : {
        prisma : PrismaClient
    }
}>();



uploader.post('/fileupload', async (c) => {
  const body = await c.req.parseBody()
  console.log("file", body) 
  if(!body || !body['myfile']){
    c.status(400);
    return c.json({
      "message": "no file found"
    })
  }
  try{
    const res = await c.env.MY_BUCKET.put(`${body['name'] || ""}${new Date().getTime()}`, body['myfile'])
    console.log(res);
    
    c.status(200);
    return c.json({
      "message": "received"
    })
    
  }catch(err){
    console.log("error in uploader", err);
  }
})

export {uploader}