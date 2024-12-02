import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MessageCircle } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { MapPin } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import img from './user.jpg'

const UserWidget = ({ userId ,profile=false }) => {
  const [user, setUser] = useState(null);
  const userr = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const render = useSelector((state) => state.auth.render);

  const navigate = useNavigate();
  const picture = "316102386_203916862002298_8645110410668679648_n.jpg";
  const getUser = async () => {
      
    try {
      const response = await fetch(`${render}/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getUser();
    }
  }, [userId, token]); // Include userId and token as dependencies

  if (!user) {
    return null;
  }

  const { firstName, lastName,email, location,profession } = user; // Corrected firtName to firstName
   
  const Profile=()=>{
    navigate('/profile/:userId')
  }

  if(!profile){
  return (
    <div className="h-auto w-[100%] min-[800px]:w-[100%]  bg-green-950 rounded-lg   p-2  mx-auto my-2 text-white flex flex-row justify-around">
        <div onClick={Profile} className='flex items-center  flex-col mx-2 max[sm]:m-0 max-[440px]:mx-0 justify-center mt-1'>
        {userr.picture ? ( <img src={`${render}/assets/${userr.picture}`} alt="Image" className='h-auto w-auto   rounded-lg  mb-2 ml-1'/>):(<Avatar className='  rounded-lg  mb-2 ml-1'/>)}
        <div className=''>          
            <p className='font-bold hover:text-slate-400 hover:cursor-pointer'>{firstName} {lastName}</p>
           
            </div>
            
        </div>
        <div className='flex flex-col justify-center'>
        <div className='flex flex-row ml-1 my-1'>
            <MapPin className=' size-5  hover:cursor-pointer hover:text-gray-400  text-white ' />
        <p className=' text-white ml-1 max-sm:text-sm max-sm:ml-2'>{location}</p>
        </div>
        <div className='flex flex-row ml-1  my-1'>
            <BriefcaseBusiness className=' size-5  hover:cursor-pointer hover:text-gray-400  text-white ' />
        <p className=' text-white ml-1 max-sm:text-sm max-sm:ml-2'>{profession}</p>
        </div>
        <div className='flex flex-row ml-1 my-1'>
        <MessageCircle className=' size-5  hover:cursor-pointer hover:text-gray-400  text-white '/>
        <p className=' text-white ml-1 max-sm:text-sm max-sm:ml-2'>{email}</p>
        </div></div>
        
        
       
        
      
    </div>
  );}else{
    return (
      <div className="h-auto w-[90%] bg-green-950 rounded-lg max-[440px]:p-1  p-4 mx-auto  text-white flex flex-col">
          <div className='flex items-start  flex-col mx-0 justify-center mt-1 bg-cover ml-1 '>
              {userr.picture ? ( <img src={(userr.picture.startsWith("http") ? userr.picture : `${render}/assets/${userr.picture}`)} alt="Image" className='h-auto w-[49%] rounded-lg'/>):(<img src={img} className='h-48 w-[49%]   rounded-lg  mb-2 ml-1' />)}
              <div className=''>
              <p className='font-bold hover:text-slate-400 hover:cursor-pointer text-center m-auto'>{firstName} {lastName}</p>
             
              </div>
              
          </div>
          <div className='flex flex-col justify-center'>
          <div className='flex flex-row ml-1 sm:my-1'>
              <MapPin className='sm:mr-3 max-sm:size-4  hover:cursor-pointer hover:text-gray-400  text-white ' />
          <p className=' text-white ml-1 max-sm:text-xs'>{location}</p>
          </div>
          <div className='flex flex-row ml-1  sm:my-1 my-1'>
              <BriefcaseBusiness className='sm:mr-3 max-sm:size-4 max-sm:text-sm hover:cursor-pointer hover:text-gray-400  text-white ' />
          <p className=' text-white ml-1 max-sm:text-xs '>{profession}</p>
          </div>
          <div className='flex flex-row ml-1 sm:my-1'>
          <MessageCircle className='sm:mr-3 max-sm:size-4  hover:cursor-pointer hover:text-gray-400  text-white '/>
          <p className=' text-white ml-1 max-sm:text-xs'>{email}</p>
          </div></div>   
      </div>
    )}
};

export default UserWidget;