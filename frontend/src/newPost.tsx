import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./NavBar";

const PostSchema = z.object({
    title : z.string().min(10).max(50),
    content : z.string().min(10).max(200)
})

export default function NewPost(){
    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    const navigate = useNavigate();

    return (
        <div>
        <NavBar />
        <div className="flex flex-col sm:justify-center sm:items-center">
            <div className="text text-3xl m-5">New Post</div>
            <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter title" onChange = {(e: any) => setTitle(e.target.value)} />
            <textarea rows = {15} cols = {20} className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter content" onChange = {(e: any) => setContent(e.target.value)} />
            <button 
            className="border border-black bg-black text-white hover:text-black hover:bg-white m-2 p-3 rounded-lg"
            onClick = {async () => {
                const res = PostSchema.safeParse({title : title, content : content});
                console.log(res);
                if(!res.success){
                    alert("Limits not followed!");
                }else{
                    try{
                        const response = await axios.post("http://localhost:8787/api/v1/blog/", 
                        {
                            title : title,
                            content : content,
                            id : Cookies.get('id'),
                            
                        },
                        {
                            headers: {
                                Authorization : `Bearer ${Cookies.get('token')}`
                            }
                        });
                        const body = await response.data;
                        console.log(body);
                        navigate(`/blog/${body.id}`);
                    }catch(err){
                        alert("error");
                    }
                }
            }}>Make a Post!!</button>
        </div>
        </div>
    )
}