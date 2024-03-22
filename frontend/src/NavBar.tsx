import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavBar(){
    const navigate = useNavigate();

    return (
        <div className="flex justify-between px-3 py-2 border border-stale-200 bg-sky-100">
            <div className='text text-3xl p-2 hover:text-blue-400' onClick={() => {
                navigate('/')
            }}>
                Blogger
            </div>
            <div className="flex">
                <div className='px-5'>
                    <button onClick={() => {
                        navigate(`/newPost`);
                    }}className='px-5 py-3 border border-black rounded-md hover:bg-blue-200 hover:border-slate-100'>
                        Add post 
                    </button>
                    
                </div>  
                <div className = "px-5">
                    <button onClick={() => {
                        navigate(`/blogs/${Cookies.get('id')}`);                    
                    }}  className='px-5 p-3 border border-black rounded-md hover:bg-blue-200 hover:border-slate-100'>
                        Profile 
                    </button>
                </div>
                <div>
                    <button className='px-5 p-3 border border-black rounded-md hover:bg-blue-200 hover:border-slate-100'
                    onClick={() => {
                       Cookies.remove('id'); 
                       Cookies.remove('token'); 
                       navigate('/login')
                    }}>
                        Logout 
                    </button>
                </div>
            </div>
        </div>
    );
}