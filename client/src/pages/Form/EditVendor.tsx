import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { setVendorsData } from "../../redux/slices/VendorSlice";
import { useNavigate,useLocation } from 'react-router-dom';

import { useReactToPrint } from 'react-to-print';
import DefaultLayout from '../../layout/DefaultLayout';
import QRCode from 'qrcode.react';

const EditVendor = () => {
    const naviagte = useNavigate()

    const navigate = useNavigate();

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
        _id: '',
    });

    useEffect(() => {
        setFormData({
            fname: vender.fname || '',
            dob: vender.dob || '',
            mobile: vender.mobile || '',
            profilePic: vender.profilePic || null,
            aadhar: vender.aadhar || '',
            aadharCardImg: vender.aadharCardImg || null,
            policeVarificationDate: vender.policeVarificationDate || '',
            policeVarificationDocument: vender.policeVarificationDocument || null,
            medicalValidityDate: vender.medicalValidityDate || '',
            madicalValidityDocument: vender.madicalValidityDocument || null,
            validityAuthority: vender.validityAuthority || '',
            LicenseeId: vender.Contractor?.contractorId || '',
            qrcode: vender.qrcode || '',
            _id : vender._id,
        });
    }, [vender]);

    const [success, setSuccess] = useState(false);
    const [qrCodeValue, setQRCodeValue] = useState('');
    const [generatedData, setGeneratedData] = useState(null);
    const [imageToShow, setImageToShow] = useState(null);


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

    // const generateQRCode = (e) => {
    //     e.preventDefault();
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < 6; i++) {
    //         const randomIndex = Math.floor(Math.random() * charactersLength);
    //         result += characters.charAt(randomIndex);
    //     }
    //     const updatedFormData = { ...formData, qrcode: result };

    //     setQRCodeValue(result);
    //     setGeneratedData(updatedFormData);
    //     setSuccess(true);
    //     console.log('Generated QR Code:', result);
    // };

    console.log("Form Data ", formData)

    const handleSave = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            toast.error('All fields are required');
            return;
        } else {
            const toastId = toast.loading("Loading...");
            try {
                console.log('Submitting formData:', formData);
                const response = await axios.post(baseUrl + '/vendor/updateVendor', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                toast.success("Vendor Registered");
                setVendorsData(response.data.vendors);
                localStorage.setItem("vendors", JSON.stringify(response?.data.vendors));
                console.log("response ", response);
                navigate("/vendorsData")
                
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

    const handleVendorTable = () => {
        naviagte('/vendorsData');
    }

    return (
      <DefaultLayout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          className="grid grid-cols-1 gap-9 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"
              >
                <div>
                  <h3 className="font-medium text-black dark:text-white">
                    Edit Vendor
                  </h3>
                </div>
                <div>
                  <button
                    onClick={() => handleVendorTable()}
                    className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} style={{}} action="#">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* Name */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Full Name{' '}
                        <span className="text-red-600 text-lg">*</span>
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
                        Date of Birth{' '}
                        <span className="text-red-600 text-lg">*</span>
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
                        Mobile Number{' '}
                        <span className="text-red-600 text-lg">*</span>
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
                  <div className="flex flex-col pb-5 gap-2">
                    <label
                      htmlFor="aadharCardImg"
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      Upload Aadhar Card{' '}
                      <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="file"
                      name="aadharCardImg"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => handleViewImage(formData.aadharCardImg)}
                      className="text-blue-500 inline-flex"
                    >
                      View
                    </button>
                  </div>

                  {/* Upload Profile Pic */}
                  <div className="flex flex-col pb-5 gap-2">
                    <label
                      htmlFor="profilePic"
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      Upload Profile Pic{' '}
                      <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="file"
                      name="profilePic"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => handleViewImage(formData.profilePic)}
                      className="text-blue-500 inline-flex"
                    >
                      View
                    </button>
                  </div>

                  {/* Upload Police Verification Document */}
                  <div className="flex flex-col pb-5 gap-2">
                    <label
                      htmlFor="policeVarificationDocument"
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      Upload Police Verification Document{' '}
                      <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="file"
                      name="policeVarificationDocument"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleViewImage(formData.policeVarificationDocument)
                      }
                      className="text-blue-500 inline-flex"
                    >
                      View
                    </button>
                  </div>

                  {/* Upload Medical Validity Document */}
                  <div className="flex flex-col pb-5 gap-2">
                    <label
                      htmlFor="madicalValidityDocument"
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      Upload Medical Validity Document{' '}
                      <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="file"
                      name="madicalValidityDocument"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleViewImage(formData.madicalValidityDocument)
                      }
                      className="text-blue-500 inline-flex"
                    >
                      View
                    </button>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* Medical Validity Date */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Medical Validity Date{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="date"
                        name="medicalValidityDate"
                        value={formData.medicalValidityDate.split('T')[0]} // Ensure correct format
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    {/* Police Verification Date */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Police Verification Date{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="date"
                        name="policeVarificationDate"
                        value={formData.policeVarificationDate.split('T')[0]} // Ensure correct format
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* LicenseeId */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Licensee Id{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="text"
                        name="LicenseeId"
                        value={formData.LicenseeId}
                        onChange={handleChange}
                        placeholder="Enter Licensee Id"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    {/* Validity Authority */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Validity Authority{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="text"
                        name="validityAuthority"
                        value={formData.validityAuthority}
                        onChange={handleChange}
                        placeholder="Enter Validity Authority"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Display QR Code */}
                  {success && (
                    <div className="mt-12 flex justify-center">
                      <QRCode value={formData.qrcode} />
                    </div>
                  )}

                  <div className=" flex justify-center gap-5 mt-12">
                    {/* Generate QR Code */}
                    <div className="">
                      <button
                        className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center text-base font-medium text-primary hover:bg-opacity-90 lg:px-5 xl:px-6"
                        // onClick={generateQRCode}
                        onClick={showQRcode}
                      >
                        QR Code
                      </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end gap-4.5">
                      <button
                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-6"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal for viewing images */}
        {imageToShow && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded ">
              {/* <img
                            src={imageToShow}

                            alt="Document"
                            className="max-w-full max-h-full"
                        /> */}
              <iframe
                src={imageToShow}
                style={{ width: '60vw', height: '69vh' }}
                title="PDF Viewer"
              />
              <button
                onClick={() => setImageToShow(null)}
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </DefaultLayout>
    );
};

export default EditVendor;
