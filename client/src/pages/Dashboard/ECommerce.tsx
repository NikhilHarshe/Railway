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
  console.log('length', typeof length);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, Token, contractors } = useSelector((state) => state.auth);

  console.log('User in side dashbord ', user);
  const numOfContractors = contractors.length;
  // console.log('jjjjjjj', numOfContractors);
    const getUserData = async () => {
      try {
        if (Token) {
          let res = await axios.post(
            'http://localhost:3000/user/getUserDetails',
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
            className="list"
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          >
            <CardDataStats title="Admin">
              <RiAdminLine className="w-[30px] h-[30px]" />
            </CardDataStats>
          </div>
          <div
            onClick={() => navigateContractorList()}
            className="list"
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          >
            <CardDataStats title={`Contractors (${numOfContractors})`}>
              <img src={Image1} />
              {/* <p>{numOfContractors}</p> */}
            </CardDataStats>
          </div>
          <div
            onClick={() => navigate('/venderstable')}
            className="list"
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          >
            <CardDataStats title="Vendors">
              <img src={Image2} />
            </CardDataStats>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default ECommerce;
