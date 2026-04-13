const express = require("express");
require("dotenv").config();
const morgan = require('morgan')
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const tournamentRoutes = require('./routes/tournament.routes');
const participatRoutes = require('./routes/participant.route')


//connect db
connectDb();

const app = express();
const PORT = process.env.PORT || 500;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tournament",tournamentRoutes);
app.use("/api/participant",participatRoutes)

app.listen(PORT, () => {
  console.log(`Backeend is Runnig on PORT ${PORT}`);
});
