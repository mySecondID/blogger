import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./NavBar";
import { REACT_APP_BACKEND_URL } from "../config";

const PostSchema = z.object({
    title : z.string().min(10).max(50),
    content : z.string().min(10).max(500)
})

export default function NewPost(){
    let [title, setTitle] = useState("");
    let [content, setContent] = useState( "");
    let [file, setFile] = useState<File | string>();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = PostSchema.safeParse({title : title, content : content});
        console.log(res);
        if(!res.success){
            alert("Limits not followed!");
        }else{   
            try {
                const formData = new FormData();
                if (file) {
                    formData.append('file', file);
                }
                formData.append('title', title);
                formData.append('content', content);
                formData.append('id', `${Cookies.get('id')}`);
                formData.append('token', `${Cookies.get('token')}`);

                const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/blog/`, formData, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });

                const body = await response.data;
                console.log(body);
                navigate(`/blog/${body.id}`);
            } catch (err) {
                console.log(err);
                alert("error");
            }
        }
    };


    return (
        <div>
        <NavBar />
        <div className="flex flex-col sm:justify-center">
            <div className="text text-3xl m-5 font-bold">New Post</div>
            <input className = "font-bold border border-none rounded-lg p-2 mx-5 text-3xl" placeholder = "Enter title (10 - 50 chars)" onChange = {(e: any) => setTitle(e.target.value)} />
            <textarea className = "text max-w-screen-md border border-none rounded-lg p-2 m-2 mx-5" placeholder = "Enter content (10 - 300 chars)" onChange = {(e: any) => setContent(e.target.value)} />
            <div className="grid justify-center">
                <input className="m-3" 
                    type="file"
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                            file = selectedFile;
                            setFile(file)
                        }
                    }}
                />
            </div>
            <button 
            className="border border-black bg-black text-white hover:text-black hover:bg-white m-2 p-3 rounded-lg"
            type="submit"
            onClick = {handleSubmit}>Make a Post!!</button>
        </div>
        </div>
    )
}