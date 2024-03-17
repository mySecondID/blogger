import { useNavigate } from "react-router-dom";

interface CardProps {
    title: string;
    content: string;
    link : string;
    time_stamp : string;
}

export default function Card({title, content, time_stamp, link} : CardProps){
    const navigate = useNavigate();
    return (
        <div className="border m-5 p-5 md:w-1/3" onClick={
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
            <div>
                {content}
            </div>
        </div>
    )
}