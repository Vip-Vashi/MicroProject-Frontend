import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string()
    .required('Email is required')
    .matches(/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/, 'Email must contain only lowercase letters and numbers'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  contact: yup.string()
    .required('Contact is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Contact number must be a valid phone number'),
  address: yup.string().required('Address is required'),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8000/users', data);
      // alert('User registered successfully');
      Swal.fire({
        title: 'Success!',
        text: 'User registered successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/login');
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2  role='heading' className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
          </div>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
        
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
       
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">Contact</label>
            <input
              type="text"
              id="contact"
              {...register('contact')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>}
          </div>
          
        
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              id="address"
              {...register('address')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
