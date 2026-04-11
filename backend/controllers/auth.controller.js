const bcrypt = require("bcrypt");
const Organizations = require("../models/organisation.model");
const BlacklistedToken = require("../models/blacklistedToken.model");
const jwt = require("jsonwebtoken");

// Create Account
exports.createAccount = async (req, res) => {
  const { orgName, orgMail, location, password } = req.body;

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
    const newOrg = new Organizations({
      orgName,
      orgMail,
      location,
      password: hashedPassword,
    });
    await newOrg.save();

    return res
      .status(201)
      .json({ message: "Your Account Created Successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Login to Account
exports.login = async (req, res) => {
  const { orgMail, password } = req.body;

  if (!orgMail || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    const user = await Organizations.findOne({ orgMail });

    if (!user) {
      return res.status(400).json({ message: "Incorrect Mail" });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.orgMail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // SET COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      path: "/",
    });

    // Remove password from user object before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Logout from Account
exports.logout = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      // Add token to blocklist
      await BlacklistedToken.create({ token });
    } catch (error) {
      console.error("Error blacklisting token:", error);
      // Continue with logout even if blacklisting fails
    }
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

// Get Logged In User
exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await Organizations.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};