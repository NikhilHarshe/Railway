import React, { useCallback, useContext, useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import Image1 from '../../images/engineer.png';
import Image2 from '../../images/seller.png';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import { setUser } from '../../redux/slices/AuthSlice';
import '../../App.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Length } from '../../components/Tables/TableOne';

const ECommerce: React.FC = () => {
  const baseUrl = 'http://localhost:3000';
  // const baseUrl = "https://railway-qbx4.onrender.com";
  const clientUrl = 'http://crease-railway-8njx.vercel.app';
  console.log('length', typeof length);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, Token } = useSelector((state) => state.auth);
  const { contractors } = useSelector((state) => state.contractor)

  console.log('User in side dashbord ', user);
  const numOfContractors = contractors?.length;
  // console.log('jjjjjjj', numOfContractors);

  const getUserData = async () => {
    try {
      if (Token) {
        let res = await axios.post(
          baseUrl + '/user/getUserDetails',
          {},
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        // console.log("res in dashebord ", res.data?.user);
        dispatch(setUser(res.data?.user));
      } else {
        navigate('/login');
        console.log('Token not found');
      }
    } catch (error) {
      console.error(error), console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const navigateInvigilatorList = () => {
    // navigate('/tables')
  };
  const navigateContractorList = () => {
    navigate('/tables');
  };
  const navigateSellerList = () => {
    alert('Seller');
  };

  return (
    <DefaultLayout>
      <>
        <div>
          <h2
            className="mb-[20px] text-center"
            style={{ fontSize: '40px', fontWeight: 'bold' }}
          >
            {/* NGP-CR VENDOR MANAGEMENT SYSTEM */}
            WELCOME TO VENDOR MANAGEMENT{' '}
          </h2>
          <h4
            className="mb-[200px] text-center"
            style={{ fontSize: '40px', fontWeight: 'bold' }}
          >
            SYSTEM NGP_CR
            {/* Nagpur Railways */}
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 ">
          <div
            onClick={() => navigateInvigilatorList()}
            className="list "
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          >
            <div className=' bg-white dark:bg-boxdark h-[9rem] '>
              <RiAdminLine className="w-[45px] h-[45px] px-1 rounded-full py-1 text-black dark:text-white relative top-7 left-7 bg-[#F1F5F9] dark:bg-graydark" />
              <p className='mt-12 ml-7 font-semibold text-black dark:text-white'>Admin</p>
            </div>
          </div>

          <div
            onClick={() => navigateContractorList()}
            className="list"
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          >
            <div className=' bg-white dark:bg-boxdark h-[9rem] '>
              <img  src={Image1} className="w-[45px] h-[45px] px-1 rounded-full py-1 text-black dark:text-white relative top-7 left-7 bg-[#F1F5F9] dark:bg-graydark  "/>
              <p className='mt-12 ml-7 font-semibold text-black dark:text-white'>Contractors - {numOfContractors}</p>
            </div>
          </div>
          <div
            onClick={() => navigate('/venderstable')}
            className="list"
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          >
             <div className=' bg-white dark:bg-boxdark h-[9rem] '>
              <img  src={Image2} className="w-[45px] h-[45px] px-1 rounded-full py-1 text-black dark:text-white relative top-7 left-7 bg-[#F1F5F9] dark:bg-graydark  "/>
              <p className='mt-12 ml-7 font-semibold text-black dark:text-white'>Vendor </p>
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default ECommerce;
