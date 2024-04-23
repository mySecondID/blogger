
// import { z } from 'zod'

// const userSchema = z.object({
//     username : z.string().min(5).max(15),
//     password : z.string(),
//     email ?: z.string().email()
// });

// interface User{
//     password : string, 
//     email : string
// };

// app.use((req, res, next) => {
//     const body : User = await c.json();
//     const response = userSchema.safeParse(body);
//     if(!response.success){
//         return json{

//         }
//     }
// });