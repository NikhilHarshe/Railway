import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { trainsName } from './TrainNames';
import { sectionName } from './SectionNames';
import { stationNames } from './StationNames'

export default function AddContractor() {
  const { isEditContractor } = useSelector((state) => state.contractor);
  const location = useLocation();
  const { invigilator } = location.state || {};
  console.log('invigilator data ', invigilator);

  console.log('isEdite contrcator ', isEditContractor);
  // const baseUrl = 'http://localhost:3000';
  const baseUrl = "https://railway-qbx4.onrender.com";
  const clientUrl = 'http://crease-railway-8njx.vercel.app';

  // const [Authority, setAuthority] = useState('');
  const [fieldInput, setFieldInput] = useState(false);
  const [staticfieldInput, setStaticFieldInput] = useState(false);
  const [filterStationName, setFilterStationName] = useState('');

  const [formData, setFormData] = useState({
    agency: '',
    typeofcontract: '',
    ContractperiodFrom: '',
    ContractperiodTo: '',
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

  const [generatedData, setGeneratedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log("name : ", name, "  value: ", value);

    if (name === 'AutherityDoc') {
      // console.log("In side function ")
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    const toastId = toast.loading('Loading...');
    try {
      // setAuthority(Authority);
      if (formData) {
        console.log('generatedData ', formData);
        const response = await axios.post(
          baseUrl + '/contractor/registercontractor',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // toast.dismiss(toastId);
        if (response) {
          console.log('responce of backend ', response);
          alert(`Data saved`);
        }
      }
    } catch (error) {
      console.error('this is Error :', error);
      console.log('messgae', error.response.data.message);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
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
      console.log('pppppppppppp', formData);
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
    }
  };

  const [isInputVisible, setInputVisible] = useState(false);
  const [filter, setFilter] = useState('');
  
  const [selectedTrains, setSelectedTrains] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);

  const toggleDropdown = () => {
    setInputVisible(true);
  };
  const toggleDropdown2 = () => {
    setInputVisible(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOptions = trainsName
    .filter((option) => option.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, 10);

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
  const handleStationRemove = (nameToRemove) => {
    const updatedOptions = selectedStations.filter(
      (option) => !option.toLowerCase().includes(nameToRemove.toLowerCase()),
    );
    setSelectedStations(updatedOptions);
  };

  const addTrains = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedTrains,
    }));
  };

  const addStation = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedStations,
    }));
  };

  useEffect(() => {
    addTrains();
    addStation()
  }, [selectedTrains,selectedStations]);

  const handleStationNameChange = (e) => {
    setFilterStationName(e.target.value)
  }
  const toggleStationNameDropdown = () => {
    setInputVisible(true)
  }
  

   const filteredStationNamesOptions = stationNames
     .filter((option) =>
       option.toLowerCase().includes(filterStationName.toLowerCase()),
     )
     .slice(0, 5);
   const handleStationNameClick = (stationNames) => {
     setSelectedStations((prevSelectedTrains) => [
       ...prevSelectedTrains,
       stationNames,
      ]);
     console.log('dddddddddddd', selectedStations);
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
                  Register Contractor
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
                    <div className="w-full xl:w-1/2">
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
                          value={formData.sectionname}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          {sectionName.map((item) => (
                            <option>{item}</option>
                          ))}
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
                                  color: 'black',
                                  position: 'absolute',
                                  backgroundColor: '#f9f9f9',
                                  minWidth: '350px',
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
                            Selected Trains{' '}
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
                    <div className="flex">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Names of Station
                          <span className=" text-red-600 text-lg">*</span>
                        </label>
                        <input
                          name="selectedStations"
                          value={filterStationName}
                          onChange={handleStationNameChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onFocus={toggleStationNameDropdown}
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
                              minHeight: '100px',
                              boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                              zIndex: 1,
                            }}
                          >
                            {filteredStationNamesOptions.map(
                              (option, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleStationNameClick(option)}
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
                              ),
                            )}
                          </div>
                        )}
                      </div>

                      <div className="ml-[50px] mt-[-10px]">
                        <p className="mb-1 block text-black dark:text-white pt-3">
                          Selected Station{' '}
                          <span className=" text-red-600 text-lg">*</span>
                        </p>
                        {selectedStations.map((item) => (
                          <p className="flex align-middle items-center justify-between gap-3 ">
                            {item}{' '}
                            <MdOutlineCancel
                              className=" text-red-500"
                              onClick={() => handleStationRemove(item)}
                            />
                          </p>
                        ))}
                      </div>
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

                  <div className=" flex flex-col pb-5 gap-2">
                    <label
                      htmlFor="AutherityDoc"
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      Uploade Autherity Document
                    </label>
                    <input
                      type="file"
                      name="AutherityDoc"
                      onChange={handleChange}
                    />
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
      </DefaultLayout>
    </div>
  );
}
