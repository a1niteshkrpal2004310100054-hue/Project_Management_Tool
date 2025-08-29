import { Project } from "../model/projectModel.js";
import { Task } from "../model/taskModel.js";
import { Team } from "../model/teamModel.js";

// Create Projcet
export const createProject = async (req, res) => {
  const userId = req.user.userId;
  const { name, description } = req.body;
  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: userId,
      status: "inactive",
    });

    return res
      .status(201)
      .json({ message: "Project created Successfully", project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

// add task in project
export const addTaskInProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.id;
  const { name, description, assignedTo } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Aunthourized user" });
  }
  if (!projectId) {
    return res.status(400).json({ message: "ProjectId is missing" });
  }

  try {
    const project = await Project.findById(projectId).populate("team");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (assignedTo && !project.teams.includes(assignedTo)) {
      return res.status.json({
        message: "Assigned user must be the part of the project team",
      });
    }

    // create task
    const task = new Task({
      name,
      description,
      project: projectId,
      assignedTo,
      timeLogs: [{ action: created, user: userId }],
    });

    await task.save();

    project.tasks.push(task._id);

    await project.save();

    return res
      .status(201)
      .json({ message: "Task added to the project Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

//add team in project
export const addTeamInProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.id;
  const teamId = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Aunthourized user" });
  }
  if (!projectId) {
    return res.status(400).json({ message: "ProjectId is missing" });
  }
  if (!teamId) {
    return res.status(400).json({ message: "teamId is missing" });
  }
  try {
    //check project exist
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // check team exist
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "team not found" });
    }
    // check if team already added
    if (project.teams.includes(teamId)) {
      return res
        .status(409)
        .json({ message: "team is already present in project" });
    }
    // add team
    project.teams.push(teamId);
    await project.save();

    return res.status(201).json({ message: "Team added to the project" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

// get all projects
export const getAllProjects = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({ message: "Aunthourized user" });
  }

  try {
    const project = await Project.find({ createdBy: userId });
    if (!project) {
      return res
        .status(404)
        .json({ message: "No project are created for this user" });
    }
    return res.status(201).json({ message: "Project Populated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

// Get single Project
export const getProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Aunthourized user" });
  }
  if (!projectId) {
    return res
      .status(404)
      .json({ message: "Project Id is required for thie request" });
  }
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

// update project
export const updateProject = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({ message: "Aunthourized user" });
  }
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

// delete Project
export const deletProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Aunthourized user" });
  }
  if (!projectId) {
    return res.status(400).json({ message: "ProjectId id missing" });
  }
  try {
    const project = await Project.findById(projectId);

    if (project.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "forbidden: you do not own this project" });
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(201).json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error " });
  }
};

// Add members in a Project
// export const addMemberInProject = async (req, res) => {
//   const userId = req.user.userId;

//   if (!userId) {
//     return res.status(401).json({ message: "Aunthourized user" });
//   }
//   try {
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server Error " });
//   }
// };

// delete members in a Project
// export const deleteMemberInProject = async (req, res) => {
//   const userId = req.user.userId;

//   if (!userId) {
//     return res.status(401).json({ message: "Aunthourized user" });
//   }
//   try {
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server Error " });
//   }
// };
