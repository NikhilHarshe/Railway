const express = require("express");
const cors = require("cors");
const connectDB = require("./Databse/databse");
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const   PORT = process.env.PORT || 4000 
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
//localhost:5173/127.0.0.1:3000/contractor/fetchcontractordata/0UBYCF
http: connectDB();
const vendorRoutes = require("./Routes/VendorRoutes");
const contractorRoutes = require("./Routes/ContractorRoutes");
const sellerRoutes = require("./Routes/SellerRoutes");

app.use("/vendor", vendorRoutes);
app.use("/contractor/", contractorRoutes);
app.use("/seller", sellerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
