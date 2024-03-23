import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { REACT_APP_BACKEND_URL } from "./config";

export default function Post(){
    const id = useParams().id;
    let [content, setContent] = useState({
        title : "loading",
        content : "loading",
        time: "",
        authorId: ""
    });
    useEffect(() => {
        try{
            axios.get(`${REACT_APP_BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            }).then(res => {
                console.log(res.data);
                content = res.data;
                setContent(res.data);
            });
        }catch(err){
            alert("error");
        }
    }, []);
    return (
        <div>
            <NavBar />
            <div className="p-5 m-5">
                <div className="text text-3xl p-5 m-5 md:w-2/3 font-bold">
                    {content.title}
                </div>
                <div className="px-5 mx-5 font-mono">
                    {content.time}
                </div>
                
                <div className="text p-5 m-5 md:w-2/3">
                    {content.content}
                </div>
            </div>
        </div>
    )
}