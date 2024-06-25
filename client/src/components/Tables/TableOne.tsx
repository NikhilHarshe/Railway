import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImWrench } from 'react-icons/im';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setIsEditContractor } from '../../redux/slices/ContractorSlice';
import DefaultLayout from '../../layout/DefaultLayout';
import toast from 'react-hot-toast';

let Length = createContext();

const TableOne = () => {
  const dispatch = useDispatch();
  // const baseUrl = 'http://localhost:3000';
  const baseUrl = "https://railway-qbx4.onrender.com";
  const clientUrl = 'http://crease-railway-8njx.vercel.app';

  let navigate = useNavigate();
  const [newfilteredInvigilators, setFilteredInvigilators] = useState([]);
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [invigilators, setInvigilators] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [invigilatorToDelete, setInvigilatorToDelete] = useState(null);

  const filteredInvigilators = newfilteredInvigilators.reverse();

  const handleDelete = async (_id) => {
    const toastId = toast.loading('Loading...');
    try {
      setShowDeleteConfirmation(false);
      await axios.delete(baseUrl + `/contractor/delete/${_id}`);
      setInvigilators(
        invigilators.filter((invigilator) => invigilator._id !== _id),
      );
      toast.success("Data Deleted Successfully");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    const fetchInvigilators = async () => {
      try {
        const response = await axios.get(
          baseUrl + '/contractor/fetchcontractordata',
        );
        setInvigilators(response.data);
      } catch (error) {
        console.error('Error fetching invigilator data:', error);
      }
    };

    fetchInvigilators();
  }, []);

  const handleContractorList = (invigilator) => {
    navigate('/vendorsData', { state: { invigilator } });
  };

  const handleDeleteClick = (_id) => {
    setShowDeleteConfirmation(true);
    setInvigilatorToDelete(_id);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setInvigilatorToDelete(null);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString();
  }

  function isWithinFifteenDays(date) {
    const currentDate = new Date();
    const futureDate = new Date(currentDate); // Create a copy of the current date
    futureDate.setDate(currentDate.getDate() + 5); // Set the future date to 15 days from now
    const givenDate = new Date(date); // Convert the input date to a Date object

    console.log('futureDate:', futureDate);
    console.log('givenDate:', givenDate);

    if (futureDate >= givenDate) {
      return true;
    } else {
      return false;
    }
  }


  const handleAgency = (e) => {
    let agency = e.target.value;
    if (agency === '') {
      setFilteredInvigilators(invigilators);
    } else {
      let agencyFilter = invigilators.filter((item) => item.agency === agency);
      setFilteredInvigilators(agencyFilter);
    }
  };

  const handleCategory = (e) => {
    let category = e.target.value;
    if (category === '') {
      setFilteredInvigilators(invigilators);
    } else {
      let categoryFilter = invigilators.filter(
        (item) => item.category === category,
      );
      setFilteredInvigilators(categoryFilter);
    }
  };

  const handleInitialDateChange = (e) => {
    setInitialDate(e.target.value);
  };

  const handleFinalDateChange = (e) => {
    setFinalDate(e.target.value);
  };

  const handleDate = () => {
    if (initialDate !== '' && finalDate !== '') {
      let filteredDate = invigilators.filter((item) => {
        const fromDate = new Date(item.fromDate);
        const toDate = new Date(item.toDate);
        const initDate = new Date(initialDate);
        const finDate = new Date(finalDate);
        return fromDate >= initDate && toDate <= finDate;
      });
      setFilteredInvigilators(filteredDate);
    }
  };

  useEffect(() => {
    setFilteredInvigilators(invigilators);
  }, [invigilators]);

  useEffect(() => {
    handleDate();
  }, [initialDate, finalDate]);

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <DefaultLayout>
      <div
        style={{ overflowX: 'auto', width: '1200px' }}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex flex-row">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Contractors
            </h4>
          </div>
          <div>
            <button
              onClick={() => handleDashboard()}
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Name</h5>
            </div>
            <div className="w-[120px]">
              <select
                onChange={handleAgency}
                name="agency"
                className="w-full rounded border-[1.5px] mt-[10px] border-stroke bg-transparent py-3 px-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option title="Filter Agency" value="">
                  All Agency
                </option>
                <option value="Railway">Railway</option>
                <option value="IRCTC">IRCTC</option>
              </select>
            </div>
            <div className="w-[150px] mt-[10px]">
              <select
                onChange={handleCategory}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">All Category</option>
                <option value="On board Catering">On board Catering</option>
                <option value="On board Non–Catering">
                  On board Non–Catering
                </option>
                <option value="PF permit">PF permit</option>
                <option value="Static Unit">Static Unit</option>
                <option value="Parking">Parking</option>
                <option value="Parcel Handling">Parcel Handling</option>
                <option value="Station Cleaning">Station Cleaning</option>
              </select>
            </div>
            <div className="mt-[20px] ml-[50px]">From</div>
            <input
              type="date"
              onChange={handleInitialDateChange}
              value={initialDate}
              name="ContractperiodFrom"
              className="w-[150px] mt-[10px] rounded border-[1.5px] ml-[-60px] h-[50px] border-stroke bg-transparent py-3 px-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <div className="mt-[20px] ml-[-5px]">To</div>
            <input
              type="date"
              onChange={handleFinalDateChange}
              value={finalDate}
              name="ContractperiodTo"
              className="w-[150px] mt-[10px] rounded border-[1.5px] ml-[-125px] h-[50px] border-stroke bg-transparent py-3 px-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <div className="mt-[-60px] ml-[1030px] p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {filteredInvigilators.map((invigilator) => (
            <div
              className={`grid grid-cols-7 sm:grid-cols-7 ${
                invigilator === invigilators[invigilators.length - 1]
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={invigilator._id}
            >
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => handleContractorList(invigilator)}
                className="flex items-center justify-center p-2.5 xl:p-5"
              >
                <p className="text-black dark:text-white">
                  {invigilator.licensee}
                </p>
              </div>
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className=" h-[50px] w-[50px] flex-shrink-0">
                  <p className="mt-[15px]">{invigilator.agency}</p>
                </div>
              </div>
              <div className="flex mr-[30px] items-center gap-3 p-2.5 xl:p-5">
                <div className="h-[50px] w-[180px] flex-shrink-0">
                  <p className="mt-[15px]">{invigilator.category}</p>
                </div>
              </div>
              <div className="ml-[130px] items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 ml-[10px]">
                  {formatDate(invigilator.fromDate)}
                </p>
              </div>
              <div className="ml-[200px] items-center justify-center p-2.5 sm:flex xl:p-5">
                <p
                  className={`ml-[10px] ${
                    isWithinFifteenDays(invigilator.toDate)
                      ? 'text-red-500'
                      : 'text-meta-5'
                  }`}
                >
                  {formatDate(invigilator.toDate)}
                </p>
              </div>
              <div className="ml-[250px] flex items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                <button
                  title="Edit"
                  onClick={() => {
                    navigate('/EditeContractors', { state: { invigilator } });
                    dispatch(setIsEditContractor(true));
                  }}
                  type="button"
                  className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
                >
                  <ImWrench />
                </button>
                <button
                  title="Delete"
                  id="user"
                  onClick={() => handleDeleteClick(invigilator._id)}
                  type="button"
                  className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
                >
                  <RiDeleteBin5Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete this Contractor?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleDelete(invigilatorToDelete)}
                  className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
                >
                  OK
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <Length.Provider value={invigilators.length}>
          {/* <ECommerce/> */}
        </Length.Provider>
      </div>
    </DefaultLayout>
  );
};

export default TableOne;
export { Length };
