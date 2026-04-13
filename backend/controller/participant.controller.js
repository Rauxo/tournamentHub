const participantModel = require("../models/participant.model");
const tournamentModel = require("../models/tournament.model");

exports.submitForm = async (req, res) => {
  try {
    const { name, location, phone } = req.body;
    const { tournamentId } = req.params;
    //check is all fields or not
    if (!name || !phone) {
      return res.status(400).json({
        messaage: "Name and Phone are required.",
      });
    }

    //check is tournameent exist or not
    const tournament = await tournamentModel.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    //chck is user already submit or not
    const existing = await participantModel.findOne({
      phone,
      tournament: tournamentId,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already joined this tournament",
      });
    }

    const participant = await participantModel.create({
      name,
      phone,
      location,
      tournament: tournamentId,
    });

    res.status(201).json({
      message: "Successfully joined tournament",
      data: participant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
