import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./NavBar";
import { REACT_APP_BACKEND_URL } from "./config";


const PostSchema = z.object({
    title : z.string().min(10).max(50),
    content : z.string().min(10).max(500)
})

export default function EditPost(){
    let [title, setTitle] = useState("loading...");
    let [content, setContent] = useState( "loading...");
    const navigate = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        axios.get(`${REACT_APP_BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }
        }).then(res => {
            console.log(res.data);
            content = res.data.content;
            setContent(res.data.content);
            title = res.data.title;
            setTitle(res.data.title);
        }).catch(err => {
            alert(err.response.data.msg);
        });
    }, []);

    return (
        <div>
        <NavBar />
        <div className="flex flex-col sm:justify-center">
            <div className="text text-3xl m-5 font-bold">Edit Post</div>
            <input className = "border border-black rounded-lg p-2 mx-5" placeholder = "Enter title (10 - 50 chars)" onChange = {(e: any) => {setTitle(e.target.value);}} value = {title} />
            <textarea rows = {15} cols = {40} className = "border border-black rounded-lg p-2 m-2 mx-5" placeholder = "Enter content (10 - 300 chars)" onChange = {(e: any) => {setContent(e.target.value);}} value = {content} />
            <button 
            className="border border-black bg-black text-white hover:text-black hover:bg-white m-2 p-3 rounded-lg"
            onClick = {async () => {
                const res = PostSchema.safeParse({title : title, content : content});
                console.log(res);
                if(!res.success){
                    alert("Limits not followed!");
                }else{
                        axios.put(`${REACT_APP_BACKEND_URL}/api/v1/blog/`, 
                            {
                                postID: id,
                                id: Cookies.get('id'),
                                title : title,
                                content : content,
                                token : Cookies.get('token')
                            }    
                            ,{
                                headers: {
                                    Authorization : `Bearer ${Cookies.get('token')}`,
                                    postID: id
                                }
                            }    
                        ).then(res => {
                            if(res.status === 200){
                                console.log(res);
                                navigate('/');
                                // title = res.title;
                                // content = res.content;
                            }
                        }).catch(err => {
                            console.log(err);
                            alert('some trouble took place');
                            navigate('/')
                        })
                   
                }
            }}>Save Post!!</button>
        </div>
        </div>
    )
}