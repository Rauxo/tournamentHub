const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startedFrom: {
      type: String,
      required: true,
    },
    endsOn: {
      type: String,
      required: true,
    },
    imageUrl: [{ type: String }],
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["E-Sports", "Physical Sports"],
      default: "Physical Sports",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports  = mongoose.model("Tournament", tournamentSchema);