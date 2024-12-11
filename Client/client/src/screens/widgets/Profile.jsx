import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MessageCircle } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { MapPin } from 'lucide-react';
import UserWidget from './UserWidget';
import Posts from './Posts';
const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const render = useSelector((state) => state.auth.render);
  const profile=useSelector((state)=>state.auth.profile);

  const navigate=useNavigate();
  
  const mode = useSelector((state) => state.auth.mode);
      

    const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-950';

  return (
    <><div className={` ${color}  min-h-screen  mx-auto py-2 flex sm:flex-row flex-col    min-[950px]:px-10  `}>
      <div className='sm:w-[55%]  mx-1 '>
      <UserWidget userId={userId} profile={false} />
      </div>
     <div className='flex flex-col sm:w-[50%] mx-1'>
      <Posts userId={userId} isProfile={true}/>
      </div>
      </div>
    </>
  );
}


export default Profile; 