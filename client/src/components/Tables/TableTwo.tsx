import { ImWrench } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPrint } from "react-icons/fa6";
import DefaultLayout from '../../layout/DefaultLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import QRCode from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { setVendorsData } from "../../redux/slices/VendorSlice"

const TableTwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://railway-qbx4.onrender.com";
  const [newVenders, setVenders] = useState([]);
  const [invigilator, setInvigilator] = useState(null);

  console.log("invidilator in vendor table : ", invigilator);

  const venders = newVenders.reverse();

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
    if (!location.state) {
      getVendersData();
    }
    else {
      const { invigilator } = location.state;
      console.log('invigilator:', invigilator);
      setInvigilator(invigilator);
      setVenders(invigilator?.vendors)
    }
  }, [])

  const [showQR, setShowQR] = useState(false);
  const [vendor, setvendor] = useState();
  const [showDeleteConf, setShowDeleteConf] = useState(false);
  // const [venders, setShowDeleteConf] = useState(false);

  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "QR_Code",
  });

  const handleDelete = async (vendor) => {
    const toastId = toast.loading("Loading...");
    try {
      const id = vendor._id;
      const res = await axios.delete(baseUrl + `/vendor//deleteVender/${id}`);
      console.log("result offter delete : ", res)
      setShowDeleteConf(false);
      setVenders(res?.data.vendors);
      setVendorsData(res.data.vendors);
      localStorage.setItem("vendors", JSON.stringify(res?.data.contractors))
      toast.success("Vendor Deleted")
    }
    catch (error) {
      console.log(error)
    }
    toast.dismiss(toastId);
  }

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
    futureDate.setDate(currentDate.getDate() + 15); // Set the future date to 15 days from now
    const givenDate = new Date(date); // Convert the input date to a Date object

    console.log('futureDate:', futureDate);
    console.log('givenDate:', givenDate);

    if (futureDate >= givenDate) {
      return true;
    } else {
      return false;
    }
  }



  // let arr = Object.entries(invigilator);

  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   if (isNaN(date)) {
  //     return 'Invalid Date';
  //   }
  //   return date.toLocaleDateString();
  // }

  // const handleDeleteClick = (id) => {
  //   console.log(`Delete invigilator with id: ${id}`);
  // };

  // console.log("P date ", vender.policeVarificationDate)

  return (
    <DefaultLayout>
      <div style={{ overflowX: 'auto', width: '1189px' }} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        {
          invigilator &&
          <>
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Contractor
            </h4>

            <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Name
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Agency
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Category
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  From
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  To
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Action
                </h5>
              </div>
            </div>

            <div className={`grid grid-cols-6 sm:grid-cols-6 border-b border-stroke dark:border-strokedark' }`}>
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {invigilator.licensee}
                </p>
              </div>
              <div className="flex items-center justify-center ">
                {invigilator.agency}
              </div>
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="h-[50px] w-[180px] flex-shrink-0 ">
                  <p className="mt-[15px]">{invigilator.category}</p>
                </div>
              </div>
              <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 ml-[10px]">
                  {formatDate(invigilator.fromDate)}
                </p>
              </div>
              <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                <p
                  className={`ml-[10px] ${isWithinFifteenDays(invigilator.toDate)
                    ? 'text-red-500'
                    : 'text-meta-5'
                    }`}
                >
                  {formatDate(invigilator.toDate)}
                </p>
              </div>
              <div className=" flex items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
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
          </>
        }




        <h4 className="my-6 text-xl font-semibold text-black dark:text-white">
          Vendors
        </h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
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
            {/* <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                QR code Id
              </h5>
            </div> */}
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Police Verification
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Medical Verification
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
          {
            venders.length > 0 ?
              (
                venders.map((vender) => (
                  <div className={`grid grid-cols-6 sm:grid-cols-6 ${vender === vender[venders.length - 1] ? '' : 'border-b border-stroke dark:border-strokedark'
                    }`} key={vender._id}>
                    <div style={{ cursor: 'pointer' }} className="flex items-center justify-center p-2.5 xl:p-5">
                      {/* <p className="text-black dark:text-white">{vender.fname}</p> */}
                      <img src={vender?.profilePic} alt="" />
                    </div>
                    <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="">{vender.fname}</p>
                    </div>
                    {/* <div className="items-center justify-center p-2.5 sm:flex xl:p-5 flex flex-col">
                      <p className="">{vender.qrcode}</p>
                      <button onClick={() => {setShowQR(true); setvendor(vender.qrcode)}} className={` ${showQR ? ("hidden") : ("flex")}`}>View & Print QR Code</button>
                      <div className={` ${showQR ? ("flex") : ("hidden")}`}>
                        <QRCode value={vender.qrcode} size={200} />
                      </div>
                      <button onClick={() => setShowQR(false)} className={` ${showQR ? ("flex") : ("hidden")}`}>clear</button>
                    </div> */}
                    <div className="items-center justify-center p-2.5 sm:flex flex-col xl:p-5">
                      <p className="text-meta-5">{vender.policeVarificationDate.split('T')[0]}</p>
                      <a href={vender?.policeVarificationDocument} target="_blank" rel="noopener noreferrer" className="text-black dark:text-[#879ab4] underline" >View</a>
                      {/* <img src={vender?.profilePic} alt="" /> */}
                    </div>
                    <div className="items-center justify-center p-2.5 sm:flex flex-col xl:p-5">
                      <p className="text-meta-5">{vender.medicalValidityDate.split('T')[0]}</p>
                      <a href={vender?.madicalValidityDocument} target="_blank" rel="noopener noreferrer" className="text-black dark:text-[#879ab4] underline" >View</a>
                      {/* <img src={vender?.profilePic} alt="" /> */}
                    </div>
                    <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                      <p className="text-meta-5">{vender.mobile}</p>
                    </div>
                    {/* <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-5">{formatDate(vender.toDate)}</p>
                  </div> */}
                    <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                      <button title="QR_Code" className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-500"
                        onClick={() => { setShowQR(true); setvendor(vender) }}
                      >
                        <FaPrint />
                      </button>

                      <button title="Edit" onClick={() => navigate('/editVendor', { state: { vender } })} type="button" className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600">
                        <ImWrench />
                      </button>
                      <button
                        title="Delete"
                        id='user'
                        onClick={() => { setvendor(vender); setShowDeleteConf(true) }}
                        type="button"
                        className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  </div>
                ))
              )
              : (<div className=" text-center text-white text-2xl py-6">Venders not Found</div>)
          }
        </div>
      </div>
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="mb-4 text-lg font-bold text-black">Print QR Code</h2>
            <div className=" flex flex-col items-center justify-center mt-10" ref={componentPDF}>
              <QRCode value={vendor.qrcode} size={200} />
              <p className=" text-black py-7">{vendor.qrcode}</p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={generatePDF}
                className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
              >
                Print
              </button>
              <button
                onClick={() => { setShowQR(false); setvendor(null) }}
                className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this Contractor?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(vendor)}
                className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
              >
                OK
              </button>
              <button
                onClick={() => { setvendor(null); setShowDeleteConf(false) }}
                className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default TableTwo;
