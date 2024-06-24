const MasterData = require("../Schema/MasterData");
const Admin = require("../Schema/Admin");

exports.CreateMasterData = async (req, res) => {
    try {
        const { agency, contractType, sectionName, selectedTrains, nameOfStation, admin } = req.body;

        const user = await Admin.findById(admin);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Registerd",
            })
        }

        const newMasterData = await MasterData.create({
            agency,
            contractType,
            sectionName,
            selectedTrains,
            nameOfStation,
            admin
        })

        return res.status(404).json({
            success: true,
            newMasterData,    
            message: "Data saved Successfully",
        })
    }
    catch (error) {
        console.log("error", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}