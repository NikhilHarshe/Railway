import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { UploadButton } from '@bytescale/upload-widget-react';
import { LiaCheckDoubleSolid } from 'react-icons/lia';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function EditeContractor() {
  const baseUrl = 'http://localhost:3000';

  const { isEditContractor } = useSelector((state) => state.contractor);
  const location = useLocation();
  const contractor = location.state?.invigilator || {};

  const [Authority, setAuthority] = useState('');
  const [fieldInput, setFieldInput] = useState(false);
  const [staticfieldInput, setStaticFieldInput] = useState(false);

  const [formData, setFormData] = useState({
    agency: '',
    category: '',
    fromDate: '',
    toDate: '',
    licence_fees_paid_upto: '',
    licensee: '',
    Licensee_Contact_details: '',
    vendors_permitted: '',
    authorityDocument: '',
    trainList: [],
  });

  useEffect(() => {
    if (contractor) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...contractor,
        PFPermitted: contractor.pfPermitted || [],
        StationNames: contractor.stationName || [],
        trainList: contractor.trainList || [],
      }));
    }
  }, [contractor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleStationChange = (index, field, value) => {
    const updatedStationNames = [...formData.StationNames];
    updatedStationNames[index] = {
      ...updatedStationNames[index],
      [field]: value,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      StationNames: updatedStationNames,
    }));
  };

  const addStation = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      StationNames: [...prevFormData.StationNames, { SName: '' }],
    }));
  };

  const removeStation = (index) => {
    const updatedStationNames = [...formData.StationNames];
    updatedStationNames.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      StationNames: updatedStationNames,
    }));
  };

  const handlePFPermittedChange = (index, field, value) => {
    const updatedPFPermitted = [...formData.PFPermitted];
    updatedPFPermitted[index] = {
      ...updatedPFPermitted[index],
      [field]: value,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      PFPermitted: updatedPFPermitted,
    }));
  };

  const addPFPermitted = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      PFPermitted: [...prevFormData.PFPermitted, { PFPermitted: '' }],
    }));
  };

  const removePFPermitted = (index) => {
    const updatedPFPermitted = [...formData.PFPermitted];
    updatedPFPermitted.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      PFPermitted: updatedPFPermitted,
    }));
  };

  const handleSave = async () => {
    try {
      if (formData) {
        console.log('generatedData ', formData);
        const response = await axios.put(
          baseUrl + `/contractor/update`,
          formData,
        );
        if (response) {
          console.log(response);
          alert(`Data saved`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const options = {
    apiKey: 'public_kW15c7QDZR7i1vmbhh26HXrTfHvb',
    maxFileCount: 1,
  };

  useEffect(() => {
    formData.authorityDocument = Authority;
  }, [Authority]);

  useEffect(() => {
    handleDynamicInput();
    handleStaticInput();
  }, [formData.category]);

  const handleDynamicInput = () => {
    if (
      formData.category === 'On board Catering' ||
      formData.category === 'On board Non–Catering'
    ) {
      setFieldInput(true);
      setStaticFieldInput(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        sectionname: [],
      }));
    }
  };

  const handleStaticInput = () => {
    if (
      formData.category === 'Static Unit' ||
      formData.category === 'PF permit'
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
    console.log('Category:', formData.category);
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
  const [trainList, setTrainList] = useState([]);

  useEffect(() => {
    console.log('Array of new train:', trainList);
  }, [trainList]);

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
    setTrainList((prevTrainList) => [...prevTrainList, trainName]);
  };

  const handleTrainRemove = (nameToRemove) => {
    const updatedOptions = trainList.filter(
      (option) => option.toLowerCase() !== nameToRemove.toLowerCase(),
    );
    setTrainList(updatedOptions);
  };

  const addTrains = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      trainList: trainList,
    }));
  };

  useEffect(() => {
    addTrains();
  }, [trainList]);

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
                  Contractor
                </h3>
              </div>

              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Contractor Agency
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Contractor Agency"
                    name="agency"
                    value={formData.agency}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onClick={handleTypeClick}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                {fieldInput && (
                  <>
                    <div className="relative">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Train Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Train Name"
                        onClick={toggleDropdown}
                        onChange={handleFilterChange}
                        value={filter}
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      />
                      {isInputVisible && (
                        <ul className="absolute left-0 w-full bg-white border border-stroke rounded-lg mt-1 max-h-48 overflow-y-auto">
                          {filteredOptions.map((option, index) => (
                            <li
                              key={index}
                              onClick={() => handleTrainClick(option)}
                              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {trainList.map((train, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 rounded-lg py-1 px-3 flex items-center"
                        >
                          {train}
                          <button
                            onClick={() => handleTrainRemove(train)}
                            className="ml-2 text-red-500"
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {staticfieldInput && (
                  <>
                    <div className="flex flex-col gap-3">
                      {formData.StationNames.map((station, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Enter Station Name"
                            value={station.SName}
                            onChange={(e) =>
                              handleStationChange(
                                index,
                                'SName',
                                e.target.value,
                              )
                            }
                            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                          />
                          <button
                            onClick={() => removeStation(index)}
                            className="text-red-500"
                          >
                            <MdOutlineCancel />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button onClick={addStation} className="mt-3 text-blue-500">
                      + Add Station
                    </button>
                  </>
                )}

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    From Date
                  </label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    To Date
                  </label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Licence Fees Paid Upto
                  </label>
                  <input
                    type="date"
                    name="licence_fees_paid_upto"
                    value={formData.licence_fees_paid_upto}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Licensee
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Licensee"
                    name="licensee"
                    value={formData.licensee}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Licensee Contact Details
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Licensee Contact Details"
                    name="Licensee_Contact_details"
                    value={formData.Licensee_Contact_details}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Vendors Permitted
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Vendors Permitted"
                    name="vendors_permitted"
                    value={formData.vendors_permitted}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Authority Document
                  </label>
                  <UploadButton
                    onChange={(files) => {
                      if (files.length > 0) {
                        setAuthority(files[0].fileUrl);
                      }
                    }}
                    options={options}
                    text="Upload Document"
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4.5 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="mt-5 w-full rounded-lg bg-primary py-3 px-4.5 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}
