import DefaultLayout from '../../layout/DefaultLayout';
import { UploadButton } from "@bytescale/upload-widget-react";
import QRCode from 'qrcode.react';
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { useRef, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormLayout = () => {

  const baseUrl = "https://railway-qbx4.onrender.com";
  // const baseUrl = "http://localhost:3000";
  // const baseUrl = process.env.REACT_APP_API_BASE_URL;
  // const clientUrl = process.env.REACT_APP_CLIENT_BASE_URL;
  const clientUrl = "https://railway-kappa.vercel.app/"

  const [profilePic, setProfilePic] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [policeVarificationDocument, setPoliceVarificationDocument] = useState("");
  const [madicalValidityDocument, setMadicalValidityDocument] = useState("");
  const [success, setSuccess] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    dob: '',
    mobile: '',
    profilePic: '',
    aadhar: '',
    aadharCard: '',
    policeVarificationDate: '',
    policeVarificationDocument: '',
    medicalValidityDate: '',
    madicalValidityDocument: '',
    validityAuthority: '',
    LicenseeAadharNo: '',
    qrcode: '',
  });

  const [generatedData, setGeneratedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateQRCode = (e) => {
    e.preventDefault()
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    const updatedFormData = { ...formData, qrcode: result };

    let result2 = clientUrl + `/#/venderDetails/${result}`;


    setQRCodeValue(result2);
    setGeneratedData(updatedFormData);
    setSuccess(true);

    setProfilePic(profilePic);
    setAadharCard(aadharCard);
    setPoliceVarificationDocument(policeVarificationDocument);
    setMadicalValidityDocument(madicalValidityDocument);
    console.log('Generated QR Code:', result);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    if (Object.values(generatedData).some(value => value === '')) {
      console.log("generatedData : ", generatedData);
      alert('Any of the fields is empty');
      return
    } else {
      try {
        console.log('Submitting formData:', generatedData);
        const response = await axios.post(baseUrl + '/vendor/registerVendor', generatedData);
        alert('Data saved successfully');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Invoice",
  });

  const options = {
    apiKey: "public_12a1yyQ4Dbt9UDABRk4Budpc2L8v",
    maxFileCount: 1
  };

  formData.profilePic = profilePic;
  formData.aadharCard = aadharCard;
  formData.madicalValidityDocument = madicalValidityDocument;
  formData.policeVarificationDocument = policeVarificationDocument

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
                Register Vendor
              </h3>
            </div>
            <form style={{}} action="#">
              <div className="p-6.5" >
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                  {/* name */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Full Name <span className=' text-red-600 text-lg'>*</span>
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
                      Date of Birth <span className=' text-red-600 text-lg'>*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"  // Corrected name attribute
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* Mobile Number */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Mobile Number <span className=' text-red-600 text-lg'>*</span>
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

                  {/* Aadhar number */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Aadhar number <span className="text-meta-1">*</span>
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
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Aadhar Pic <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setAadharCard(files.map((x) => x.fileUrl).join("\n"))
                    }
                  >
                    {({ onClick }) =>
                      <button className={` border p-2 rounded ${aadharCard ? ("border-green-700") : ("pt-3")}`} onClick={onClick}>
                        {aadharCard ? (<p className=' flex gap-2'>Uploaded <LiaCheckDoubleSolid className=' text-green-500 font-bold text-2xl' /></p>) : ("Upload a file...")}
                      </button>
                    }
                  </UploadButton>
                </div>

                {/* Upload PoliceVarification Document */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload PoliceVarification Document <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setPoliceVarificationDocument(files.map((x) => x.fileUrl).join("\n"))
                    }
                  >
                    {({ onClick }) =>
                      <button className={` border p-2 rounded ${policeVarificationDocument ? ("border-green-700") : ("pt-3")}`} onClick={onClick}>
                        {policeVarificationDocument ? (<p className=' flex gap-2'>Uploaded <LiaCheckDoubleSolid className=' text-green-500 font-bold text-2xl' /></p>) : ("Upload a file...")}
                      </button>
                    }
                  </UploadButton>
                </div>

                {/* Upload MadicalValidity Document */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload MadicalValidity Document <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setMadicalValidityDocument(files.map((x) => x.fileUrl).join("\n"))
                    }
                  >
                    {({ onClick }) =>
                      <button className={` border p-2 rounded ${madicalValidityDocument ? ("border-green-700") : ("pt-3")}`} onClick={onClick}>
                        {madicalValidityDocument ? (<p className=' flex gap-2'>Uploaded <LiaCheckDoubleSolid className=' text-green-500 font-bold text-2xl' /></p>) : ("Upload a file...")}
                      </button>
                    }
                  </UploadButton>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Police Varification Date <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <input
                    type="date"
                    name="policeVarificationDate"
                    value={formData.policeVarificationDate}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Medical validity */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Medical validity <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <input
                    type="date"
                    name="medicalValidityDate"  // Corrected name attribute
                    value={formData.medicalValidityDate}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Validity of Authority */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Validity of Authority <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <input
                    type="text"
                    name="validityAuthority"
                    value={formData.validityAuthority}
                    onChange={handleChange}
                    placeholder="Enter validity Authority"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Licensee AadharNo */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Licensee Aadhar No. <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <input
                    type="text"
                    name="LicenseeAadharNo"
                    value={formData.LicenseeAadharNo}
                    onChange={handleChange}
                    maxLength={12}
                    minLength={12}
                    pattern="[0-9]*"
                    placeholder="Enter Licensee Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Upload Profile Pic */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Profile Pic <span className=' text-red-600 text-lg'>*</span>
                  </label>
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setProfilePic(files.map((x) => x.fileUrl).join("\n"))
                    }
                  >
                    {({ onClick }) =>
                      <button className={` border p-2 rounded ${profilePic ? ("border-green-700") : ("pt-3")}`} onClick={onClick}>
                        {profilePic ? (<p className=' flex gap-2'>Uploaded <LiaCheckDoubleSolid className=' text-green-500 font-bold text-2xl' /></p>) : ("Upload a file...")}
                      </button>
                    }
                  </UploadButton>
                </div>


                <button onClick={generateQRCode} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Generate Qr Code
                </button>
                {success && qrCodeValue && (
                  <div>
                    <div ref={componentPDF} style={{ textAlign: 'center', marginTop: '20px' }}>
                      <QRCode value={qrCodeValue} />
                    </div>

                    <button onClick={generatePDF}>Download QR Code</button>
                  </div>
                )}
                <button onClick={handleSave} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-9"></div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
