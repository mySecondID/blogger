import React, { EventHandler, useState } from "react";
import axios from "axios"

export default function Signin(){
    const [name, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

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
                    console.log(body);
                }catch(err){
                    console.log("error: ", err);
                }
            }}>Submit</button>
        </div>
    );
}