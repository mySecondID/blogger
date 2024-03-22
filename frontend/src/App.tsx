import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import NavBar from "./NavBar";
import Card from "./Card";
import { REACT_APP_BACKEND_URL } from "./config";

function App() {
  const navigate = useNavigate();
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    if(!Cookies.get('token')){
      navigate('/login');
    }else{
      // console.log(REACT_APP_BACKEND_URL);
      try{
        axios.get(`${REACT_APP_BACKEND_URL}/api/v1/blog/bulk`, {
          headers:{
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }).then(res => {
          console.log(res.data);
          setPosts(res.data)
        });
      }catch(err){

        navigate("/login");
      }
    }
  }, []);

  return (
    <div className="">
      <NavBar />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {
        posts.map((ele : {title : string, content : string, id : string, time: string}, index) => (
            <Card key = {index} title = {ele.title} content = {ele.content} link = {ele.id} time_stamp = {ele.time} />
        ))
      }
      </div>
    </div>
  );
}

export default App
