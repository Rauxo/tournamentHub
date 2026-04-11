const express = require('express');
require('dotenv').config();

const app = express();
const PORT =  process.env.PORT;

app.get('/',(req,res)=>{
    res.send(`API is Running  ON port ${PORT}`);
})
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});