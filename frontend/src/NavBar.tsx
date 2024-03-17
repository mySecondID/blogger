import logo from './assets/react.svg';
import dummy_pfp from './assets/dummy-pic.png'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavBar(){
    const navigate = useNavigate();

    return (
        <div className="flex justify-between p-2 m-2 border-black">
            <img src = {logo} />
            <div className="flex">
                <div className='px-10'>
                    <button className='bg-green-700 text-white px-5 p-3 rounded-full' onClick={() => {
                        navigate(`/newPost`);
                    }}> 
                        + 
                    </button>    
                </div>  
                <div className = "px-5">
                    <img className='object-cover w-16 h-16' src = {dummy_pfp} 
                    onClick={() => {
                        navigate(`/blog/${Cookies.get('id')}`);                    
                    }} />
                </div>
                <div>
                    <button className='px-5 p-3 border border-black rounded-lg hover:bg-black hover:text-white'>
                        Logout 
                    </button>
                </div>
            </div>
        </div>
    );
}