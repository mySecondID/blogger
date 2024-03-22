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
    // const dateTime = time_stamp;

    // const dateRegex = /(\d{4}-\d{2}-\d{2})/;
    // const timeRegex = /T(\d{2}:\d{2}:\d{2})/;

    // const dateMatch = dateTime.match(dateRegex);
    // const timeMatch = dateTime.match(timeRegex);
    // const [date, setDate] = useState<string>();
    // const [time, setTime] = useState<string>();
    // useEffect( () => {
    //     if (dateMatch) {
    //         setDate(dateMatch[1]) 
    //     }

    //     if (timeMatch) {
    //         setTime(timeMatch[1])  
    //     }
    // }, []);
    let [content1, setContent] = useState("");
    useEffect(() => {
        if(content.length > 20)
            content = content.substring(0, 30) + "    .....";
        content1 = content
        setContent(content)
    }, [])
    return (
        <div className="border hover:bg-slate-100 m-3 p-5" onClick={
            () => {
                navigate(`/blog/${link}`);
            }
        }>
            <div className="text text-3xl">
                {title}
            </div>
            <div>
                {time_stamp}
            </div>
            <div className="py-2">
                {content1}
            </div>
        </div>
    )
}