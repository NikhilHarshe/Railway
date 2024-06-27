const MasterData = require('../Schema/MasterData');

const addAgency = async (req, res) => {
  const { newAgency } = req.body;
console.log('xxxxxxxxxxx',req.body)
  try {
    const newMasterData = MasterData.find();
    
    const data = await agency.save();
    res.status(200).json({
      success: true,
      data,
      message: "Agency Added Successfully",
    });
  } catch (error) {
    console.log(`Error occurred while adding Agency`, error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const updateAgency = async (req, res) => {
  
}

const deleteAgency = async (req, res) => {
  
}

const fetchAgency = async (req, res) => {
  
}

module.exports = {
  deleteAgency,
  deleteAgency,
  fetchAgency,
  addAgency
};