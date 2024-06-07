import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import { ImWrench } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DefaultLayout from '../../layout/DefaultLayout';
import { useLocation } from 'react-router-dom';

const brandData2: BRAND[] = [
  {
    logo: BrandOne,
    brandname: 'Google',
    name: 'Mukesh',
    mobile: 9898989898,
    aadhar: 1234567892,
    userid: 590,
    password: "abc#123",

  },
]

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    brandname: 'Google',
    name: 'Mukesh',
    mobile: 9898989898,
    aadhar: 1234567892,
    userid: 590,
    password: "abc#123",

  },
  {
    logo: BrandOne,
    brandname: 'Google',
    name: 'Mukesh',
    mobile: 9898989898,
    aadhar: 1234567892,
    userid: 590,
    password: "abc#123",

  },
  {
    logo: BrandOne,
    brandname: 'Google',
    name: 'Mukesh',
    mobile: 9898989898,
    aadhar: 1234567892,
    userid: 590,
    password: "abc#123",

  },
  {
    logo: BrandOne,
    brandname: 'Google',
    name: 'Mukesh',
    mobile: 9898989898,
    aadhar: 1234567892,
    userid: 590,
    password: "abc#123",

  },
  {
    logo: BrandOne,
    brandname: 'Google',
    name: 'Mukesh',
    mobile: 9898989898,
    aadhar: 1234567892,
    userid: 590,
    password: "abc#123",

  },
];

const TableTwo = () => {

 const location = useLocation();
  const { invigilators } = location.state;
  console.log('cccccc',typeof invigilators);


  return (
    <DefaultLayout>
      <div style={{
      overflowX:'auto',
      width:'1000px'
    }} className="  rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
       Invigilator
      </h4>
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className=" xl:p-5">
            
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            LOGO
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>  
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mobile
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {invigilators.map((user,key) => (
          <div
            className={`grid grid-cols-7 sm:grid-cols-7 ${
              key === brandData2.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={user.profilePic} alt="Brand" />
              </div>
              {/* <p className="hidden text-black dark:text-white sm:block">
                {brand.brandname}
              </p> */}
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.firstName}{user.lastName}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.email}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.mobile}</p>
            </div>

            {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.userid}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.password}</p>
            </div> */}
            <div className=" items-center justify-center p-2.5 sm:flex xl:p-5 flex gap-[10px]">
            <button type="button"
    className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"><ImWrench /></button>
    <button type="button"
    className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"><RiDeleteBin5Fill /></button>
            </div>
          </div>
        ))}
      </div>
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
       Contractors
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className=" xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            LOGO
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mobile Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aadhar number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              UserId
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Password
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-7 sm:grid-cols-7 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={brand.logo} alt="Brand" />
              </div>
              {/* <p className="hidden text-black dark:text-white sm:block">
                {brand.brandname}
              </p> */}
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.name}Mukesh</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.mobile}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.aadhar}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.userid}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.password}</p>
            </div>
            <div className=" items-center justify-center p-2.5 sm:flex xl:p-5 flex gap-[10px]">
            <button type="button"
    className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"><ImWrench /></button>
    <button type="button"
    className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600"><RiDeleteBin5Fill /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </DefaultLayout>
  );
};

export default TableTwo;
