const tournamentModel = require("../models/tournament.model");

//get All tournament
exports.getAllTournament = async (req, res) => {
  try {
    const Tournaments = await tournamentModel.find();

    if (!Tournaments) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "Tournaments data fetched successfully",
      Tournaments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//get tournament by id
exports.getTournamentById = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await tournamentModel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "Tournament data fetched successfully",
      tournament,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//add Tournament
exports.addTournament = async (req, res) => {
  try {
    const { title, startedFrom, endsOn, imageUrl, description, category } =
      req.body;

    // basic validation
    if (!title || !startedFrom || !endsOn) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const tournament = await tournamentModel.create({
      title,
      startedFrom,
      endsOn,
      imageUrl,
      description,
      category,

      organization: req.Organization.id,
    });

    res.status(201).json({
      message: "Tournament created",
      tournament,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
