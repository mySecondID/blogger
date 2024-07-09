import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
    title: string;
    content: string;
    link : string;
    time_stamp : string;
}



export default function Card({title, content, time_stamp, link} : CardProps){
    const navigate = useNavigate();
    let [content1, setContent] = useState("");
    
    useEffect(() => {
        if(content.length > 20)
            content = content.substring(0, 30) + "    .....";
        content1 = content
        setContent(content)
    }, [])
    return (
        <div className="border hover:bg-slate-100 m-4 p-5 rounded-md" onClick={
            () => {
                navigate(`/blog/${link}`);
            }
        }>
            <div className="text text-3xl font-bold">
                {title}
            </div>
            <div className="font-extralight text-xs py-1">
                {time_stamp}
            </div>
            <div className="py-2 font-sans">
                {content1}
            </div>
        </div>
    )
}