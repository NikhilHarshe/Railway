import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import Image1 from '../../images/engineer.png' 
import Image2 from '../../images/seller.png' 
import Image3 from '../../images/watch.png'
import { useNavigate } from 'react-router-dom';
import '../../App.css'

import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {

  let navigate = useNavigate()

  const navigateInvigilatorList = () => {
  navigate('/tables')
}
  const navigateContractorList = () => {
  alert('Contractor')
}
  const navigateSellerList = () => {
  alert('Seller')
}

  return (
    <DefaultLayout>
      <>
        <div >
      <h2 className='mb-[20px] text-center' style={{fontSize:"40px" , fontWeight:'bold'}}>Welcome To Dashboard</h2>
      <h4 className='mb-[200px] text-center' style={{fontSize:"25px" , fontWeight:'bold'}}>Nagpur Railways</h4>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 ">
          <div onClick={()=>navigateInvigilatorList()} className='list' style={{
            cursor:'pointer'
          }}>
            <CardDataStats  title="Invigilator" total="5" >
            <img src={Image3} />
          </CardDataStats> 
        </div>
          <div onClick={()=>navigateContractorList()} className='list' style={{
            cursor:'pointer'
          }}>
             <CardDataStats title="Contractor" total="10" >
          <img src={Image1} />
        </CardDataStats>
      </div>
          <div onClick={()=>navigateSellerList()} className='list' style={{
            cursor:'pointer'
          }}>
             <CardDataStats title="Seller" total="110" >
          <img  src={Image2}/>
          </CardDataStats>
       </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default ECommerce;
