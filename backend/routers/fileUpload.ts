import { PrismaClient } from '@prisma/client/scripts/default-index.js';
import { Hono } from 'hono'

const uploader = new Hono<{
  Bindings: {
    MY_BUCKET: R2Bucket
	}, Variables : {
        prisma : PrismaClient
    }
}>();


uploader.get('/getPicture', async c => {
  const key = c.req.header("pictureKey");
  if(key){
    const res = await c.env.MY_BUCKET.get(key)
    console.log(res);
    return c.json({
      msg: "loaded"
    })
  }else{
    return c.json({
      msg: "not found"
    })
  }
  
});


uploader.post('/fileupload', async (c) => {
  const body = await c.req.parseBody()
  console.log("file", body) 
  if(!body || !body['file']){
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