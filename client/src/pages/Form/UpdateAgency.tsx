import DefaultLayout from '../../layout/DefaultLayout';
import { IoAddCircleOutline } from 'react-icons/io5';
import { ImWrench } from 'react-icons/im';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UpdateAgency() {
  const [agency, setAgency] = useState('');
  const [existingAgency, setExistingAgency] = useState([]);

  const baseUrl = 'http://localhost:3000';
  // const baseUrl = "https://railway-qbx4.onrender.com";
  const clientUrl = 'http://crease-railway-8njx.vercel.app';

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await axios.get(
          baseUrl + '/masterData/fetchmasteragencydata',
        );
        // Assuming the response structure is { success: true, data: [...] }
        if (response.data.success) {
          setExistingAgency(response.data.data);
        } else {
          console.error('Error fetching agencies', response.data);
        }
      } catch (error) {
        console.log(`Occurred error while fetching agency ${error}`);
      }
    };
    fetchAgency();
  }, []);

  const handleAgencyAppend = async () => {
    const toastId = toast.loading('Loading...');
    try {
      console.log('agency', agency);
      await axios.post(baseUrl + '/masterData/addMasterData', { name: agency });
      toast.success('Agency added successfully');
      setAgency(''); // Clear the input field after adding the agency
      fetchAgency(); // Refetch the updated list of agencies
    } catch (error) {
      console.log(`Occurred error while adding agency: ${error}`);
      toast.error('Error adding agency');
    } finally {
      toast.dismiss(toastId);
    }
  };

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
        <div className="w-[600px] flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Agency
              </h3>
            </div>
            <form>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Add Agency <span className="text-red-600 text-lg">*</span>
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '50px',
                      }}
                    >
                      <div className="ml-[130px] items-center justify-center p-2.5 sm:flex xl:p-5">
                        <ul>
                          {existingAgency.map((agency, index) => (
                            <li key={index} className="text-meta-5 ml-[10px]">
                              {agency.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        title="Edit"
                        type="button"
                        className="px-9 py-1.5 m-[10px] rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
                      >
                        <ImWrench />
                      </button>
                      <button
                        title="Delete"
                        type="button"
                        className="px-9 py-1.5 m-[10px] rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <input
                        type="text"
                        name="agency"
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                        placeholder="Enter Agency name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <button
                        title="Add"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 0 0 10px',
                        }}
                        onClick={handleAgencyAppend}
                        type="button"
                        className="w-[100px] px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
                      >
                        <IoAddCircleOutline style={{ fontSize: '25px' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
