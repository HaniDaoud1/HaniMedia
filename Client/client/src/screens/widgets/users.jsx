import { useSelector, useDispatch } from "react-redux";
import UserWidget from "./UserWidget";
import { setFriends } from "../../state";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { UserRoundMinus } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';


const Users = ({ firstName, lastName, userId }) => {
  
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const render = useSelector((state) => state.auth.render);

  const [friendsIds, setFriendsIds] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [add,setAdd]=useState(true);
  const [userImg,setUserImg]=useState(null);

  const patchFriend = async () => {
    try {
      console.log("Fetching friends for user:", user._id);
      const response = await fetch(`${render}/user/${user._id}/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching friends: ${response.statusText}`);
      }

      const data = await response.json();
      setAdd((prevAdd) => !prevAdd);

      console.log("Fetched data:", data);
      setFriendsIds(data);
    } catch (error) {
      console.error("Error in patchFriend:", error.message);
    }
  };

  useEffect(() => {
    patchFriend();
  }, []);

  useEffect(() => {
    if (user?.friends) {
      const isFriend = user.friends.some(friend => friend._id === userId);
      setAdd(!isFriend);  // If user is a friend, setAdd to false
    }
  }, [user.friends, userId]);
  const GetUser = async () => {
    try {
      // Make a GET request to fetch the post
      const response = await fetch(`${render}/user/${userId}`, {
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
      setUserImg(data.picture);
      

  
      // If data exists and the first post has a picturePath, set it
      
    } catch (error) {
      // Handle errors and log the error message
      console.error("Error fetching post:", error.message);
    }}
    useEffect(()=>{
      GetUser();
    },[]);
    const mode = useSelector((state) => state.auth.mode);
      
    let color;
    let color2;

    if(mode==='blanc'){
      color='slate-400'
    }else{
      color='slate-700'
    }
    if(mode==='blanc'){
      color2='slate-700'
    }else{
      color2='slate-200'
    }
    console.log(user);
  return (
    <>
      
      <div className={`text-${color2} `}>
       
          
            <div className={`bg-${color} rounded-lg p-4 my-2`}>
              <div className="flex flex-row items-center justify-evenly">
              <div><img src={`${render}/assets/${userImg}`}  alt="Post Image" className='h-14 w-14 rounded-full  my-3 mr-1 bg-cover mx-auto '/></div>
                <div className="w-24">
                  {firstName} {lastName}
                </div>
                <div className="p-1">
                <div className='' >{add ? (<div onClick={patchFriend} className='rounded-full bg-slate-700 p-1 text-green-600 hover:cursor-pointer hover:bg-slate-800'><UserRoundPlus /></div>):(<div onClick={patchFriend} className='rounded-full bg-slate-700 p-1 hover:cursor-pointer text-red-600 hover:bg-slate-800'><UserRoundMinus /></div>)
            }</div>
                </div>
              </div>
            </div>
          
         
      </div>
    </>
  );
};

export default Users;