import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { REACT_APP_BACKEND_URL } from "./config";
import f from "./titleSkeleton";

export default function Post(){
    const id = useParams().id;
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true); 
    let [content, setContent] = useState({
        title : "loading",
        content : "loading",
        time: "",
        authorId: ""
    });
    useEffect(() => {
            axios.get(`${REACT_APP_BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            }).then(res => {
                console.log(res.data);
                content = res.data;
                setContent(res.data);
                loading = false;
                setLoading(false);
            }).catch(err => {
                alert(err.response.data.msg);
            });
    }, []);
    if(loading){
        return <div>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 50"
            width="200"
            height="50"
            >
            <rect x="0" y="0" width="200" height="50" fill="#f0f0f0" />

            <rect x="20" y="20" width="160" height="10" rx="5" fill="#e0e0e0">
                <animate
                attributeName="width"
                values="20; 160; 20"
                dur="2s"
                repeatCount="indefinite"
                />
            </rect>
            </svg>
        </div>
    }
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
                <div className="p-5 m-5">
                    <button className="mx-2 border border-black p-1 px-4 rounded-md hover:bg-black hover:text-white"
                        onClick={() => {
                            const token = Cookies.get('token');
                            axios.post(`${REACT_APP_BACKEND_URL}/api/v1/verifyPost`,{
                                token: token,
                                postID: id
                            }).then(res => {
                                if(res.status !== 200){
                                    alert("You are authorized to do so.")
                                }else{
                                    navigate(`/edit/${id}`);
                                }
                            }).catch(err =>{
                                console.log(err);
                                alert("some error occured");
                            });
                        }}
                    >
                    Edit
                    </button>
                    <button className="border border-black p-1 px-4 rounded-md hover:bg-black hover:text-white"
                        onClick={() => {
                            const token = Cookies.get('token');
                            let verified = false;
                            axios.post(`${REACT_APP_BACKEND_URL}/api/v1/verifyPost`,{
                                token: token,
                                postID: id
                            }).then(res => {
                                if(res.status !== 200){
                                    alert("You are authorized to do so.")
                                    navigate(`/`);
                                    verified = false;
                                }
                            }).catch(err =>{
                                console.log(err);
                                verified = false;
                                alert("some error occured");
                            });
                            if(verified){
                            axios.post(`${REACT_APP_BACKEND_URL}/api/v1/blog/delete`, {
                                postID: id
                            },{
                                headers:{
                                    Authorization: `Bearer ${token}`
                                }
                            }
                            ).then(res => {
                                    if(res.status !== 200){
                                        alert("some error occured");
                                    }else{
                                        navigate(`/`);
                                    }
                                }).catch(err => {
                                    alert("some error occured")
                                    console.log(err)
                                })
                            }}
                    }
                    >
                    Delete
                    </button>
                </div>
            </div>
        </div>
    )
}