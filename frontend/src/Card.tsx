import { useNavigate } from "react-router-dom";

interface CardProps {
    title: string;
    content: string;
    link : string;
}

export default function Card({title, content, link} : CardProps){
    const navigate = useNavigate();
    return (
        <div className="border m-5 p-5" onClick={
            () => {
                navigate(`/blog/${link}`);
            }
        }>
            <div className="text text-3xl">
                {title}
            </div>
            <div>{content}</div>
        </div>
    )
}