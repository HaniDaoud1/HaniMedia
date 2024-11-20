import React from 'react';
import UserWidget from '../widgets/UserWidget';
import { useSelector } from 'react-redux';
import FriendsList from '../widgets/FriendsList';
import UsersLists from '../widgets/usersLists';

function AllUsers({userId}) {
  const user = useSelector((state) => state.auth.user);
  userId=user.id;
  const mode = useSelector((state) => state.auth.mode);
  const { _id } = useSelector((state) => state.auth.user || {}); // Accessing user within auth slice
const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-950';

   


  return (
    <> <div className={` min-h-screen ${color} `}><div  className={` flex sm:flex-row flex-col justify-evenly  p-0 min-[950px]:w-[80%]  mx-auto    `}>
      <div className=' sm:w-[100%]  mx-1  '>
      <UserWidget userId={_id} profile={false}/>
      
      <FriendsList userId={user._id}/>
      <UsersLists userId={user._id}/></div>
     </div>
      </div>
    </>
  );
}
export default AllUsers;