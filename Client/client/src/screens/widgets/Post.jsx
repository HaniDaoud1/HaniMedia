import React, { useState } from 'react'
import { ThumbsUp } from 'lucide-react';
import { MessageSquareMore } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import { UserRoundMinus } from 'lucide-react';
import { setFriends } from '../../state';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../../../../Server/controllers/users';


function Post({description,image,firstName,lastName,location,profession,userId,postt}) {
  const [add,setAdd]=useState(true);
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const [like,setLike]=useState(false);
    const [comment,setComment]=useState(false);
    const [commentaire,setCommentaire]=useState('');
    const [addComment,setAddComment]=useState([]);
    const [nbrOfLikes,setNbrOfLikes]=useState([]);
    const [picture,setPicture]=useState(null);
    const [userImg,setUserImg]=useState(null);
    const [userid,setUserId]=useState('');
    const [getuser,setUser]=useState(null);

    const posts = useSelector((state) => state.auth.posts);
    const token = useSelector((state) => state.auth.token);
    const friends=useSelector((state) => state.auth.friends);
    const user = useSelector((state) => state.auth.user);
    const render = useSelector((state) => state.auth.render);



    
   
    
    const GetUser = async () => {
      try {
        // Make a GET request to fetch the post
        const response = await fetch(`${process.env.API_BASE_URL}/user/${userId}`, {
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
        if (data && data.picture) {
          setUserImg(data.picture);
        } else {
          console.warn("No picture found for the user.");
          // Optionally, set a default picture here
        }
        

    
        // If data exists and the first post has a picturePath, set it
        
      } catch (error) {
        // Handle errors and log the error message
        console.error("Error fetching post:", error.message);
      }}
    const GetPost = async () => {
      const post = posts.find((post) => post._id === postt);
      try {
        // Make a GET request to fetch the post
        const response = await fetch(`${process.env.API_BASE_URL}/post/${post._id}/post`, {
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
    
        // If data exists and the first post has a picturePath, set it
        if (data && data.length > 0 && data[0].picturePath) {
          setPicture(data[0].picturePath);
        } else {
          console.warn("No picturePath found in the post data.");
        }
      } catch (error) {
        // Handle errors and log the error message
        console.error("Error fetching post:", error.message);
      }
    };
    const Likes = async () => {
  const post = posts.find((post) => post._id === postt);

  if (!post) {
    console.error("Post not found");
    return;
  }

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/post/${post._id}/like`, {
      method: "PATCH",
      body: JSON.stringify({ userId: user._id }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update likes: ${response.statusText}`);
    }

    const data = await response.json();

    
    // Update the number of likes
    setNbrOfLikes(data.likes.length-1);

    // Check if the current user has liked the post
    if (data.likes.includes(user._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
    
  } catch (error) {
    console.error("Error liking post:", error.message);
  }
};
   
    const friendsId=userId;
    const patchFriend = async () => {
      try {
        // Send a PATCH request to add or remove a friend
        const response = await fetch(`${process.env.API_BASE_URL}/user/${user._id}/${userId}`, { 
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
    
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Failed to update friend: ${response.statusText}`);
        }
    
        // Parse the JSON data from the response
        const data = await response.json();
    
        // Update the Redux store with the new list of friends
        dispatch(setFriends({ friends: data }));
    
        // Update the state for the "add" button to reflect the current status
        setAdd((prevAdd) => !prevAdd);
        
      } catch (error) {
        // Handle errors and log the error message
        console.error("Error updating friend:", error.message);
      }
    };
    const comment2=()=>{
      if (comment){
        setComment(false);
      }else{
        setComment(true);
      }

    }
    const coment = async () => {
      const post = posts.find((post) => post._id === postt);
      
      const response = await fetch(`${process.env.API_BASE_URL}/post/${post._id}/comment`, {
          method: "POST",
          body: JSON.stringify({
              userId: user.firstName ,
              comment: commentaire // Fixed the body structure
          }),
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      });
  
      const data = await response.json();
      setAddComment(data.commentaire);
      setUserId(data.userId)
      setCommentaire(''); // Reset comment input
  };
      useEffect(()=>{
        coment();
      },[]);
     
      useEffect(()=>{
        GetUser();
       
      },[])
      useEffect(()=>{
        GetPost();
      },[]);
     
      
      useEffect(() => {
        if (user?.friends) {
          const isFriend = user.friends.some(friend => friend._id === userId);
          setAdd(!isFriend);  // Set add based on whether the user is already a friend
        }
      }, [user.friends, userId]);
      useEffect(() => {
        const post = posts.find((post) => post._id === postt);
        const fetchLikes = async () => {
          
          try {
            const response = await fetch(`${process.env.API_BASE_URL}/post/${post._id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error(`Failed to fetch likes: ${response.statusText}`);
            }
      
            const data = await response.json();
      
            // Assuming data.likes is an array of user IDs
            setNbrOfLikes(data.length-1); // Correctly set the number of likes
            setLike(data.includes(user._id)); // Check if current user liked the post
          } catch (error) {
            console.error("Error fetching likes:", error.message);
          }
        };
      
        if (post && post._id) {
          fetchLikes();
        }
      }, [ user._id, token]); // Add relevant dependencies

      const mode = useSelector((state) => state.auth.mode);
    

    const color = mode === 'blanc' ? 'bg-slate-400' : 'bg-slate-700';

    
    const color2 = mode === 'blanc' ? 'text-slate-700' : 'text-slate-200';


      const post = posts.find((post) => post._id === postt);
  return (
    <>
    
    <div className={`${color} rounded-lg flex flex-col items-start p-2 mx-auto ${color2} my-2 max-lg:w-[100%]   h-auto min-[800px]:w-[100%] `} >
    <div className='flex flex-row justify-around items-center'>
    <div className='flex items-start  flex-row mx-4 hover:text-gray-500 hover:cursor-pointer'>
     <img src={`${render}/assets/${userImg}`}  alt="Post Image" className='h-11 w-11 rounded-full  my-3 mr-1 bg-cover mx-auto '/>
          <div className='flex flex-col'> <div className='flex flex-row'>
            <p className='font-bold mx-1 mt-3 '> {firstName}</p>
            <p className='font-bold mx-1 mt-3'>{lastName}</p></div> 
            <p className=' text-sm '>{location}</p></div></div>
            <div className='' >{post.userId !== user._id ? (add ? (<div onClick={patchFriend} className='rounded-full bg-slate-700 p-1 text-green-600 hover:cursor-pointer hover:bg-slate-800'><UserRoundPlus /></div>):(<div onClick={patchFriend} className='rounded-full bg-slate-700 p-1 hover:cursor-pointer text-red-600 hover:bg-slate-800'><UserRoundMinus /></div>)
            ): null}</div>
            </div>
            <p className={`text-sm flex flex-row text-start items-start mx-4  mb-2`}>{description}</p>
            {picture && <img src={`${render}/assets/${image}`}  alt="Post Image" className='bg-cover rounded-lg h-auto w-[95%]  mx-auto '/>}
            <div className='mt-2  flex flex-row '>
           <div onClick={Likes} className=' ml-5 mr-12 hover:text-slate-900 hover:cursor-pointer flex flex-row'>
            {like ?(
            <ThumbsUp className=' text-green-500'/>) : (<ThumbsUp />)}
            <p className='ml-2 text-lg'>{nbrOfLikes}</p></div>
            <div className=' ml-5 mr-12 hover:text-slate-900 hover:cursor-pointer flex flex-row' onClick={comment2}>
            <MessageSquareMore/>
            <p className='ml-2 text-lg'>{addComment.length}</p>
            </div>
            </div>
            <div className='w-[100%]'>{comment ?(<div className='flex flex-row items-center justify-around text-gray-700'> <input placeholder='Add comment ...' className='w-[95%] p-2 my-2 bg-slate-600 rounded-lg mr-2 text-gray-200 font-bold' type="text" onChange={(e)=>{setCommentaire(e.target.value)}}  /> <button className='w-15 h-10 text-sm text-center text-white' onClick={coment}>Send</button></div>):(null)}
            <div className='flex flex-col items-start'>
  {comment ? (
    addComment && addComment.length > 0 ? (
      addComment.map((commentItem, index) => (
        <div key={index} className={`p-1 text-${color2}`}>
          {/* Render userId and comment separately */}
          <span className='text-slate-400 bg-slate-800 rounded-lg p-1 font-bold'>
            {commentItem.userId}
          </span>
          {" "} {/* Add a space between userId and comment */}
          {commentItem.comment}
        </div>
      ))
    ) : (
      <p>No comments yet</p>
    )
  ) : null}
</div></div>
        </div>      
        </>
  )}


export default Post