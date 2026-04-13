const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    position: {
      type: String,
    },
    description:{
        type:String
    },
    teamname: {
      type: String,
      required: true,
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Result", resultSchema);
