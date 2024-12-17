import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import Avatar from '@mui/material/Avatar';
import { Bell } from 'lucide-react';
import { CircleHelp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {setMode} from '../../state/index'
import { Moon } from 'lucide-react';
import { Sun } from 'lucide-react';
import { UserRound } from 'lucide-react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { CircleArrowLeft } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLogout } from '../../state/index';
import { setProfile } from '../../state';

import { setLogin } from '../../state/index';

function Navbar() {
const dispatch=useDispatch();
  const LogOut=()=>{
    dispatch(setLogout());
  }


  
  const token = useSelector((state) => state.auth.token);
  const render = useSelector((state) => state.auth.render);
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const [Mode ,settMode]=useState(mode);
  const [users,setUsers]=useState([]);
  const [usersSearch,setUsersSearch]=useState();
  const [search,setSearch]=useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [search2,setSearch2]=useState();


  const GetNotUsers = async () => {
    try {
      // Make a GET request to fetch the post
      const response = await fetch(`${render}/user/${user._id}/allusers`, {
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

      setUsers(data);
      

  
      // If data exists and the first post has a picturePath, set it
      
    } catch (error) {
      // Handle errors and log the error message
      console.error("Error fetching post:", error.message);
    }}
    
    useEffect(()=>{
      if (user){
        GetNotUsers();}
    },[]);

    const handleSearch = (e) => {
      setUsersSearch(e.target.value.toLowerCase());
    };

   
  const ChangeMode = () => {
    const newMode = Mode === 'blanc' ? 'black' : 'blanc';
    settMode(newMode);
    dispatch(setMode({ mode: newMode }));
    localStorage.setItem('mode', newMode);
  };
  useEffect(() => {
    const savedMode = localStorage.getItem('mode') || 'blanc';
    dispatch(setMode({ mode: savedMode }));
  }, [dispatch]);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);

    window.addEventListener('resize', handleResize);
    // Run on mount to handle initial size
    handleResize();

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
    

  }, []);


  const hundleSearch=()=>{
    if (isSmallScreen){
    if(search){
      setSearch(false)
    }else{
      setSearch(true)
    }}
  }
 return (
  
    <div className={`h-20 bg-green-950 content-center `}>
        
    {search ?  (
    
    <div className='flex flex-row justify-between items-center'> 
    {user ? (<a href="/home"><div className='m-4 hover:cursor-pointer ' ><h1 className='text-2xl font-bold sm:ml-8 sm:text-4xl text-white hover:text-gray-200 '>HaniMedia</h1></div></a>):(<div className='m-4 hover:cursor-pointer ' ><h1 className='text-2xl font-bold sm:ml-8 sm:text-4xl text-white hover:text-gray-200 '>HaniMedia</h1></div>)}{!search && !isSmallScreen ? <div className='flex  items-end justify-center '>  <div className=' mx-5  '> <TextField className='text-white bg-green-700 rounded-lg  '  label="Recherche" variant="outlined" onChange={handleSearch} />
    
     </div> </div>: null}<div className='flex  items-end justify-center '>  <div className='  '> <div className='flex flex-row items-center'> <TextField className='text-white bg-green-700 rounded-lg  '  label="Recherche" variant="outlined" onChange={handleSearch} />
     <div onClick={hundleSearch} className='mx-1 hover:cursor-pointer hover:text-gray-400'><CircleArrowLeft/></div></div>
    <div className='bg-slate-600 content-center text-center m-auto z-10 absolute top-0 mt-20 border border-green-950 rounded-lg mx-auto'>
        {usersSearch ? (users.filter((val)=>{
        return val.firstName.toLowerCase().includes(usersSearch) || val.lastName.toLowerCase().includes(usersSearch)})
        .map((userId)=>{
        
          return ( <a  key={userId._id} href={`/user-profile/${userId._id}`}><div
         className='flex flex-row items-center w-40  h-16  border-b-2 border-green-950 hover:bg-green-950 hover:cursor-pointer p-2 text-white '> <img src={userId.picture ? (userId.picture.startsWith("http") ? userId.picture  : `${render}/assets/${userId.picture}`):`${render}/assets/user.jpg`}  alt="Post Image" className='h-11 w-11 rounded-full  my-3 mr-1 bg-cover mx-auto '/>
           {userId.firstName} {userId.lastName} </div></a>)
          
        })):null}</div>
     </div> </div> </div> ):
   
    <div className='flex flex-row justify-between items-center '>
    {user ? (<a href="/home"><div className='max-sm:ml-4 m-4 hover:cursor-pointer ' ><h1 className='text-2xl font-bold sm:ml-8 sm:text-4xl text-white hover:text-gray-200 '>HaniMedia</h1></div></a>):
    (<div className='m-4 hover:cursor-pointer ' ><h1 className='text-2xl font-bold sm:ml-8 sm:text-4xl text-white hover:text-gray-200 '>HaniMedia</h1></div>)}
    {!search && !isSmallScreen ? <div className='flex  items-end justify-center '> 
       <div className=' mx-5  '> <TextField className='text-white bg-green-700 rounded-lg  '  label="Recherche" variant="outlined" onChange={handleSearch} />
    <div className='bg-slate-600 content-center text-center m-auto z-10 absolute top-0 mt-20 border border-green-950 rounded-lg mx-auto'>
        {usersSearch ? (users.filter((val)=>{
        return val.firstName.toLowerCase().includes(usersSearch) || val.lastName.toLowerCase().includes(usersSearch)})
        .map((userId)=>{
        
          return ( <a  key={userId._id} href={`/user-profile/${userId._id}`}><div
         className='flex flex-row items-center w-40  h-16  border-b-2 border-green-950 hover:bg-green-950 hover:cursor-pointer p-2 text-white font-bold'> <img src={userId.picture ? (userId.picture.startsWith("http") ? userId.picture  : `${render}/assets/${userId.picture}`):`${render}/assets/user.jpg`}  alt="Post Image" className='h-11 w-11 rounded-full  my-3 mr-1 bg-cover mx-auto '/>
           {userId.firstName} {userId.lastName} </div></a>)
          
        })):null}</div>
     </div> </div>: null}
     
     <div id='message' className=' flex flex-row  items-center max-[450px]:ml-2 max-[450px]:mr-1 ml-8 mr-4 '>
           <Search onClick={hundleSearch} className=' max-sm:size-5 mr-3 ml-1 hover:cursor-pointer hover:text-gray-400 max-[420px]:mx-1 max-sm:mx-2 text-white '/>
            <Bell className='max-sm:hidden max-sm:size-5 mx-3 hover:cursor-pointer hover:text-gray-400 max-[420px]:mx-1 text-sm md:size-small text-white'/>
            {user ? (<a className='sm:hidden' href={`/users/${user._id}`}><UserRound className='max-sm:size-5 font-medium mx-3 hover:cursor-pointer hover:text-gray-400 max-[420px]:mx-2 text-sm text-white '/></a>):null}
            {Mode === 'blanc' ? <Moon className='hover:text-slate-900 rounded-full ml-3 text-white hover:cursor-pointer max-[420px]:mx-1 text-sm' onClick={ChangeMode} /> : <Sun className='hover:text-slate-400 text-white hover:cursor-pointer ml-3 rounded-full max-[420px]:mx-1' onClick={ChangeMode} /> }
            {user ? (<DropdownMenu>
       
       <DropdownMenuTrigger className='mr-8 ml-20 p-0 hover:null rounded-full hover:cursor-pointer max-sm:mr-3 max-sm:ml-8 max-[365px]:ml-6 bg-green-950'>{user ? (<img src={(user.picture.startsWith("http") ? user.picture : `${render}/assets/${user.picture}`)} alt="Image" className='h-12 w-12 rounded-full  '/> ):(<Avatar/>)}</DropdownMenuTrigger>
       <DropdownMenuContent>
         <DropdownMenuLabel>My Account</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <a href="/profile/:userId"><DropdownMenuItem>Profile</DropdownMenuItem></a>
         <a href="/"><DropdownMenuItem onClick={LogOut}>LogOut</DropdownMenuItem></a>
       </DropdownMenuContent>
     </DropdownMenu>):<DropdownMenu><DropdownMenuTrigger className='mr-8 ml-20 p-0 hover:null rounded-full hover:cursor-pointer max-sm:mr-3 max-sm:ml-8 max-[365px]:ml-4 bg-green-950'>{user ? (<img src={`http://localhost:3001/assets/${user.picture}`} alt="Image" className='h-12 w-12 rounded-full  '/> ):(<Avatar/>)}</DropdownMenuTrigger></DropdownMenu>}
     </div> </div>}</div>

    
    
    )      
    
  }
      

export default Navbar