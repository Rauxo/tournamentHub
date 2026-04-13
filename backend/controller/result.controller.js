const tournamentModel = require("../models/tournament.model");
const resultModel = require("../models/result.model");
exports.addResult = async (req, res) => {
  try {
    const { position, teamname, description } = req.body;
    const { id } = req.params;

    if (!position || !teamname) {
      return res.status(400).json({
        message: "Position and Team Name is Required to Add Result.",
      });
    }
    const tournament = await tournamentModel.findById(id);
    if (!tournament) {
      return res.status(404).json({
        message: "Tournament Not Found.",
      });
    }

    const result = await resultModel.create({
      position,
      description,
      teamname,
      tournament: id,
      organization: tournament.organization,
    });
    res.status(201).json({
      message: "Successfully Added the Result",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteResult = async (req, res) => {};

exports.updateResult = async (req, res) => {};
exports.getResult = async (req, res) => {
  const { id } = req.params;
  const tournament = await tournamentModel.findById(id);
  if (!tournament) {
    return res.status(404).json({
      message: "Tournament Not Found.",
    });
  }
  const result = await resultModel.find({ tournament: id });
  res.status(201).json({
    message: "Successfully Fetch the Result",
    data: result,
  });
};
