import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen ml-[-19px] mr-[-16px] mb-[-100px] mt-[-40px]  flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo width="80px" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Create Account</h2>
          <p className="text-sm text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="text-black"
            {...register("name", {
              required: true,
              matchPattern: (value) =>
                /^[a-zA-Z ]{2,30}$/.test(value) ||
                "Name must contain only alphabets and spaces",
            })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="text-black"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
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
              matchPattern: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                "Password must be at least 8 characters and include 1 number and 1 special character",
            })}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            Create Account
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Signup;
