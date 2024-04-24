const express = require("express");
const z = require("zod");
const { authMiddleware } = require("../middleware/auth");
const { Project } = require("../database/db");

const router = express.Router();

//Schema validation using zod

const projectSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updateSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
});

// Create a project
router.post("/projects", authMiddleware, async (req, res) => {
  try {
    const { name, colors, radius, spacing, components } = req.body;

    // Create a new project
    const newProject = new Project({
      user: req.userId,
      name,
      colors,
      radius,
      spacing,
      components,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Retrieve projects for a user (for switching projects)
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 3. Update an existing project (save changes)
router.put("/projects/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedData = req.body;

    // Find and update the project
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 4. Add a new component to a project
router.post(
  "/projects/:projectId/components",
  authMiddleware,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { type, variants } = req.body;

      // Find the project
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Add the new component
      project.components.push({ type, variants });
      await project.save();

      res.json({ message: "Component added successfully", project });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;
