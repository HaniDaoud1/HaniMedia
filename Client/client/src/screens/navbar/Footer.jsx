import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
    const mode = useSelector((state) => state.auth.mode);
  const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-900';
  const color2 = mode === 'blanc' ? 'text-slate-700' : 'text-slate-200';
  return (<>
    <div className={`${color}  ${color2} font-medium mx-auto my-auto py-2`}>Hani Daoud FullStack Junior Programmer 2024<br />Contact : hanidaoud936@gmail.com</div>
    </>)
}   
export default Footer