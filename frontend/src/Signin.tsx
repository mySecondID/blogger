import React, { EventHandler, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

export default function Signin(){
    const [name, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Signin</h1>
            <input placeholder = "Enter name" onChange = {(e: EventHandler) => setUsername(e.target.value)}></input>
            <input placeholder = "Enter password" onChange = {(e: EventHandler) => setPassword(e.target.value)}></input>
            <input placeholder = "Enter Email" type = "email" onChange = {(e: EventHandler) => setEmail(e.target.value)}></input>
            <button onClick = {async () => {
                try{
                    const response = await axios.post("http://localhost:8787/api/v1/user/signin", {
                        name : name,
                        password : password,
                        email : email
                    });
                    const body = response.data;
                    if(response.status !== 200){
                        alert(body.msg);
                    }else{
                        Cookies.set('token', body.token);
                        Cookies.set('id', body.id);
                        navigate("/blogs/" + body.id);
                    }
                    console.log(body);
                }catch(err){
                    alert("error");
                }
            }}>Submit</button>
        </div>
    );
}