import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import Card from "./Card";
import NavBar from "./NavBar";

export default function Blog(){
    const authorID = useParams().id;
    const navigate = useNavigate();
    let [content, setContent] = useState([]);
    useEffect(() => {
    //     console.log(`http://localhost:8787/api/v1/blog/bulk/${authorID}`)
        
            axios.get(`http://localhost:8787/api/v1/blog/bulk/${authorID}`, {
            headers:{
                Authorization: `Bearer ${Cookies.get('token')}`
            }
            }).then(res => {
                if(!res){
                    navigate('/login')
                }else{
                    console.log(res.data);
                    content = res.data;
                    setContent(res.data);
                }
            }).catch(err =>
                navigate('/')
            )
    }, []);
    return(
        <div>
            <NavBar />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    <Suspense fallback = "loading" >
                    {
                        content.map((ele : {title : string, content : string, id : string, time: string}, index) => (
                            <Card key = {index} title = {ele.title} content = {ele.content} link = {ele.id} time_stamp = {ele.time} />
                        ))
                    }    
                    </Suspense>
                </div>
        </div>
    )
}