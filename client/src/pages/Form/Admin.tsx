import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import toast from 'react-hot-toast';
// import axios from 'axios';

export default function Admin() {
  const baseUrl = 'http://localhost:3000';
  // const baseUrl = 'https://railway-qbx4.onrender.com';
  const [formData, setFormData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Designation: '',
    Mobile: '',
    Email: '',
    Password: '',
    ConfirmPass: '',
});

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async(e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    // console.log('Form data:', formData);
    try{
      const data = await axios.post(baseUrl + "/user/SignUp", formData);
      console.log("back end responce ", data);
      toast.success("Admin Created Successfully")
    }
    catch(error) {
      console.log("Error ", error);
    }
    toast.dismiss(toastId);
};

return (
  <>
  <DefaultLayout>
  <div className="max-w-3xl mx-auto mt-10 p-6 dark:text-white bg-white dark:border-strokedark dark:bg-boxdark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-gray-700" htmlFor="FirstName">First Name <span className=' text-red-500'>*</span> </label>
                        <input
                            type="text"
                            id="FirstName"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                            placeholder='Enter Your Name...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700" htmlFor="MiddleName">Middle Name </label>
                        <input
                            type="text"
                            id="MiddleName"
                            name="MiddleName"
                            value={formData.MiddleName}
                            onChange={handleChange}
                            placeholder='Enter Your Middle Name...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700" htmlFor="LastName">Last Name <span className=' text-red-500'>*</span></label>
                        <input
                            type="text"
                            id="LastName"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                            placeholder='Enter Your Last Name...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700" htmlFor="Designation">Designation <span className=' text-red-500'>*</span></label>
                        <select
                            id="Designation"
                            name="Designation"
                            value={formData.Designation}
                            onChange={handleChange}
                            required
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="" disabled>Select Designation </option>
                            <option value="Data entry">Data entry</option>
                            <option value="Approval">Approval</option>
                            <option value="MIS">MIS</option>
                            <option value="System Admin">System Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700" htmlFor="Mobile">Mobile Number <span className=' text-red-500'>*</span></label>
                        <input
                            type="text"
                            id="Mobile"
                            name="Mobile"
                            value={formData.Mobile}
                            onChange={handleChange}
                            required
                            placeholder='Enter Your Mobile Number...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700" htmlFor="Email">Email <span className=' text-red-500'>*</span></label>
                        <input
                            type="email"
                            id="Email"
                            name="Email"
                            value={formData.Email}
                            required
                            onChange={handleChange}
                            placeholder='Enter Your Email...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block mb-1 text-gray-700" htmlFor="Password">Password <span className=' text-red-500'>*</span></label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            required
                            onChange={handleChange}
                            placeholder='Enter Your Password...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <div
                            className="absolute inset-y-0 top-7 text-3xl right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block mb-1 text-gray-700" htmlFor="ConfirmPass">Confirm Password <span className=' text-red-500'>*</span></label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="ConfirmPass"
                            name="ConfirmPass"
                            value={formData.ConfirmPass}
                            required
                            onChange={handleChange}
                            placeholder='Enter Your Confirm Password...'
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <div
                            className="absolute inset-y-0 top-7 text-3xl right-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            >
                Register
            </button>
        </form>
    </div>
  </DefaultLayout>
  </>
    
);
}
