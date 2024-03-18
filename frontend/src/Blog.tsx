import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import NavBar from "./NavBar";

export default function Blog(){
    const authorID = useParams().id;
    let [content, setContent] = useState([{
        title: "loading",
        content: "loading",
        time_stamp: "loading",
        id: "loading"
    }]);
    useEffect(() => {
        console.log(`http://localhost:8787/api/v1/blog/bulk/${authorID}`)
        axios.get(`http://localhost:8787/api/v1/blog/bulk/${authorID}`, {
            headers:{
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then(res => {
            if(!res){
                console.log("chud gaya");
            }else{
                console.log(res.data);
                content = res.data;
                setContent(res.data);
            }
        })
    }, []);
    return(
        <>
            <NavBar />
            <div className="flex-col justify-between">
                {
                    content.map((ele : {title : string, content : string, id : string, time: any}, index) => (
                        <Card key = {index} title = {ele.title} content = {ele.content} link = {ele.id} time_stamp = {ele.time} />
                    ))
                }
            </div>
        </>
    )
}