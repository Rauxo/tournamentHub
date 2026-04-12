const express = require('express');
require('dotenv').config()



const app = express();
const PORT = process.env.PORT || 500;

app.listen(PORT,()=>{
    console.log(`Backeend is Runnig on PORT ${PORT}`);
})