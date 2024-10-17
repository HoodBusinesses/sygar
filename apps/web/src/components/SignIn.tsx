'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi'; // Import FiLoader for spinner
import Image from "next/image";
import images from "@/public/images";

// Zod schema for form validation
const signInSchema = z.object({
  login: z
    .string()
    .min(1, "Email or phone number is required")
    .max(255, "Email or phone number is too long")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(255, "Password is too long"),
});

const SignIn: React.FC = () => {
  // React Hook Form setup with Zod schema validation
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const logo = images.logo;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

 // Submit handler
 const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:1337/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.login, // Assuming 'login' field is used for email
        password: data.password, // Assuming 'password' field is present in the form
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      alert(`Welcome, ${result.user.name}`);
      console.log(result);
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    setLoading(false);
    alert('An error occurred. Please try again.');
    console.error(error);
  }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
       <Image src={logo} width={120} height={120} alt="logo" className="mb-4 "/>
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-bold text-center text-gray-950">Sign in to your account</h2>

          {/* Login Field */}
          <div>
            <Label className="text-gray-600" htmlFor="login">Login</Label>
            <Input
              type="text"
              id="login"
              {...register('login')}
              placeholder="Enter your email or phone number"
              className={`mt-1 block w-full ${errors.login ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.login && <p className="text-sm text-red-600">{errors.login.message?.toString()}</p>}
          </div>

          {/* Password Field */}
          <div>
            <Label className="text-gray-600" htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register('password')}
              placeholder="Enter your password"
              className={`mt-1 block w-full ${errors.password ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message?.toString()}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="/resetPassword" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button with Loader */}
          <Button
            type="submit"
            className={`w-full text-white py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center 
              ${loading ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin w-5 h-5 mr-2" />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
