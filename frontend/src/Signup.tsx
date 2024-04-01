import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { REACT_APP_BACKEND_URL } from "./config";
// import Loading from "./Loading";



export default function Signup(){
    const [name, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    // let [isLoading, setLoading] = useState(true);

    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 h-screen bg-neutral-100">
            <div className= "hidden bg-neutral-800 lg:block text-white lg:flex lg:flex-col lg:justify-center lg:items-center">
                <div className="font-bold text-3xl m-5"> 
                    Welcome to Blogger!
                </div>
                <div className="text-1xl"> 
                    A space where you interact with others, share your ideas!
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <div className = "text-3xl p-5 m-3 text-neutral-800 font-bold">Sign Up</div>
                <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter name" onChange = {(e: any) => setUsername(e.target.value)}></input>
                <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter password" onChange = {(e: any) => setPassword(e.target.value)}></input>
                <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter Email" type = "email" onChange = {(e: any) => setEmail(e.target.value)}></input>
                <button 
                    className="border border-black bg-neutral-800 text-white hover:text-black hover:bg-white m-2 py-2 px-5 rounded-lg"onClick = {async () => {
                        axios.post(`${REACT_APP_BACKEND_URL}/api/v1/user/signup`, {
                            name : name,
                            password : password,
                            email : email
                        }).then(response => {
                            const body = response.data;
                            console.log(body);
                            Cookies.set('id', body.id);
                            navigate(`/login`);
                        }).catch(err => {
                            alert(err.response.data.msg);
                            console.log("error: ", err.response.data.msg);
                        });
                }}>Sign Up</button>
                <button 
                className="underline underline-offset-2 p-3"
                onClick = {() => {
                    navigate('/login');
                }}>Already have an account?</button>
            </div>
        </div>
    );
}