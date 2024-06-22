import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { setVendorsData } from "../../redux/slices/VendorSlice";
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import DefaultLayout from '../../layout/DefaultLayout';
import QRCode from 'qrcode.react';

const EditVendor = () => {
    const baseUrl = "http://localhost:3000";
    const clientUrl = "https://railway-kappa.vercel.app/";

    const location = useLocation();
    const vender = location.state?.vender || {};
    console.log("Vender Data for Edit ", vender);

    const [formData, setFormData] = useState({
        fname: '',
        dob: '',
        mobile: '',
        profilePic: null,
        aadhar: '',
        aadharCardImg: null,
        policeVarificationDate: '',
        policeVarificationDocument: null,
        medicalValidityDate: '',
        madicalValidityDocument: null,
        validityAuthority: '',
        LicenseeId: '',
        qrcode: '',
    });

    useEffect(() => {
        setFormData({
            fname: vender.fname || '',
            dob: vender.dob || '',
            mobile: vender.mobile || '',
            profilePic: vender.profilePic || null,
            aadhar: vender.aadhar || '',
            aadharCardImg: vender.aadharCard || null,
            policeVarificationDate: vender.policeVarificationDate || '',
            policeVarificationDocument: vender.policeVarificationDocument || null,
            medicalValidityDate: vender.medicalValidityDate || '',
            madicalValidityDocument: vender.madicalValidityDocument || null,
            validityAuthority: vender.validityAuthority || '',
            LicenseeId: vender.LicenseeId || '',
            qrcode: vender.qrcode || '',
        });
    }, [vender]);

    const [success, setSuccess] = useState(false);
    const [qrCodeValue, setQRCodeValue] = useState('');
    const [generatedData, setGeneratedData] = useState(null);
    const [imageToShow, setImageToShow] = useState(null);
    const [imageType, setImageType] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log("name : ", name, "  value: ", value);

        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const showQRcode = () => {
        setSuccess(!success);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (Object.values(generatedData).some(value => value === '')) {
            toast.error('All fields are required');
            return;
        } else {
            const toastId = toast.loading("Loading...");
            try {
                console.log('Submitting formData:', generatedData);
                const response = await axios.post(baseUrl + '/vendor/registerVendor', generatedData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success("Vendor Registered");
                setVendorsData(response.data.vendors);
                localStorage.setItem("vendors", JSON.stringify(response?.data.vendors));
                console.log("response ", response);
            } catch (error) {
                console.error('Error:', error);
                toast.error(error.response.data.message);
            }
            toast.dismiss(toastId);
        }
    };

    const componentPDF = useRef();

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Vendor Details",
    });

    const handleViewImage = (image) => {
        if (image && typeof image !== 'string') {
            setImageToShow(URL.createObjectURL(image));
        } else {
            setImageToShow(image);
        }
    };

    return (
        <DefaultLayout>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }} className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Edit Vendor
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} style={{}} action="#">
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                    {/* Name */}
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Full Name <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fname"
                                            value={formData.fname}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Date of Birth <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob.split('T')[0]} // Ensure correct format
                                            onChange={handleChange}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    {/* Mobile Number */}
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Mobile Number <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="Enter your mobile number"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Aadhar Number */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Aadhar Number <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="aadhar"
                                            inputMode="numeric"
                                            pattern="\d*"
                                            value={formData.aadhar}
                                            onChange={handleChange}
                                            placeholder="Enter your Aadhar number"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                {/* Upload Aadhar Pic */}
                                <div className='flex flex-col pb-5 gap-2'>
                                    <label htmlFor="aadharCardImg" className="mb-2.5 block text-black dark:text-white">
                                        Upload Aadhar Card <span className='text-red-600 text-lg'>*</span>
                                    </label>
                                    <input type="file" name='aadharCardImg' onChange={handleChange} />
                                    <button
                                        type="button"
                                        onClick={() => handleViewImage(formData.aadharCardImg)}
                                        className="text-blue-500 inline-flex"
                                    >
                                        View
                                    </button>
                                </div>

                                {/* Upload Profile Pic */}
                                <div className='flex flex-col pb-5 gap-2'>
                                    <label htmlFor="profilePic" className="mb-2.5 block text-black dark:text-white">
                                        Upload Profile Pic <span className='text-red-600 text-lg'>*</span>
                                    </label>
                                    <input type="file" name='profilePic' onChange={handleChange} />
                                    <button
                                        type="button"
                                        onClick={() => handleViewImage(formData.profilePic)}
                                        className="text-blue-500 inline-flex"
                                    >
                                        View
                                    </button>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Validity Authority <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="validityAuthority"
                                        value={formData.validityAuthority}
                                        onChange={handleChange}
                                        placeholder="Enter validity authority"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Police Verification */}
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Police Verification Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="policeVarificationDate"
                                        value={formData.policeVarificationDate.split('T')[0]} // Ensure correct format
                                        onChange={handleChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Upload Police Verification Document */}
                                <div className='flex flex-col pb-5 gap-2'>
                                    <label htmlFor="policeVarificationDocument" className="mb-2.5 block text-black dark:text-white">
                                        Upload Police Verification Document <span className='text-red-600 text-lg'>*</span>
                                    </label>
                                    <input type="file" name='policeVarificationDocument' onChange={handleChange} />
                                    <button
                                        type="button"
                                        onClick={() => handleViewImage(formData.policeVarificationDocument)}
                                        className="text-blue-500 inline-flex"
                                    >
                                        View
                                    </button>
                                </div>

                                {/* Medical Validity Date */}
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Medical Validity Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="medicalValidityDate"
                                        value={formData.medicalValidityDate.split('T')[0]} // Ensure correct format
                                        onChange={handleChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Upload Medical Validity Document */}
                                <div className='flex flex-col pb-5 gap-2'>
                                    <label htmlFor="madicalValidityDocument" className="mb-2.5 block text-black dark:text-white">
                                        Upload Medical Validity Document <span className='text-red-600 text-lg'>*</span>
                                    </label>
                                    <input type="file" name='madicalValidityDocument' onChange={handleChange} />
                                    <button
                                        type="button"
                                        onClick={() => handleViewImage(formData.madicalValidityDocument)}
                                        className="text-blue-500 inline-flex"
                                    >
                                        View
                                    </button>
                                </div>

                                <button
                                    className="mb-5 mt-5 inline-flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 lg:px-4 xl:px-4"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="mb-5 mt-5 ml-5 inline-flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 lg:px-4 xl:px-4"
                                    onClick={showQRcode}
                                >
                                    Show QR Code
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div ref={componentPDF} className="relative">
                        <div className="overflow-x-auto">
                            <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                                <div className="w-full">
                                    <div className="bg-white shadow-md rounded my-6 p-4">
                                        <div className='pb-10'>
                                            <p>Id: {formData.LicenseeId}</p>
                                            <p>Name: {formData.fname}</p>
                                            <p>Date of Birth: {formData.dob}</p>
                                            <p>Mobile Number: {formData.mobile}</p>
                                            <p>Aadhar: {formData.aadhar}</p>
                                            <p>Validity Authority: {formData.validityAuthority}</p>
                                            <p>Police Verification Date: {formData.policeVarificationDate}</p>
                                            <p>Medical Validity Date: {formData.medicalValidityDate}</p>
                                        </div>
                                        {success && (
                                            <QRCode
                                                id="qrCodeEl"
                                                size={150}
                                                value={clientUrl + "vender?id=" + formData.LicenseeId}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                level="H"
                                                includeMargin={true}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="mb-5 mt-5 ml-5 inline-flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 lg:px-4 xl:px-4"
                        onClick={generatePDF}
                    >
                        Print
                    </button>
                    {imageToShow && (
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Preview
                            </label>
                            <iframe
                                src={imageToShow}
                                className="w-full h-64 rounded border-[1.5px] border-stroke bg-transparent"
                            />
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default EditVendor;
