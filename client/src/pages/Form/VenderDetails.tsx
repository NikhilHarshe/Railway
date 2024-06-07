import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VenderDetails = () => {
    const baseUrl = "https://crease-railway.onrender.com";
    const { qrcode } = useParams();
    const [invigilatorData, setInvigilatorData] = useState(null);

    const getUser = async () => {
        try {
            let response = await axios.post(baseUrl + '/vendor/fetchInvigilatorDataByQR', { qrcode });
            console.log("response ", response.data.user);
            setInvigilatorData(response.data.user);
        } catch (error) {
            console.error('Error fetching Invigilator data:', error);
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            {invigilatorData ? (
                <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-2xl">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-600 font-semibold text-gray-600">Field</th>
                                <th className="py-2 px-4 bg-gray-600 font-semibold text-gray-600">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-4">Name</td>
                                <td className="py-2 px-4">{invigilatorData.fname}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Date of Birth</td>
                                <td className="py-2 px-4">{formatDate(invigilatorData.dob)}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Mobile</td>
                                <td className="py-2 px-4">{invigilatorData.mobile}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Profile Picture</td>
                                <td className="py-2 px-4">
                                    <img src={invigilatorData.profilePic} alt="Profile" className=" h-24 rounded object-cover" />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Aadhar Number</td>
                                <td className="py-2 px-4">{invigilatorData.aadhar}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Aadhar Card</td>
                                <td className="py-2 px-4">
                                    <a href={invigilatorData.aadharCard} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Police Verification Date</td>
                                <td className="py-2 px-4">{formatDate(invigilatorData.policeVarificationDate)}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Police Verification Document</td>
                                <td className="py-2 px-4">
                                    <a href={invigilatorData.policeVarificationDocument} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Medical Validity Date</td>
                                <td className="py-2 px-4">{formatDate(invigilatorData.medicalValidityDate)}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Medical Validity Document</td>
                                <td className="py-2 px-4">
                                    <a href={invigilatorData.madicalValidityDocument} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Validity Authority</td>
                                <td className="py-2 px-4">{invigilatorData.validityAuthority}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">QR Code</td>
                                <td className="py-2 px-4">{invigilatorData.qrcode}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default VenderDetails;
