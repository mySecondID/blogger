import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export default function Post(){
    const id = useParams().id;
    let [content, setContent] = useState({
        title : "loading",
        content : "loading"
    });
    useEffect(() => {
        function x(){
            async function get(){
                try{
                    const res = await axios.get(`http://localhost:8787/api/v1/blog/${id}`, {
                        headers: {
                            'Authorization' : `Bearer ${Cookies.get('token')}`
                        }
                    });
                    console.log(res.data);
                    content = res.data;
                    setContent(res.data);
                }catch(err){
                    alert("error");
                }
            }
            get();
        }
        x();
    }, []);
    return (
        <div className="p-5 m-5">
            <div className="text text-3xl p-5 m-5">
                {content.title}
            </div>
            <div className="text text-2xl p-5 m-5">
                {content.content}
            </div>
        </div>
    )
}