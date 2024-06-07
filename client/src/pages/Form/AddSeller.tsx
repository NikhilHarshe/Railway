import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { UploadButton } from "@bytescale/upload-widget-react";
import QRCode from 'qrcode.react';
import { useState } from 'react';
import axios from 'axios';

const baseUrl = "https://crease-railway.onrender.com";
// const baseUrl = process.env.REACT_APP_API_BASE_URL;
// const clientUrl = process.env.REACT_APP_CLIENT_BASE_URL;
const clientUrl = "http://crease-railway-8njx.vercel.app"

export default function AddSeller() {
  const [profilePic, setProfilePic] = useState("");
  const [success, setSuccess] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    designation: '',
    contractor: '',
    qrcode: '',
    profilePic: '',
  });

  const [generatedData, setGeneratedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    const updatedFormData = { ...formData, qrcode: result };

    let result2 = clientUrl + `/#/contractorDetails/${result}`;

    setQRCodeValue(result2);
    setGeneratedData(updatedFormData);
    setSuccess(true);
    setProfilePic(profilePic);
  };

  const handleSave = async () => {
    try {
      if (generatedData) {

        const response = await axios.post(baseUrl + '/seller/registerseller', generatedData);
        if (response) {
          console.log(response);
          setSuccess(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const options = {
    apiKey: "public_12a1yyQ4Dbt9UDABRk4Budpc2L8v",
    maxFileCount: 1
  };
  formData.profilePic = profilePic;
  console.log('xxxx', formData);
  return (
    <div>
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
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Register Seller
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Enter your designation"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contractor
                    </label>
                    <input
                      type="text"
                      name="contractor"
                      value={formData.contractor}
                      onChange={handleChange}
                      placeholder="Enter contractor"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Upload Profile Pic
                    </label>
                    <UploadButton
                      options={options}
                      onComplete={(files) =>
                        setProfilePic(files.map((x) => x.fileUrl).join("\n"))
                      }
                    >
                      {({ onClick }) =>
                        <button onClick={onClick}>
                          Upload a file...
                        </button>
                      }
                    </UploadButton>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Generate QR Code
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {success && qrCodeValue && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <QRCode style={{ margin: '10px 0' }} value={qrCodeValue} />
            <button
              onClick={handleSave}
              style={{
                margin: '10px',
                width: '150px',
                height: '35px',
                color: 'black',
                borderRadius: '10px',
                backgroundColor: 'white'
              }}
            >
              Save to Database
            </button>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}