const organizationModel = require("../models/organization.model");

exports.getAllOrganizers = async (req, res) => {
  try {
    const data = await organizationModel.find().select("-password");

    res.json({
      message: "Organizers fetched",
      organizers: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};