import React from 'react';
import UserWidget from '../widgets/UserWidget';
import { useSelector } from 'react-redux';
import PostsWidgets from '../widgets/PostsWidgets';
import Post from '../widgets/Post';
import Posts from '../widgets/Posts';
import Friend from '../widgets/Friend';
import WidgetBox from '../../components/WidgetBox'
import UserImage from '../../components/WidgetBox';
import FriendsList from '../widgets/FriendsList';
import UsersLists from '../widgets/usersLists';

function HomePage() {
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  const render = useSelector((state) => state.auth.render);
  const { _id } = useSelector((state) => state.auth.user || {}); // Accessing user within auth slice
const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-950';
  return (
    <> <div className={`${color} min-h-screen  `}><div  className={` flex sm:flex-row flex-col justify-evenly  p-0 min-[950px]:w-[80%]  mx-auto    `}>
      <div className=' sm:w-[100%]  mx-1  '>
      <UserWidget userId={_id} profile={false}/>
      <PostsWidgets  />
      <div className='max-sm:hidden'>
      <FriendsList />
      <UsersLists /></div></div>
      <div className=' sm:w-[100%] mx-1 min-[1000px]:mx-5  '>
      
      <Posts userId={_id} /></div></div>
      </div>
    </>
  );
}

export default HomePage;