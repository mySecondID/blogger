import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import NavBar from "./NavBar";
import Loading from "./Loading";
import { REACT_APP_BACKEND_URL } from "./config";

export default function Blog(){
    const authorID = useParams().id;
    const navigate = useNavigate();
    let [content, setContent] = useState([]);
    let [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
    //     console.log(`http://localhost:8787/api/v1/blog/bulk/${authorID}`)
        
            axios.get(`${REACT_APP_BACKEND_URL}/api/v1/blog/bulk/${authorID}`, {
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
                    isLoading = false;
                    setLoading(false);
                }
            }).catch(err =>{
                console.log(err)
                navigate('/')
            }
            )
    }, []);
    return(
        <div>
            <NavBar />
            {
                isLoading ? 
                    <Loading />
                :
                   <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {
                        content.map((ele : {title : string, content : string, id : string, time: string}, index) => (
                            <Card key = {index} title = {ele.title} content = {ele.content} link = {ele.id} time_stamp = {ele.time} />
                        ))
                    }    
                    </div>
            }
        </div>
    )
}