import React from 'react';
import UserWidget from '../widgets/UserWidget';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../state';


import Posts from '../widgets/Posts';

function ProfilePage() {
  const navigate=useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user object from Redux stateconsole.log(_id);
  const { _id } = user; // Destructure _id after confirming user is not null
  console.log(_id);
  console.log(user);
  const mode = useSelector((state) => state.auth.mode);
      

    const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-950';

  return (
    <><div className={` ${color} min-h-screen  py-2 flex sm:flex-row flex-col   p-0 min-[950px]:w-[80%]  mx-auto `}>
      <div className='sm:w-[55%]  mx-1 '>
      <UserWidget userId={_id} profile={false} />
      </div>
     <div className='flex flex-col sm:w-[50%]'>
      <Posts userId={_id} isProfile={true}/>
      </div>
      </div>
    </>
  );
}

export default ProfilePage;