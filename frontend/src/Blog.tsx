import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMemo, useState } from "react";
import Card from "./Card";

export default function Blog(){
    const authorID = useParams().id;
    let [content, setContent] = useState([]);
    const response = useMemo(async () => {
        try{
            const res = await axios.get(`http://localhost:8787/api/v1/blog/bulk/${authorID}`, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            });
            console.log(res.data);
            content = res.data;
            setContent(res.data);
            // content.forEach(e => {
            //     console.log(e.title, e.content)
            // })
        }catch(err){
            alert("error");
        }
    }, []);
    return(
        <div>
            {
                content.map((ele, index) => (
                    <Card key = {index} title = {ele.title} content = {ele.content} link = {ele.id} />
                ))
            }
        </div>
    )
}