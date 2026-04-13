const organizationModel = require("../models/organization.model");
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
      organization: tournament.organization,
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

//get all participant list
exports.getAllParticipants = async (req, res) => {
  try {
    const organizationId = req.Organization.id;

    // 1. Get all tournaments of this organization
    const tournaments = await tournamentModel.find({
      organization: organizationId,
    });

    const tournamentIds = tournaments.map(t => t._id);

    const participants = await participantModel.find({
      tournament: { $in: tournamentIds },
    }).populate("tournament");

    res.status(200).json({
      message: "Participants fetched successfully",
      count: participants.length,
      data: participants,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get participant by id 
const Participant = require("../models/participant.model");

exports.getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const organizationId = req.Organization.id;

    // 1. Find participant + populate tournament
    const participant = await Participant.findById(id)
      .populate("tournament");

    if (!participant) {
      return res.status(404).json({
        message: "Participant not found",
      });
    }

    if (
      participant.tournament.organization.toString() !== organizationId
    ) {
      return res.status(403).json({
        message: "You are not allowed to view this participant",
      });
    }

    res.status(200).json({
      message: "Participant fetched successfully",
      data: participant,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};