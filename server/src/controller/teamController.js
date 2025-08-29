import { Team } from "../model/teamModel.js";
import { Project } from "../model/projectModel.js";

export const createTeam = async (req, res) => {
  const userId = req.user.userId;
  const { name, members } = req.body;
  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const team = await Project.create({
      name,
      members: [members],
      createdBy: userId,
    });

    return res.status(201).json({ message: "Team created Successfully", team });
  } catch (error) {
    console.error(error);
  }
};

export const getAllTeam = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const team = await Team.find({ createdBy: userId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(201).json({ message: "team populated", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTeamById = async (req, res) => {
  const userId = req.user.userId;
  const teamId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  if (!teamId) {
    return res.status(404).json({ message: "Id is missing for thie request" });
  }

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(201).json({ message: "team populated", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTeam = async (req, res) => {
  const userId = req.user.userId;
  const teamId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  if (!teamId) {
    return res.status(404).json({ message: "Id is missing for thie request" });
  }
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    return res.status(201).json({ message: "team populated", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
