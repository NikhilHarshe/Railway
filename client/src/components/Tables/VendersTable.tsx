import { ImWrench } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DefaultLayout from '../../layout/DefaultLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VendersTable = () => {
  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://railway-qbx4.onrender.com";
  const location = useLocation();
  const navigate = useNavigate();
  const [venders, setVenders] = useState([]);

  const getVendersData = async () => {
    const toastid = toast.loading("Loading...")
    try {
      const res = await axios.get(baseUrl + "/vendor/fetchVenderData");
      console.log("res of venders table : ", res.data?.data);
      setVenders(res.data.data);
      // if(!res?.success){
      //   console.log("Fail to fetch venders data");
      // }
    }
    catch {
      console.log("Internal server error to fetch vendes data");
    }
    toast.dismiss(toastid);
  }

  useEffect(() => {
    getVendersData();
  }, [])

  return (
    <DefaultLayout>
      <div
        style={{ overflowX: 'auto', width: '1000px' }}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Venders
        </h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Profile
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                QR code Id
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mobile No.
              </h5>
            </div>
            {/* <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                To
              </h5>
            </div> */}
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>
          {venders.length > 0 ? (
            venders.map((vender) => (
              <div
                className={`grid grid-cols-5 sm:grid-cols-5 ${vender === vender[venders?.length - 1]
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                  }`}
                key={vender._id}
              >
                <div
                  style={{ cursor: 'pointer' }}
                  className="flex items-center justify-center p-2.5 xl:p-5"
                >
                  {/* <p className="text-black dark:text-white">{vender.fname}</p> */}
                  <img src={vender?.profilePic} alt="" />
                </div>
                <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="">{vender.fname}</p>
                </div>
                <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="">{vender.qrcode}</p>
                </div>
                <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-5">{vender.mobile}</p>
                </div>
                {/* <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-5">{formatDate(vender.toDate)}</p>
                  </div> */}
                <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                  <button
                    title="Edit"
                    onClick={() =>
                      navigate('/AddContractors', { state: { vender } })
                    }
                    type="button"
                    className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
                  >
                    <ImWrench />
                  </button>
                  <button
                    title="Delete"
                    id="user"
                    onClick={() => handleDeleteClick(vender._id)}
                    type="button"
                    className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className=" text-center text-white text-2xl py-6">
              Venders not Found
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>

    // <div>
    //   hi
    // </div>
  );
};

export default VendersTable;
