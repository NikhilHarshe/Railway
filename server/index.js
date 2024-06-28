const express = require("express");
const cors = require("cors");
const connectDB = require("./Databse/databse");
const app = express();
const dotenv = require('dotenv');
const cookieparser = require("cookie-parser");
const vendorRoutes = require("./Routes/VendorRoutes");
const contractorRoutes = require("./Routes/ContractorRoutes");
const masterDataRoutes = require("./Routes/MasterDataRoutes");
const AdminRoutes = require("./Routes/Admin");
const { cloudinaryConnect } = require("./Databse/cloudinary");
const fileUpload = require("express-fileupload");


dotenv.config();
const   PORT = process.env.PORT || 4000 
app.use(express.json());
app.use(cookieparser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


app.use(
  fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
  })
);

//localhost:5173/127.0.0.1:3000/contractor/fetchcontractordata/0UBYCF
connectDB();


cloudinaryConnect();

app.use("/vendor", vendorRoutes);
app.use("/contractor", contractorRoutes);
app.use("/user", AdminRoutes);
app.use("/masterData",masterDataRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
