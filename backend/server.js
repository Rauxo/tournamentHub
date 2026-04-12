const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");

//connect db
connectDb();

const app = express();
const PORT = process.env.PORT || 500;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Backeend is Runnig on PORT ${PORT}`);
});
