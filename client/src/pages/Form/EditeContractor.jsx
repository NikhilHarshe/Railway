import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { UploadButton } from '@bytescale/upload-widget-react';
import { LiaCheckDoubleSolid } from 'react-icons/lia';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function EditeContractor() {
    const { isEditContractor } = useSelector(state => state.contractor);
    const location = useLocation();
    const contractor = location.state?.invigilator || {};

    console.log("Contractor ", contractor);

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
        isStationService: false,
        authorityDocument: '',
        PFPermitted: [],
        StationNames: [],
        trainList: []
    });

    // Use useEffect to set the form data when contractor data is available
    useEffect(() => {
        if (contractor) {
            setFormData(prevFormData => ({
                ...prevFormData,
                ...contractor,
                PFPermitted: contractor.pfPermitted || [],
                StationNames: contractor.stationName || [],
                trainList: contractor.trainList || []
            }));
        }
    }, [contractor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleStationChange = (index, field, value) => {
        const updatedStationNames = [...formData.StationNames];
        updatedStationNames[index] = {
            ...updatedStationNames[index],
            [field]: value,
        };
        setFormData(prevFormData => ({ ...prevFormData, StationNames: updatedStationNames }));
    };

    const addStation = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            StationNames: [...prevFormData.StationNames, { SName: '' }],
        }));
    };

    const removeStation = (index) => {
        const updatedStationNames = [...formData.StationNames];
        updatedStationNames.splice(index, 1);
        setFormData(prevFormData => ({ ...prevFormData, StationNames: updatedStationNames }));
    };

    const handlePFPermittedChange = (index, field, value) => {
        const updatedPFPermitted = [...formData.PFPermitted];
        updatedPFPermitted[index] = {
            ...updatedPFPermitted[index],
            [field]: value,
        };
        setFormData(prevFormData => ({ ...prevFormData, PFPermitted: updatedPFPermitted }));
    };

    const addPFPermitted = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            PFPermitted: [...prevFormData.PFPermitted, { PFPermitted: '' }],
        }));
    };

    const removePFPermitted = (index) => {
        const updatedPFPermitted = [...formData.PFPermitted];
        updatedPFPermitted.splice(index, 1);
        setFormData(prevFormData => ({ ...prevFormData, PFPermitted: updatedPFPermitted }));
    };

    const handleSave = async () => {
        try {
            if (formData) {
                console.log('generatedData ', formData);
                const response = await axios.post(
                    `${baseUrl}/contractor/registercontractor`,
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
            setFormData(prevFormData => ({
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
            setFormData(prevFormData => ({
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
        setTrainList(prevTrainList => [
            ...prevTrainList,
            trainName,
        ]);
    };

    const handleTrainRemove = (nameToRemove) => {
        const updatedOptions = trainList.filter(
            (option) => option.toLowerCase() !== nameToRemove.toLowerCase(),
        );
        setTrainList(updatedOptions);
    };

    const addTrains = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            trainList: trainList,
        }));
    }

    useEffect(() => {
        addTrains();
    }, [trainList]);

    console.log("form data train:", formData);


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
                                        <div onClick={handleTypeClick} className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Type of Contract{' '}
                                                <span className=" text-red-600 text-lg">*</span>
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
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
                                                    <option value="" disabled>
                                                        Type of Contract
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
                                                        // onMouseEnter={toggleDropdown}
                                                        // onMouseLeave={toggleDropdown2}

                                                        // onBlur={toggleDropdown2}
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
                                                    {trainList.map((item) => (
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
                                                name="category"
                                                value={formData.category}
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
                                            name="fromDate"
                                            value={formData.fromDate}
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
                                            name="toDate"
                                            value={formData.toDate}
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
                                            name="licence_fees_paid_upto"
                                            value={formData.licence_fees_paid_upto}
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
                                            name="licensee"
                                            value={formData.licensee}
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
                                            name="Licensee_Contact_details"
                                            value={formData.Licensee_Contact_details}
                                            onChange={handleChange}
                                            placeholder="Enter Licensee Contact Details"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    {/* Upload Authority Pic */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Upload Authority Pic{' '}
                                            <span className=" text-red-600 text-lg">*</span>
                                        </label>
                                        <UploadButton
                                            options={options}
                                            onComplete={(files) =>
                                                setAuthority(files.map((x) => x.fileUrl).join('\n'))
                                            }
                                        >
                                            {({ onClick }) => (
                                                <button
                                                    className={` border p-2 rounded ${Authority ? 'border-green-700' : 'pt-3'
                                                        }`}
                                                    onClick={onClick}
                                                >
                                                    {Authority ? (
                                                        <p className=" flex gap-2">
                                                            Uploaded{' '}
                                                            <LiaCheckDoubleSolid className=" text-green-500 font-bold text-2xl" />
                                                        </p>
                                                    ) : (
                                                        'Upload a file...'
                                                    )}
                                                </button>
                                            )}
                                        </UploadButton>
                                    </div>
                                    {/* Vendors Permitted */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Vendors Permitted{' '}
                                            <span className=" text-red-600 text-lg">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="vendors_permitted"
                                            value={formData.vendors_permitted}
                                            onChange={handleChange}
                                            placeholder="Enter Vendors Permitted"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    {/* Is Station Service */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Is Station Service{' '}
                                            <span className=" text-red-600 text-lg">*</span>
                                        </label>
                                        <div className=" flex  gap-16">
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="stationServiceYes"
                                                    name="isStationService"
                                                    value="Yes"
                                                    checked={formData.isStationService === 'Yes'}
                                                    style={{ accentColor: 'green' }}
                                                    onChange={handleChange}
                                                    className="mr-2 radiobtn"
                                                />
                                                <label htmlFor="stationServiceYes">Yes</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="stationServiceNo"
                                                    name="isStationService"
                                                    value="No"
                                                    checked={formData.isStationService === 'No'}
                                                    style={{ accentColor: 'green' }}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="stationServiceNo">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Station Name */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Station Name
                                            <span className=" text-red-600 text-lg">*</span>
                                        </label>
                                        {/* {formData.StationNames.map((StationName, index) => (
                                            <div key={index} className="mb-4 flex items-center">
                                                <input
                                                    type="text"
                                                    value={StationName.SName}
                                                    onChange={(e) =>
                                                        handleStationChange(index, 'SName', e.target.value)
                                                    }
                                                    placeholder="Station Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeStation(index)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))} */}
                                        <button
                                            type="button"
                                            onClick={addStation}
                                            className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add Station
                                        </button>
                                    </div>

                                    {/* Platforms Permitted */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Platforms Permitted
                                            <span className=" text-red-600 text-lg">*</span>
                                        </label>
                                        {/* {formData.PFPermitted.map((PFPermitted, index) => (
                                            <div key={index} className="mb-4 flex items-center">
                                                <input
                                                    type="text"
                                                    value={PFPermitted.Platform}
                                                    onChange={(e) =>
                                                        handlePFPermittedChange(
                                                            index,
                                                            'PFPermitted',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Platform Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => removePFPermitted(index)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))} */}
                                        <button
                                            type="button"
                                            onClick={addPFPermitted}
                                            className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add Platform
                                        </button>
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
