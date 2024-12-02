import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Friend from './Friend';
import { setFriends } from '../../state';

function FriendsList() {
  const user =useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
  const[User,setUser]=useState([]);
  const token = useSelector((state) => state.auth.token);
  const render = useSelector((state) => state.auth.render);


    
  const GetUser = async () => {
    try {
      // Make a GET request to fetch the post
      const response = await fetch(`${render}/user/${user._id}/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
      }
  
      // Parse the JSON data from the response
      const data = await response.json();
      setUser(data);
      dispatch(setFriends({ friends: data }));

  
      // If data exists and the first post has a picturePath, set it
      
    } catch (error) {
      // Handle errors and log the error message
      console.error("Error fetching post:", error.message);
    }}
    useEffect(()=>{
      GetUser();
    },[]);
    const mode = useSelector((state) => state.auth.mode);
      
  
  


    
    const color2 = mode === 'blanc' ? 'text-slate-700' : 'text-slate-200';
  return (
    <>

    {user.friends.length !==0 ?(<h1 className={`mt-2 font-bold text-xl bg-green-950 rounded-lg`}>Friends:</h1>):null}
    {user.friends ? user.friends.map((friend) => (
  <Friend userId={friend._id} firstName={friend.firstName} lastName={friend.lastName} key={`friend-${friend._id}`} />
)):null}
<h1 className="mt-2 font-bold text-xl bg-green-950 rounded-lg">Users:</h1>

    </>
  )
}

export default FriendsList