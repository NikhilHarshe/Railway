import React, { useState, useEffect,createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImWrench } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ECommerce from '../../pages/Dashboard/ECommerce';

let Length = createContext()

const TableOne = () => {
  let navigate = useNavigate();
  const [invigilators, setInvigilators] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [invigilatorToDelete,setInvigilatorToDelete] = useState(null)

  const handleDelete = async (_id) => {
    try {
      setShowDeleteConfirmation(false);
      await axios.delete(`http://localhost:3000/contractor/delete/${_id}`);
      setInvigilators(invigilators.filter(invigilator => invigilator._id !== _id));
      
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  useEffect(() => {
    const fetchInvigilators = async () => {
      try {
        const response = await axios.get('http://localhost:3000/contractor/fetchcontractordata');
        setInvigilators(response.data);
      } catch (error) {
        console.error('Error fetching invigilator data:', error);
      }
    };

    fetchInvigilators();
  }, []);
    console.log('length',invigilators.length)
      
  const handleContractorList = (invigilators) => {
    navigate('/tabletwo', { state: { invigilators } });
  }

  const handleDeleteClick = (_id) => {
    setShowDeleteConfirmation(true);
    setInvigilatorToDelete(_id);
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setInvigilatorToDelete(null);
  }

  function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString(); 
  }
  
  return (
    <div style={{ overflowX: 'auto', width: '1000px' }} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Contractors
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="m p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Agency
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="ml-[80px]  p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              From
            </h5>
          </div>
          <div className="ml-[80px] p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              To
            </h5>
          </div>
          <div className="ml-[80px] p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {invigilators.map((invigilator) => (
          <div
            className={`grid grid-cols-7 sm:grid-cols-7 ${
              invigilator === invigilators[invigilators.length - 1] ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={invigilator._id}
          >
            <div style={{ cursor: 'pointer' }} onClick={() => handleContractorList(invigilator)} className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{invigilator.licensee}</p>
            </div>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className=" h-[50px] w-[50px] flex-shrink-0">
                <p className='mt-[15px]'>{invigilator.agency}</p> 
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[50px] w-[180px] flex-shrink-0">
                <p className='mt-[15px]'>{invigilator.category}</p> 
              </div>
            </div>
            <div className="ml-[100px] items-center justify-center p-2.5 sm:flex xl:p-5">
  <p className="text-meta-5">{formatDate(invigilator.fromDate)}</p>
</div>
<div className="ml-[100px]  items-center justify-center p-2.5 sm:flex xl:p-5">
  <p className="text-meta-5">{formatDate(invigilator.toDate)}</p>
</div>
            <div className="ml-[100px]  flex items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
              
              <button onClick={() => navigate('/AddContractors', { state: { invigilator } })} type="button" className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600">
                <ImWrench />
              </button>
              <button
                id='user'
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
            <p className="mb-4">Are you sure you want to delete this invigilator?</p>
            <div className="flex justify-center gap-4">
              <button onClick={()=>handleDelete(invigilatorToDelete)} className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600">
                OK
              </button>
              <button onClick={handleCancelDelete} className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600">
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
    
  );
};

export default TableOne;
export {Length}
