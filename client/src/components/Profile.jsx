import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { userName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleClick = async () => {
    if (query.trim() !== '') {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/analyze`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            profileData,
            repoData,
          })
        }
      )
      const data = await response.json();

      setAiResponse(data.data);
      setLoading(false);
    }
    else alert('Please enter a query.')
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `https://api.github.com/users/${userName}`
      );

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      
      setProfileData(data);
    };

    const fetchRepos = async () => {
      const response = await fetch(
        `https://api.github.com/users/${userName}/repos`
      );

      if (!response.ok) {
        throw new Error('Error fetching repositories');
      }

      const repos = await response.json();
      setRepoData(repos);
    };

    fetchProfile();
    fetchRepos();
  }, [userName]);

  if (!profileData) {
    return <h1>Loading...</h1>;
  }

  return (
    // profile
    <div className='flex min-h-screen justify-center p-6'>
      <div className='mt-2 flex w-full max-w-175 flex-col items-center rounded-[10px] bg-[#f1f3f5] p-5'>
        <img
          className='w-30 rounded-full border-[3px] border-blue-500'
          src={profileData.avatar_url}
          alt={profileData.login}
        />
        <p className='font-bold'>{profileData.name || "N/A"}</p>
        <p className='font-bold'>Username: <span className='font-normal'>{profileData.login}</span></p>
        <p className='font-bold'>Bio: <span className='font-normal'>{profileData.bio || "N/A"}</span></p>
        <p className='font-bold'>Location: <span className='font-normal'>{profileData.location || "N/A"}</span></p>
        <p className='font-bold'>Followers: <span className='font-normal'>{profileData.followers}</span></p>
        <p className='font-bold'>Following: <span className='font-normal'>{profileData.following}</span></p>
        <p className='font-bold'>Public Repos: <span className='font-normal'>{profileData.public_repos}</span></p>
        <a className='text-blue-900 underline decoration-blue-900' href={`https://github.com/${profileData.login}`} target='_blank'>View GitHub Profile</a>

        <br />
        {/* repositories */}
        <div className='mt-5 flex w-full flex-col gap-5'>
          {repoData.map(repo => (
            <div
              key={repo.id}
              className='rounded-[5px] border-l-[5px] border-blue-500 bg-[#f8f9fa] p-3 pl-8'
            >
              <div>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noreferrer'
                  className='font-bold text-blue-500'
                >
                  {repo.name}
                </a>

                <p>{repo.description || 'No description available.'}</p>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div className='mt-5 mb-3.75 flex justify-center gap-5'>
          {/*AI Integration */}
          <input
            className='pl-10 w-125 rounded-[5px] border-2 border-black bg-gray-100 py-2.5 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-300'
            type="text"
            onChange={handleChange}
            placeholder='Ask AI about this profile'
          />
          <button disabled={loading} rel="noopener noreferrer" onClick={handleClick} className='h-10 w-25 shrink-0 cursor-pointer rounded-[5px] bg-blue-500 px-3.75 font-bold text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700'>
            Ask AI
          </button>
        </div>
        <br />  
        {/* AI reponse */}
        <div className='bg-[#f8f9fa] p-3 mt-2.5 rounded-[5px]'>
          {loading? "Thinking..." : aiResponse}
        </div>
      </div>
    </div>
  );
};

export default Profile;