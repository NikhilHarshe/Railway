// import axios from 'axios';
// import React, { useState } from 'react'

// const ImgUpload = () => {
//     const [image, setImage] = useState();
//     const changeHandler = (e) => {
//         console.log("Img ", e.target.value);
//         setImage(e.target.value);
//     }

//     console.log("Image : ", image);

//     const handleSubmite = async() => {
//         try{
//             const res = await axios.post("http://localhost:3000/vendor/imgUploade", {}, {
//                 files: {
//                     file = image,
//                 }
//             })
//         }
//         catch(error){
//             console.log(error)
//         }
//     }
//   return (
//     <div>
//       <label htmlFor="imgfile">Upload Img</label>
//       <input type="file" name='imgfile' value={image} onChange={changeHandler}/>
//     </div>
//   )
// }

// export default ImgUpload




import React, { useState } from 'react';
import axios from 'axios';

function ImgUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    const baseUrl = "https://railway-qbx4.onrender.com";
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(baseUrl +'/vendor/imgUploade', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ImgUpload;
