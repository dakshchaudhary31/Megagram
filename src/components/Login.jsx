import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.createEmailPasswordSession(data.email, data.password)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen  ml-[-19px] mr-[-16px] mb-[-65px] flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo width="80px" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Login</h2>
          <p className="text-sm text-gray-400 mt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="text-black"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email address",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="text-black"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Login
