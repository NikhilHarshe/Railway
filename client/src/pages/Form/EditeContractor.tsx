import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { toast, useToaster } from 'react-hot-toast';

export default function EditeContractor() {
  const { isEditContractor } = useSelector((state) => state.contractor);
  const [formData, setFormData] = useState({
    agency: '',
    typeofcontract: '',
    ContractperiodFrom: '',
    ContractperiodTo: null,
    LicenseFeesPaidUptoDate: '',
    Licenseename: '',
    // LicenseeAadharNo: '',
    Licenseecontactdetails: '',
    VendorsPermitted: '',
    // IsStationService: false,
    AutherityDoc: null,
    // PFPermitted: [],
    // nameofstation: [],
  });
  const location = useLocation();
  const { invigilator } = location.state || {};
  console.log('invigilator data ', invigilator);

  useEffect(() => {
    if (invigilator) {
      setFormData({
        agency: invigilator.agency || '',
        typeofcontract: invigilator.category || '',
        ContractperiodFrom: invigilator.fromDate
          ? invigilator.fromDate.slice(0, 10)
          : '',
        ContractperiodTo: invigilator.toDate
          ? invigilator.toDate.slice(0, 10)
          : '',
        LicenseFeesPaidUptoDate: invigilator.licence_fees_paid_upto
          ? invigilator.licence_fees_paid_upto.slice(0, 10)
          : '',
        Licenseename: invigilator.licensee || '',
        Licenseecontactdetails: invigilator.Licensee_Contact_details || '',
        VendorsPermitted: invigilator.vendors_permitted || '',
        nameofstation: invigilator.nameofstation || [],
        sectionname: invigilator.sectionname || [],
        AutherityDoc: invigilator.authorityDocument || null, // Assuming authorityDocument is handled separately (not in invigilator)
        // Add other fields as needed
      });
      setSelectedTrains(invigilator.selectedTrains || []);
    }
  }, [invigilator]);


  console.log('isEdite contrcator ', isEditContractor);
  const baseUrl = 'http://localhost:3000';
  // const baseUrl = "https://railway-qbx4.onrender.com";
  const clientUrl = 'http://crease-railway-8njx.vercel.app';

  // const [Authority, setAuthority] = useState('');
  const [fieldInput, setFieldInput] = useState(false);
  const [staticfieldInput, setStaticFieldInput] = useState(false);
  const [nameofstation, setNameofstation] = useState('');


  const [generatedData, setGeneratedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'AutherityDoc') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };



  const handleSave = async () => {
    // const { addToast } = useToaster(); 
    // const toastId = addToast('Loading...', { duration: 4000 }); 
    try {
      if (formData) {
        formData['contractorId'] = invigilator.contractorId;

        let updatedFormData = { ...formData }

        console.log('updatedFormData: ', updatedFormData);
        const response = await axios.put(
          baseUrl + '/contractor/update',
          updatedFormData,

          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response) {
          console.log('Response from backend: ', response);
          //  addToast('Data Saved', { type: 'success' });
          alert('Data Saved Succcessfully')
        }
      }
    } catch (error) {
      console.log('Error: ', error);

      // Check if error.response exists and has data and message properties
      // if (
      //   error.response &&
      //   error.response.data &&
      //   error.response.data.message
      // ) {
      //   toast.error(error.response.data.message);
      // } else {
      //   // Handle other types of errors (network error, etc.)
      //   toast.error('An error occurred while saving data.');
      // }
    }
    // finally {
    //   toast.dismiss(toastId);
    // }
  };


  useEffect(
    () => (handleDynamicInput(), handleStaticInput()),
    [formData.typeofcontract],
  );

  const handleDynamicInput = () => {
    if (
      formData.typeofcontract === 'On board Catering' ||
      formData.typeofcontract === 'On board Non–Catering'
    ) {
      setFieldInput(true);
      setStaticFieldInput(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        sectionname: [],
      }));
      console.log('handleDynamicInput form data: ', formData);
    }
  };

  const handleStaticInput = () => {
    // alert('hi')
    if (
      formData.typeofcontract === 'Static Unit' ||
      formData.typeofcontract === 'PF permit'
    ) {
      setStaticFieldInput(true);
      setFieldInput(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        nameofstation: [],
      }));
    }
  };

  const handleTypeClick = () => {
    console.log('lllllllllllllll', formData.typeofcontract);
  };

  const [isInputVisible, setInputVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [trainsName] = useState([
    'Maharashtra_Exp',
    'Puri_Surat_Weekly_SF_Express',
    'Surat_Puri_Weekly_SF_Express',
    'Hapa_Bilaspur_SF_Express',
    'Prerana_Express',
    'Hatia_Pune_SF_Express',
    'Pune_Hatia_SF_Express',
    'Shalimar_Mumbai_LTT_(Kurla)_Express.',
    'Mumbai_LTT_Shalimar_(Kurla)_Express.',
    'Malda_Town_Surat_Express.',
    'Surat_Malda_Town_Express.',
    'Bilaspur_Hapa_S_Express.',
    'Vidarbha_SF_Express',
    'Vidarbha_SF_Express',
  ]);
  const [selectedTrains, setSelectedTrains] = useState([]);

  useEffect(() => {
    console.log('ggggggggggggggggg', typeof selectedTrains);
  }, [selectedTrains]);

  const toggleDropdown = () => {
    setInputVisible(true);
  };
  const toggleDropdown2 = () => {
    setInputVisible(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOptions = trainsName.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleTrainClick = (trainName) => {
    setSelectedTrains((prevSelectedTrains) => [
      ...prevSelectedTrains,
      trainName,
    ]);
  };
  const handleTrainRemove = (nameToRemove) => {
    const updatedOptions = selectedTrains.filter(
      (option) => !option.toLowerCase().includes(nameToRemove.toLowerCase()),
    );
    setSelectedTrains(updatedOptions);
  };

  const addTrains = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedTrains,
    }));
  };

  useEffect(() => {
    addTrains();
  }, [selectedTrains]);

  console.log('form data train :', formData);

  const [imageToShow, setImageToShow] = useState(null);
  const handleViewImage = (image) => {
    if (image && typeof image !== 'string') {
      setImageToShow(URL.createObjectURL(image));
    } else {
      setImageToShow(image);
    }
  };

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
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Contractor
                </h3>
              </div>
              <form>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {/* Contract allotting Agency */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Contract allotting Agency{' '}
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <select
                        name="agency"
                        value={formData.agency}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Contract Allocating Agency
                        </option>
                        <option value="Railway">Railway</option>
                        <option value="IRCTC">IRCTC</option>
                      </select>
                    </div>
                    <div onClick={handleTypeClick} className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Type of Contract{' '}
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <select
                        name="typeofcontract"
                        value={formData.typeofcontract}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Type of Contract
                        </option>
                        <option
                          onClick={handleDynamicInput}
                          value="On board Catering"
                        >
                          On board Catering
                        </option>
                        <option
                          onClick={handleDynamicInput}
                          value="On board Non–Catering"
                        >
                          On board Non–Catering
                        </option>
                        <option onClick={handleStaticInput} value="PF permit">
                          PF permit
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Static Unit
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Parking
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Parcel Handling
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Station Cleaning
                        </option>
                      </select>
                    </div>
                  </div>
                  {fieldInput && (
                    <div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Section Names{' '}
                          <span className=" text-red-600 text-lg">*</span>
                        </label>
                        <select
                          name="sectionname"
                          value={formData.sectionname[0]}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            Select section
                          </option>
                          <option value="Nagpur to Betul">
                            Nagpur to Betul
                          </option>
                          <option value="Nagpur to Vardha">
                            Nagpur to Vardha
                          </option>
                          <option value="Nagpur to Pune">Nagpur to Pune</option>
                          <option value="Nagpur to Mumbai">
                            Nagpur to Mumbai
                          </option>
                        </select>
                      </div>

                      <div className="w-full gap-12 flex">
                        <div>
                          <p className="mb-2.5 block text-black dark:text-white pt-2">
                            Train List
                            <span className=" text-red-600 text-lg">*</span>
                          </p>
                          <div
                            // className="dropdown border border-red-300 px-3 py-2"
                            style={{
                              position: 'relative',
                              display: 'inline-block',
                            }}
                          >
                            <input
                              type="text"
                              value={filter}
                              // value={formData.trainList}
                              onChange={handleFilterChange}
                              //  onChange={handleChange}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              style={{
                                display: true ? 'inline-block' : 'none',
                              }}
                              onFocus={toggleDropdown}
                            />
                            {isInputVisible && (
                              <div
                                onMouseEnter={toggleDropdown}
                                onMouseLeave={toggleDropdown2}
                                className="dropdown-content"
                                style={{
                                  display: 'block',
                                  position: 'absolute',
                                  backgroundColor: '#f9f9f9',
                                  minWidth: '160px',
                                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                  zIndex: 1,
                                }}
                              >
                                {filteredOptions.map((option, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleTrainClick(option)}
                                    style={{
                                      color: 'black',
                                      padding: '12px 16px',
                                      textDecoration: 'none',
                                      display: 'block',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="mb-1 block text-black dark:text-white pt-3">
                            Selected Trais{' '}
                            <span className=" text-red-600 text-lg">*</span>
                          </p>
                          {selectedTrains.map((item) => (
                            <p className=" flex align-middle items-center justify-between gap-3">
                              {item}{' '}
                              <MdOutlineCancel
                                className=" text-red-500"
                                onClick={() => handleTrainRemove(item)}
                              />
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {staticfieldInput && (
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Names of Station
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <select
                        name="nameofstation"
                        value={setNameofstation}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Station Names
                        </option>
                        <option value="Nagpur to Betul">Nagpur to Betul</option>
                        <option value="Nagpur to Vardha">
                          Nagpur to Vardha
                        </option>
                        <option value="Nagpur to Pune">Nagpur to Pune</option>
                        <option value="Nagpur to Mumbai">
                          Nagpur to Mumbai
                        </option>
                      </select>
                    </div>
                  )}
                  {/* Contract Period From */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contract Period From{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="date"
                      name="ContractperiodFrom"
                      value={formData.ContractperiodFrom}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Contract Period To */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contract Period To{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="date"
                      name="ContractperiodTo"
                      value={formData.ContractperiodTo}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* License Fees Paid Upto Date  */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      License Fees Paid Upto Date{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="date"
                      name="LicenseFeesPaidUptoDate"
                      value={formData.LicenseFeesPaidUptoDate}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Licensee Name */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Licensee Name{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      name="Licenseename"
                      value={formData.Licenseename}
                      onChange={handleChange}
                      placeholder="Enter Licensee Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Licensee Contact Details */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Licensee Contact Details{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="number"
                      name="Licenseecontactdetails"
                      value={formData.Licenseecontactdetails}
                      onChange={handleChange}
                      placeholder="Enter Licensee Contact Details"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className='flex flex-col pb-5 gap-2'>
                    <label htmlFor="AutherityDoc" className="mb-2.5 block text-black dark:text-white">
                    Uploade Autherity Document <span className='text-red-600 text-lg'>*</span>
                    </label>
                    <input type="file" name='AutherityDoc' onChange={handleChange} />
                    <button
                      type="button"
                      onClick={() => handleViewImage(formData.AutherityDoc)}
                      className="text-blue-500 inline-flex"
                    >
                      View
                    </button>
                  </div>

                  {/* Vendors Permitted */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Vendors Permitted{' '}
                      <span className=" text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="number"
                      name="VendorsPermitted"
                      value={formData.VendorsPermitted}
                      onChange={handleChange}
                      placeholder="Enter Vendors Permitted"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-col items-center">
              {/* <QRCode value={qrCodeValue} /> */}
              <button
                onClick={handleSave}
                className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save
              </button>
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
    </div>
  );
}
