

const Project = require("../model/project.model");
const mongoose = require("mongoose");

// CREATE
const projectCreateController = async (req, res) => {
  try {
    const { name, description, url, type, thumbnail } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        message: "Name and URL are required",
      });
    }
    const count = await Project.countDocuments();

    const positionX = (count % 5) * 120 + 20;
    const positionY = Math.floor(count / 5) * 120 + 20;

    const project = await Project.create({
      name,
      description,
      url,
      type,
      thumbnail,
      positionX,
      positionY,
    });

    res.status(201).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// UPDATE
const projectUpdateController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid project ID",
    });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET ALL
const projectGetController = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ONE
const projectGetControllerUsingId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid project ID",
    });
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE
const projectDeleteController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid project ID",
    });
  }

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE POSITION
const updatePositionController = async (req, res) => {
  const { id } = req.params;
  const { positionX, positionY } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { positionX, positionY },
      { new: true },
    );

    res.status(200).json({
      message: "Position updated",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  projectCreateController,
  projectUpdateController,
  projectGetController,
  projectGetControllerUsingId,
  projectDeleteController,
  updatePositionController,
};
