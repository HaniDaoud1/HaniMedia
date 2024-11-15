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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLogout } from '../../state/index';
import { setLogin } from '../../state/index';

function Navbar() {
const dispatch=useDispatch();
  const LogOut=()=>{
    dispatch(setLogout());
  }
  const [showMenu, setShowMenu] = useState(false);

  const handleClickAway = () => {
    setShowMenu(false); // Close menu when clicking outside
  };

  const handleIconClick = () => {
    setShowMenu((prev) => !prev); // Toggle menu visibility  };
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
console.log(user)
  const [Mode ,settMode]=useState(mode);

  const ChangeMode=()=>{
    if (Mode=='blanc'){
      settMode('black');
      dispatch(setMode({ mode: 'black' }));
    }else{
      settMode('blanc');
      dispatch(setMode({ mode: 'blanc' }));
    }
  }

  
  return (
    <div className='h-20 bg-green-950 flex flex-row justify-between items-center'>
        <div className=' flex flex-row items-center'>
        <a href="/home"><div className='m-4 hover:cursor-pointer ' ><h1 className='text-2xl font-bold sm:ml-8 sm:text-4xl text-white hover:text-gray-200 '>HaniMedia</h1></div></a>
        <div className='max-md:hidden mx-5 disabled:block'><TextField className='text-white bg-green-700 rounded-lg md:block '  label="Recherche" variant="outlined" /></div>
        </div>
        <div id='message' className=' flex flex-row items-center max-[450px]:mx-4 mx-8'>
       
            <MessageCircle className=' max-sm:size-5 mr-3 ml-1 hover:cursor-pointer hover:text-gray-400 max-[420px]:mx-1 max-sm:mx-2 text-white '/>
            <Bell className='max-sm:hidden max-sm:size-5 mx-3 hover:cursor-pointer hover:text-gray-400 max-[420px]:mx-1 text-sm md:size-small text-white'/>
            {user ? (<a className='sm:hidden' href={`/users/${user._id}`}><UserRound className='max-sm:size-5 font-medium mx-3 hover:cursor-pointer hover:text-gray-400 max-[420px]:mx-2 text-sm text-white '/></a>):null}
            {Mode === 'blanc' ? <Moon className='hover:text-slate-900 rounded-full ml-3 hover:cursor-pointer max-[420px]:mx-1 text-sm' onClick={ChangeMode} /> : <Sun className='hover:text-slate-400 hover:cursor-pointer ml-3 rounded-full max-[420px]:mx-1' onClick={ChangeMode} /> }
            <DropdownMenu>
       
       <DropdownMenuTrigger className='mr-8 ml-20 p-0 hover:null rounded-full hover:cursor-pointer max-sm:mr-3 max-sm:ml-8 max-[365px]:ml-4 bg-green-950'>{user ? (<img src={`http://localhost:3001/assets/${user.picture}`} alt="Image" className='h-12 w-12 rounded-full  '/> ):(<Avatar/>)}</DropdownMenuTrigger>
       <DropdownMenuContent>
         <DropdownMenuLabel>My Account</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <a href="/profile/:userId"><DropdownMenuItem>Profile</DropdownMenuItem></a>
         <a href="/"><DropdownMenuItem onClick={LogOut}>LogOut</DropdownMenuItem></a>
       </DropdownMenuContent>
     </DropdownMenu>
        </div>
    </div>
  )
}

export default Navbar