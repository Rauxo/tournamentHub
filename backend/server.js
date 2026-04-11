const express = require('express');
const connectDB = require("./config/db");
const authRoutes = require('./routes/auth.routes')
require('dotenv').config();

const app = express();
const PORT =  process.env.PORT;

connectDB();
app.use(express.json()); // Parses incoming JSON requests
// For parsing application/x-www-form-urlencoded (standard HTML forms)
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1/auth',authRoutes);

app.get('/api/v1',(req,res)=>{
    res.send(`API is Running  ON port ${PORT}`);
})
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});