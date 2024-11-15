import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MessageCircle } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { MapPin } from 'lucide-react';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      console.log(data );
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

  const { firstName, lastName,email, location,profession,picture } = user; // Corrected firtName to firstName

  return (
    <div className="h-48 w-[90%] bg-gray-700 rounded-lg   p-4 mx-auto my-4 text-white">
        <div className='flex items-center  flex-row mx-4'>
          <img src="picture" alt="" />
            <div className='h-11 w-11 rounded-full bg-orange-300 my-3'></div>
            <p className='font-bold m-2'>{firstName}</p>
            <p className='font-bold m-2'>{lastName}</p>
            
        </div>
        <div className='flex flex-col  justify-between'>
        <div className='flex flex-row ml-4 sm:my-1'>
            <MapPin className='sm:mr-8 max-sm:size-5  hover:cursor-pointer hover:text-gray-400  text-white ' />
        <p className=' text-white ml-3'>{location}</p>
        </div>
        <div className='flex flex-row ml-4  sm:my-1'>
            <BriefcaseBusiness className='sm:mr-8 max-sm:size-5  hover:cursor-pointer hover:text-gray-400  text-white ' />
        <p className=' text-white ml-3'>{profession}</p>
        </div>
        <div className='flex flex-row ml-4 sm:my-1'>
        <MessageCircle className='sm:mr-8 max-sm:size-5  hover:cursor-pointer hover:text-gray-400  text-white '/>
        <p className=' text-white ml-3'>{email}</p>
        </div></div>
       
        
      
    </div>
  );
};

export default Profile;