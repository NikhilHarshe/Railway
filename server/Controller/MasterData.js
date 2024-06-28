const MasterData = require("../Schema/MasterData");
const Admin = require("../Schema/Admin");

const CreateMasterData = async (req, res) => {
  try {
    const {
      agency,
      contractType,
      sectionName,
      selectedTrains,
      nameOfStation,
        admin,
      id
      } = req.body;
      console.log('ffffffffff',req.body.name)
    const user = await MasterData.findById(admin);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Registered",
      });
    }

    const newMasterData = await MasterData.findByIdAndUpdate(id,{$push:
      {agency,
      contractType,
      sectionName,
      selectedTrains,
      nameOfStation,
      admin,}
    });

    return res.status(200).json({
      success: true,
      newMasterData,
      message: "Data saved Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const fetchAgency = async (req, res) => {
  try {
    const agencies = await MasterData.find({}, "agency"); // Retrieve only the 'agency' field from the documents

    if (!agencies || agencies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No agencies found",
      });
    }

    const agencyList = agencies.map((data) => data.agency).flat(); // Flatten the list if 'agency' is an array in each document

    return res.status(200).json({
      success: true,
      data: agencyList,
    });
  } catch (error) {
    console.log("Error fetching agencies", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  CreateMasterData,
    fetchAgency,
};



exports.GetMasterData = async (req, res) => {
    try{
        const masterData = await MasterData.find();

        if(!masterData){
            return res.status(404).json({
                success: false,
                message: "Data Not Present",
            })
        }

        return res.status(200).json({
            masterData,
            success: true,
            message: "Data Fetch Successfully",
        })
    }
    catch(error){
        console.log("Error : ", error);
        return res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}


