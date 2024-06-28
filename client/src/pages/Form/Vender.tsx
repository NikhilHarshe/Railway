import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import QRCode from 'qrcode.react';
import DefaultLayout from '../../layout/DefaultLayout';
import { UploadButton } from '@bytescale/upload-widget-react';
import { LiaCheckDoubleSolid } from 'react-icons/lia';
import toast from 'react-hot-toast';
import { setVendorsData } from '../../redux/slices/VendorSlice';

const FormLayout = () => {
  // const baseUrl = "https://railway-qbx4.onrender.com";
  const baseUrl = 'http://localhost:3000';
  const clientUrl = 'https://railway-kappa.vercel.app/';

  const [profilePic, setProfilePic] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [policeVarificationDocument, setPoliceVarificationDocument] =
    useState('');
  const [madicalValidityDocument, setMadicalValidityDocument] = useState('');
  const [success, setSuccess] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState('');

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mname: '',
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

  const [generatedData, setGeneratedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('name : ', name, '  value: ', value);

    if (files) {
      console.log('In side function ');
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  // console.log("Form data in Vendor ", generatedData)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const generateQRCode = () => {
    // e.preventDefault();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    const updatedFormData = { ...formData, qrcode: result };

    // let result2 = clientUrl + `/#/venderDetails/${result}`;

    setQRCodeValue(result);
    setGeneratedData(updatedFormData);
    // setSuccess(true);

    // setProfilePic(profilePic);
    // setAadharCard(aadharCard);
    // setPoliceVarificationDocument(policeVarificationDocument);
    // setMadicalValidityDocument(madicalValidityDocument);
    console.log('Generated QR Code:', result);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await generateQRCode();
    if (Object.values(generatedData).some((value) => value === '')) {
      console.log('generatedData : ', generatedData);
      toast.error('All fields are required');
      return;
    } else {
      const toastId = toast.loading('Loading...');
      try {
        console.log('Submitting formData:', generatedData);
        const response = await axios.post(
          baseUrl + '/vendor/registerVendor',
          generatedData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // alert('Data saved successfully');
        toast.success('Vendor Registered');
        setSuccess(true);
        setVendorsData(response.data.vendors);
        localStorage.setItem('vendors', JSON.stringify(response?.data.vendors));
        console.log('response ', response);
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
    documentTitle: 'Invoice',
  });

  // const options = {
  //   apiKey: "public_kW15c7QDZR7i1vmbhh26HXrTfHvb",
  //   maxFileCount: 1
  // };

  // formData.profilePic = profilePic;
  // formData.aadharCard = aadharCard;
  // formData.madicalValidityDocument = madicalValidityDocument;
  // formData.policeVarificationDocument = policeVarificationDocument;

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
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Register Vendor
              </h3>
            </div>
            <form onSubmit={handleSubmit} style={{}} action="#">
              <div className="p-6.5">
                <h3 className="font-medium mb-[20px] text-black dark:text-white">
                  Personal Information
                </h3>
                <div className="border border-gray-300 shadow-md rounded-lg p-6">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* name */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First Name{' '}
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
                    {/* mname */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Middle Name{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="text"
                        name="mname"
                        value={formData.mname}
                        onChange={handleChange}
                        placeholder="Enter your middile name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* lname */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last Name{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        placeholder="Enter your last name"
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
                        name="dob" // Corrected name attribute
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row xl:justify-between w-full">
                    {/* Upload Profile Photo */}
                    <div className=" flex flex-col gap-2 w-full xl:w-1/2">
                      <label
                        htmlFor="profilePic"
                        className="mb-2.5 block text-black dark:text-white"
                      >
                        Upload Profile Photo{' '}
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="file"
                        name="profilePic"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="w-full xl:w-1/2">
                      <label
                        className="mb-2.5 block text-black dark:text-white"
                        htmlFor="mobile"
                      >
                        Mobile Number{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="number"
                        name="mobile"
                        // Corrected name attribute
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className=" flex">
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
                    </div>

                    {/* Aadhar number */}
                    <div className="w-full xl:w-1/2">
                      <label
                        className="mb-2.5 block text-black dark:text-white"
                        htmlFor="aadhar"
                      >
                        Aadhar number{' '}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="number"
                        name="aadhar"
                        inputMode="numeric"
                        pattern="\d*"
                        value={formData.aadhar}
                        onChange={handleChange}
                        placeholder="Enter your Aadhar number"
                        className="w-[15rem] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium my-[20px] text-black dark:text-white ">
                  Police Varification Information
                </h3>
                <div className="border border-gray-300 shadow-md rounded-lg p-6">
                  <div className=" flex  pb-5 gap-2">
                    {/* Upload PoliceVarification Document */}
                    <div>
                      <label
                        htmlFor="policeVarificationDocument"
                        className="mb-2.5 block text-black dark:text-white"
                      >
                        Upload PoliceVarification Document{' '}
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="file"
                        name="policeVarificationDocument"
                        onChange={handleChange}
                      />
                    </div>

                    {/* PoliceVarification */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        PoliceVarification Date{' '}
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="date"
                        name="policeVarificationDate" // Corrected name attribute
                        value={formData.policeVarificationDate}
                        onChange={handleChange}
                        placeholder="Enter your PoliceVarification Date"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="font-medium my-[20px] text-black dark:text-white">
                  Medical Varification Information
                </h3>
                <div className="border border-gray-300 xl:flex shadow-md rounded-lg p-6">
                  {/* Upload MadicalValidity Document */}
                  <div className=" flex flex-col pb-5 gap-2">
                    <label
                      htmlFor="madicalValidityDocument"
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      Upload MadicalValidity Document{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="file"
                      name="madicalValidityDocument"
                      onChange={handleChange}
                    />
                  </div>

                  {/* MedicalValidity Date */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      MedicalValidity Date{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="date"
                      name="medicalValidityDate" // Corrected name attribute
                      value={formData.medicalValidityDate}
                      onChange={handleChange}
                      placeholder="Enter your MedicalValidity Date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* validityAuthority */}
                <div className="my-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ValidityAuthority{' '}
                    <span className=" text-red-600 text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    name="validityAuthority" // Corrected name attribute
                    value={formData.validityAuthority}
                    onChange={handleChange}
                    placeholder="Enter your ValidityAuthority"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* LicenseeId */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Licensee Id{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="number"
                      name="LicenseeId" // Corrected name attribute
                      value={formData.LicenseeId}
                      onChange={handleChange}
                      placeholder="Enter your Licensee Aadhar No"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* <button
                  onClick={generateQRCode}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-8 text-center font-medium text-primary transition hover:bg-opacity-90 lg:px-8 xl:px-10 mr-5"
                >
                  Generate QR Code
                </button> */}

                {success && (
                  <button
                    onClick={generatePDF}
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-primary py-4 px-8 text-center font-medium text-primary transition hover:bg-opacity-90 lg:px-8 xl:px-10 mr-5"
                  >
                    Print Qr Code PDF
                  </button>
                )}

                {!success && (
                  <button
                    onClick={handleSave}
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-primary py-4 px-8 text-center font-medium text-primary transition hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Save
                  </button>
                )}

                {success && (
                  <button
                    onClick={() => {
                      setSuccess(false);
                      window.location.reload();
                    }}
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-primary py-4 px-8 text-center font-medium text-primary transition hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Register New Vendor
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {success && (
          <div
            ref={componentPDF}
            style={{ width: '100%' }}
            className="p-10 flex justify-center"
          >
            <div
              className=" rounded-lg p-10 shadow-2xl border-2 "
              style={{ width: '100%', textAlign: 'center' }}
            >
              <div className=" flex justify-center ">
                <QRCode value={qrCodeValue} size={200} />
              </div>
              <p className=" pt-2">Scan the QR code to see your information</p>
              {/* <div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 className='font-bold pb-4'>Form Data</h2>
                  <table className="table-auto">
                    <tbody className=' border '>
                      <tr className=' '>
                        <td className="px-4 py-2 border">Full Name</td>
                        <td className="px-4 py-2 border">{generatedData.fname}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Date of Birth</td>
                        <td className="px-4 py-2 border">{generatedData.dob}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Mobile Number</td>
                        <td className="px-4 py-2 border">{generatedData.mobile}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Aadhar number</td>
                        <td className="px-4 py-2 border">{generatedData.aadhar}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Validity Authority</td>
                        <td className="px-4 py-2 border">{generatedData.validityAuthority}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Licensee Aadhar No</td>
                        <td className="px-4 py-2 border">{generatedData.LicenseeId}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Police Verification Date</td>
                        <td className="px-4 py-2 border">{generatedData.policeVarificationDate}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Medical Validity Date</td>
                        <td className="px-4 py-2 border">{generatedData.medicalValidityDate}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">QR Code</td>
                        <td className="px-4 py-2 border">{generatedData.qrcode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
