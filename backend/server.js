const express = require("express")
const cors = require('cors');;
require("dotenv").config();
const morgan = require('morgan')
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const tournamentRoutes = require('./routes/tournament.routes');
const participatRoutes = require('./routes/participant.route')
const resultRoutes = require("./routes/result.routes")
const path = require("path");



//connect db
connectDb();

const app = express();
const PORT = process.env.PORT || 500;
app.use(cors()); 

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/default", express.static(path.join(__dirname, "default")));
app.use("/api/auth", authRoutes);
app.use("/api/tournament",tournamentRoutes);
app.use("/api/participant",participatRoutes)
app.use("/api/result",resultRoutes);


app.listen(PORT, () => {
  console.log(`Backeend is Runnig on PORT ${PORT}`);
});
