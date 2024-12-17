import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Image } from 'lucide-react';

function Regester() {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.auth.mode);
  const render = useSelector((state) => state.auth.render);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const regesterSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string(),
    email: yup.string().email('Invalid E-mail').required('required'),
    password: yup.string().required('required'),
    location: yup.string().required('required'),
    profession: yup.string().required('required'),
    picture: yup.mixed().required('A picture is required'),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();

    // Append non-file fields
    for (let key in values) {
      if (key !== "picture") {
        formData.append(key, values[key]);
      }
    }

    // Append the file with the "picture" key
    if (image) {
      formData.append("picture", image);
    }
   
    // Make API request to register user
    const savedUserResponse = await fetch(`${render}/auth/regester`, {
      method: 'POST',
      body: formData, // Send as FormData
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    // Clear the preview and image state after successful submit
    setImage(null);
    setImagePreview(null);

    if (savedUser) {
      navigate('/');
    }
  };

  const color2 = mode === 'blanc' ? 'text-slate-700' : 'text-slate-200';
  const color = mode === 'blanc' ? 'bg-slate-300' : 'bg-grey-950';

  return (
    <div className={`${color} pt-8`}>
      <h1 className="font-bold m-auto text-4xl  text-green-900">HaniMedia</h1>
      <h1 className={`m-auto text-4xl mt-8 ${color2}`}>Register</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          location: '',
          profession: '',
          picture: ''  // This should remain in the initial values even though it's a file
        }}
        validationSchema={regesterSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col justify-around sm:w-30 items-center mt-4 w-30">
            {/* First Name */}
            <label htmlFor="firstName" className={`font-bold m-3 ${color2}`}>First Name</label>
            <input
              className="text-black font-bold mb-4 rounded-lg h-12 p-4 bg-gray-300 border border-green-900"
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}

            {/* Last Name */}
            <label htmlFor="lastName" className={`font-bold m-3 ${color2}`}>Last Name</label>
            <input
              className="text-black font-bold mb-4 rounded-lg h-12 p-4 bg-gray-300 border border-green-900"
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && <div>{errors.lastName}</div>}

            {/* Email */}
            <label htmlFor="email" className={`font-bold m-3 ${color2}`}>Email</label>
            <input
              className="text-black font-bold mb-4 rounded-lg h-12 p-4 bg-gray-300 border border-green-900"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <div>{errors.email}</div>}

            {/* Password */}
            <label htmlFor="password" className={`font-bold m-3 ${color2}`}>Password</label>
            <input
              className="text-black mb-10 rounded-lg h-12 p-4 font-bold bg-gray-300 border border-black"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && <div>{errors.password}</div>}

            {/* Location */}
            <label htmlFor="location" className={`font-bold m-3 ${color2}`}>Location</label>
            <input
              className="text-black mb-10 rounded-lg h-12 p-4 font-bold bg-gray-300 border border-black"
              type="text"
              name="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
            />
            {errors.location && touched.location && <div>{errors.location}</div>}

            {/* Profession */}
            <label htmlFor="profession" className={`font-bold m-3 ${color2}`}>Profession</label>
            <input
              className="text-black mb-10 rounded-lg h-12 p-4 font-bold bg-gray-300 border border-black"
              type="text"
              name="profession"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profession}
            />
            {errors.profession && touched.profession && <div>{errors.profession}</div>}

            {/* Picture Upload */}
            <label htmlFor="picture" className={`font-bold m-3 ${color2}`}>Profile Picture</label>
            <Dropzone
              name="picture"
              onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                setImage(file);
                setImagePreview(URL.createObjectURL(file)); // Create image preview
                setFieldValue("picture", file); // Set the file in Formik values
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover" />
                  ) : (
                    <Image className='font-bold hover:cursor-pointer m-2 size-8' />
                  )}
                </div>
              )}
            </Dropzone>
            {errors.picture && touched.picture && <div>{errors.picture}</div>}

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} className="bg-gray-400 mb-4">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Regester;