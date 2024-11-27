import React from 'react';
import { Formik, Field, Form } from 'formik';
import ReactDOM from 'react-dom';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../state';
import { setRender } from '../../state';


const loginSchema=yup.object().shape({
  email:yup.string().email('Invalide E-mail').required('required'),
  password:yup.string().required('required'),

})
function LoginPage() {

  const mode = useSelector((state) => state.auth.mode);
  const render = useSelector((state) => state.auth.render);
  const color2 = mode === 'blanc' ? 'text-slate-700' : 'text-slate-200';


const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-950';
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  dispatch(setRender({ render: "https://hanimedia8.onrender.com" }));
  const handleFormSubmit=async(values,onSubmitProps)=>{
    const formData=new FormData();  
    for (let value in values){
      formData.append(value,values[value]);
      
    }
    
   
    const savedUserResponse=await fetch(
      `${render}/auth/login`,
      {
        method:"POST",   
        mode: "no-cors",
        headers:{
          "Content-type":"application/json"
        },
        
        body:JSON.stringify(values)
      },
      
    )
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser){
      dispatch(
        setLogin({
          user:savedUser.user,
          token:savedUser.token
        })

      )

      navigate('/home')
    }}
  return (
    <div className={`${color} min-h-screen pt-8`}>
      
       
      <h1 className={`font-bold mx-auto  text-4xl  text-green-900`}>HaniMedia</h1>
      <h1 className={` m-auto text-4xl mt-8 ${color2}`}>LogIn</h1>
      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={handleFormSubmit}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        
         <form onSubmit={handleSubmit} className=' flex flex-col justify-around sm:w-30 items-center mt-4 w-30 '>

          <label htmlFor="" className={`font-bold m-3 ${color2}`}>E-mail</label>
           <input className='text-black font-bold mb-4 rounded-lg h-12 p-4 bg-gray-300 border border-s-stone-900 border-green-900'
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <label htmlFor="" className={`font-bold m-3 ${color2}`}>Password</label>
           <input className=' text-black mb-10 rounded-lg h-12 p-4 font-bold bg-gray-300 border border-black'
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting} className='bg-gray-400'>
             Submit
           </button>
         </form>
       )}
     </Formik>
     <p className={`mt-6 ${color2}`}>Don't have an acount ? <a href="/regester" className='text-blue-600'>SingIn</a></p>
      
    </div>
  )
}

export default LoginPage