import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImWrench } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoPrint } from "react-icons/io5";

const TableOne = () => {
  let navigate = useNavigate();
  const [invigilators, setInvigilators] = useState([]);

  const handleDelete = async (email) => {
    try {
      console.log(typeof email)
      await axios.delete(`http://localhost:3000/invigilator/delete/${email}`);
      setInvigilators(invigilators.filter(invigilator => invigilator.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  useEffect(() => {
    const fetchInvigilators = async () => {
      try {
        const response = await axios.get('http://localhost:3000/invigilator/fetchInvigilatorData');
        setInvigilators(response.data);
      } catch (error) {
        console.error('Error fetching invigilator data:', error);
      }
    };

    fetchInvigilators();
  }, []);

  const handleContractorList = (invigilators) => {
    console.log('User Data:', invigilators);
    navigate('/tabletwo', { state: { invigilators } });
  }

  return (
    <div style={{ overflowX: 'auto', width: '1000px' }} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Invigilators
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className=" xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              IMAGE
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="ml-[70px] hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="ml-[100px] hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mobile
            </h5>
          </div>
          <div className="ml-[180px] hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {invigilators.map((invigilator, key) => (
          <div
            className={`grid grid-cols-7 sm:grid-cols-7 ${
              key === invigilators.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[50px] w-[50px] flex-shrink-0">
                <img src={invigilator.profilePic} alt="Invigilator" />
              </div>
            </div>

            <div style={{ cursor: 'pointer' }} onClick={() => handleContractorList(invigilator)} className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{invigilator.firstName} {invigilator.lastName}</p>
            </div>
            <div className="ml-[100px] items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{invigilator.email}</p>
            </div>
            <div className="ml-[120px] items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{invigilator.mobile}</p>
            </div>
            <div className="ml-[200px] items-center justify-center p-2.5 sm:flex xl:p-5 flex gap-[10px]">
              <button type="button" className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-[orange] hover:bg-orange-700 active:bg-orange-600">
                <IoPrint />
              </button>
              <button onClick={() => navigate('/EditInvigilator', { state: { invigilator } })} type="button" className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600">
                <ImWrench />
              </button>
              <button
                id='user'
                onClick={() => handleDelete(invigilator.email)}
                type="button"
                className="mr-[-40px] px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
