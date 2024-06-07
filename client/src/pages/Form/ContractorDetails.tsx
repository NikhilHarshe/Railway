import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContractorDetails = () => {

  // const baseUrl = process.env.REACT_APP_API_BASE_URL
  const baseUrl = "https://crease-railway.onrender.com"
  const { qrcode } = useParams();
  const [contractorData, setContractorData] = useState(null);

  const getUser = async () => {
    try {
      let response = await axios.post(baseUrl+'/contractor/fetchcontractordata', { qrcode });
      setContractorData(response.data.user);
    } catch (error) {
      console.error('Error fetching contractor data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [qrcode]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6  mx-auto">
      {contractorData ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black border border-gray-400">
            <thead >
              <th className=' border p-3 text-xl' colspan="2">
                Contractor Details
              </th>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Licensee Contact Details</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.Licensee_Contact_details}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Agency</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.agency}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Category</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.category}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">From Date</td>
                <td className="px-6 py-4 border-b border-gray-400">{formatDate(contractorData.fromDate)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">To Date</td>
                <td className="px-6 py-4 border-b border-gray-400">{formatDate(contractorData.toDate)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Licensee</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.licensee}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">PF Permitted</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.pfPermitted ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Profile Pic</td>
                <td className="px-6 py-4 border-b border-gray-400">
                  <img src={contractorData.profilePic} alt="Profile" className="w-24 h-24 rounded-md" />
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Station Name</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.stationName}</td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 border-b border-gray-400 font-medium">Vendors Permitted</td>
                <td className="px-6 py-4 border-b border-gray-400">{contractorData.vendors_permitted}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading contractor data...</p>
      )}
    </div>
  );
};

export default ContractorDetails;
