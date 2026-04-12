const organizationModel = require("../models/organization.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create Account
exports.createAccount = async (req, res) => {
  try {
    //getting values from user
    const { orgName, orgMail, location, password } = req.body;
    // console.log("Org Name is ",orgName)

    //check All Fields or not
    if (!orgName || !orgMail || !location || !password) {
      return res.status(400).json({
        message: "All fields are required .",
      });
    }

    //check is mail exist or not
    const existingMail = await organizationModel.findOne({ orgMail });
    if (existingMail) {
      return res.status(400).json({ message: "This Mail already exists" });
    }
    //hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new Organization
    const newOrganization = new organizationModel({
      orgName,
      orgMail,
      location,
      password: hashedPassword,
    });

    //Save Organization
    await newOrganization.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

//Login User
exports.login = async (req, res) => {
  try {
    //getting values from user
    const { orgMail, password } = req.body;

    //check All Fields or not
    if (!orgMail || !password) {
      return res.status(400).json({
        message: "All fields are required .",
      });
    }

    const Organization = await organizationModel.findOne({ orgMail });
    if (!Organization) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, Organization.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: Organization._id, orgMail: Organization.orgMail };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
