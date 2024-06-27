import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
// import { login } from '../services/opretions/userApi';
import { useDispatch, useSelector } from 'react-redux'
import {setUser, setToken} from "../redux/slices/AuthSlice"
import {setContractors} from "../redux/slices/ContractorSlice"
import toast from 'react-hot-toast';
import axios from 'axios';
import img from "../images/Login Railway Logo.png"
import { setVendorsData} from '../redux/slices/VendorSlice';

const SignInN = () => {
  const baseUrl = "https://railway-qbx4.onrender.com";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (data, e) => {
  //   const formData = getValues();
  //   console.log("formData : ", formData);

  //   await dispatch(login(formData, navigate));

  //   console.log("Result in CartForm : ");
  // }

  const onSubmit = async (e) => {
    // e.preventDefault();
    const formdata = getValues();
    const { Email, Password } = formdata;
    console.log("Form data : ", formdata);
    const user = await axios.post(baseUrl + "/user/Login", { Email, Password });
    console.log("user : ", user?.data);
    dispatch(setUser(user?.data?.user));
    dispatch(setToken(user?.data.token));
    dispatch(setContractors(user?.data.contractors))
    dispatch(setVendorsData(user?.data.vendors))
    localStorage.setItem("Token", JSON.stringify(user?.data.token))
    localStorage.setItem("contractors", JSON.stringify(user?.data.contractors))
    localStorage.setItem("vendors", JSON.stringify(user?.data.vendors))
    toast.success("Log in Successful");
    navigate("/dashboard")
  }

  return (
    <div className=" bg-gray-100 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white  shadow-md rounded-lg px-8 py-6 max-w-md">
        <img className=' w-[7rem] mx-auto' src={img} alt="" />
        <h1 className="text-2xl font-bold text-center mb-4 ">Welcome Back!</h1>
        <form >
          <div className="mb-4">
            <label for="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className=' text-red-600'>*</span> </label>
            <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" {...register("Email", { required: true })} />
            {errors.Email && (
              <span className="ml-2 text-xs tracking-wide text-pink-600">
                Email is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label for="password" className="block text-sm font-medium text-gray-700  mb-2">Password <span className=' text-red-600'>*</span></label>
            <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" {...register("Password", { required: true })} />
            {errors.Password && (
              <span className="ml-2 text-xs tracking-wide text-pink-600">
                Password is required
              </span>
            )}
            <a href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
              Password?</a>
          </div>

          <button onClick={handleSubmit(onSubmit)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5">Login</button>

          {/* <div className=" mb-4">
            <div onClick={() => navigate("/signup")} className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center cursor-pointer">Create
              Account</div>
          </div> */}
        </form>
      </div>
    </div >
  )
}

export default SignInN
