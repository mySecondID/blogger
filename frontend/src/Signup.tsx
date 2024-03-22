import { EventHandler, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { REACT_APP_BACKEND_URL } from "./config";


export default function Signup(){
    const [name, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center">
            <div className = "text-3xl p-3 m-3">SignUp</div>
            <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter name" onChange = {(e: EventHandler) => setUsername(e.target.value)}></input>
            <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter password" onChange = {(e: EventHandler) => setPassword(e.target.value)}></input>
            <input className = "border border-black rounded-lg p-2 m-2" placeholder = "Enter Email" type = "email" onChange = {(e: EventHandler) => setEmail(e.target.value)}></input>
            <button 
            className="border border-black bg-black text-white hover:text-black hover:bg-white m-2 p-3 rounded-lg"onClick = {async () => {
                try{
                    const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/user/signup`, {
                        name : name,
                        password : password,
                        email : email
                    });
                    const body = response.data;
                    console.log(body);
                    navigate(`/user/${Cookies.get('id')}`);
                }catch(err){
                    console.log("error: ", err);
                }
            }}>Sign Up</button>
        </div>
    );
}