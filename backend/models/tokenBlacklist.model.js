const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 } // 15 min auto delete
});

module.exports = mongoose.model("Blacklist", blacklistSchema);