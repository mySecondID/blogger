import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMemo, useState } from "react";
import Card from "./Card";
import NavBar from "./NavBar";

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
        }catch(err){
            alert("error");
        }
    }, []);
    return(
        <>
            <NavBar />
            <div className="flex-col justify-between">
                {
                    content.map((ele : {title : string, content : string, id : string, time_stamp : string}, index) => (
                        <Card key = {index} title = {ele.title} content = {ele.content} link = {ele.id} time_stamp = {time_stamp} />
                    ))
                }
            </div>
        </>
    )
}