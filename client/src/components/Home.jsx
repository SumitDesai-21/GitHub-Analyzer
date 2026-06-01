    import { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    const Home = () => {
    const [userName, setUserName] = useState('');
    // const [profileData, setProfileData] = useState([]);
    // use nagivate
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setUserName(e.target.value);
    } 
    const handleClick = () =>{  
        if(userName.trim() !== ''){
        // const response = fetch(`https://api.github.com/users/${userName}`);
        // if(!response.ok) throw new Error('User not found.');
        // setProfileData(response.json());
            navigate(`/profile/${userName}`);
        }   
        else alert('Please enter a GitHub username.');
    }

    return (
        <div className='flex min-h-screen items-center justify-center p-6'>
        <div className='mx-auto w-full max-w-175 rounded-[10px] bg-white p-7.5 shadow-lg'>
            <h1 className='mb-3.75 text-[28px] text-blue-500 font-bold'>GitHub Profile Analyzer</h1>
            <br />
            <div className='mb-3.75 flex justify-center gap-5'>
            <input
                className='h-11 w-3/4 rounded-[5px] border-2 border-black bg-gray-100 p-2.5 text-left text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-300'
                type="text"
                value={userName}
                onChange={handleChange}
                placeholder='Enter GitHub Username'
            />
            <button onClick={handleClick} className='h-11 w-25 shrink-0 cursor-pointer rounded-[5px] bg-blue-500 px-3.75 font-bold text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700'>
                Search
            </button>
            </div>
        </div>
        </div>
    )
    }


    export default Home
