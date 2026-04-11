const bcrypt = require('bcrypt');
const Organizations = require('../models/organisation.model');


exports.crateAccount = async (req, res) => {
  const { orgName, orgMail, location , password } = req.body;

  if (!orgName || !orgMail || !location || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  try {
    // Check if user already exists
    const existingUser = await Organizations.findOne({ orgMail });
    if (existingUser) {
      return res.status(409).json({ message: "Mail already Used" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new Organizations
    const newOrg = new Organizations({ orgName, orgMail, location , password: hashedPassword });
    await newOrg.save();

    return res.status(200).json({message:"Your Account Crated Successfully."})
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
