import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Friend from './Friend';
import { setNotFriends } from '../../state';

function UsersLists() {
  const user =useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const render = useSelector((state) => state.auth.render);

  const dispatch=useDispatch();

  const [Users,setUsers]=useState(null);
    
 
  const GetNotUsers = async () => {
    try {
      // Make a GET request to fetch the post
      const response = await fetch(`${render}/user/${user._id}/users`, {
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
      dispatch(setNotFriends({ notfriends: data }));

      setUsers(data);
     
      

  
      // If data exists and the first post has a picturePath, set it
      
    } catch (error) {
      // Handle errors and log the error message
      console.error("Error fetching post:", error.message);
    }}
    useEffect(()=>{
        GetNotUsers();
    },[]);
  return (
    <>
   
    {Users ? user.notfriends.map((user) => (

  <Friend userId={user._id} firstName={user.firstName} lastName={user.lastName} key={`non-friend-${user._id}`} />
)):null}
    </>
  )
}

export default UsersLists