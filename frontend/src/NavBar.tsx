import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavBar(){
    const navigate = useNavigate();

    return (
        <>
        <div className="flex justify-between px-3 py-2 border border-stale-200 bg-neutral-100">
            <div className='text font-medium text-3xl py-1 hover:text-neutral-400' onClick={() => {
                navigate('/')
            }}>
                Blogger
            </div>
            <div className="flex">
                <div className='px-3'>
                    <button onClick={() => {
                        navigate(`/newPost`);
                    }}className='py-2 px-5 border border-black rounded-md hover:bg-neutral-200'>
                        Add post 
                    </button>
                    
                </div>  
                <div className = "px-5">
                    <button onClick={() => {
                        navigate(`/blogs/${Cookies.get('id')}`);                    
                    }}  className='py-2 px-5 border border-black rounded-md hover:bg-neutral-200'>
                        Profile 
                    </button>
                </div>
                <div>
                    <button className='py-2 px-5 border border-black rounded-md hover:bg-neutral-400'
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
        </>
    );
}