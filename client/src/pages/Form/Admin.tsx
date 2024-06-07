import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
// import axios from 'axios';

export default function Admin() {
//   const [profilePic, setProfilePic] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [qrCodeValue, setQRCodeValue] = useState('');
  
  const [formData, setFormData] = useState({
    fname: '',
    designation:'',
    mobile: '',
  });

//   const [generatedData, setGeneratedData] = useState(null);
//    const [category, setCategory] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    // const updatedFormData = { ...formData, qrcode: result };
    // setQRCodeValue(result);
    // setGeneratedData(updatedFormData);
    // setSuccess(true); 
    // setProfilePic(profilePic);
    // console.log(formData)
  };

//   const handleSave = async () => {
//     try {
//       if (generatedData) {
//         console.log('llllllllll',generatedData)
//         const response = await axios.post('http://localhost:3000/contractor/registercontractor', generatedData);
//         if (response) {
//           alert(`Contractor Registered Successfully`)
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
// const options = {
//         apiKey: "public_12a1yyQ4Dbt9UDABRk4Budpc2L8v", 
//         maxFileCount: 1
//   };
//   formData.profilePic = profilePic;
  return (
    <div>
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
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Register Admin
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        name="agency"
                        value={formData.agency}
                        onChange={handleChange}
                        placeholder="Name of Agency"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        	Designation
                      </label>
                      <select 
                        name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 h-[50px] mb-4 border border-gray-300 rounded text-black "
        >
          <option value="">Select Category</option>
          <option value="On board Catering">On board Catering</option>
          <option value="On board Non – Catering">On board Non – Catering</option>
          <option value="Static Unit">Static Unit</option>
          <option value="PF permit">PF permit</option>
        </select>
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Mobile
                    </label>
                    <input
                      type="number"
                      name="vendors_permitted"
                      value={formData.vendors_permitted}
                      onChange={handleChange}
                      placeholder="Enter Permitted Vendors"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Create Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}
