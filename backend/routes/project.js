const express = require("express");
const z = require("zod");
const { authMiddleware } = require("../middleware/auth");
const { Project } = require("../database/db");

const router = express.Router();

// Schema validation using zod
const projectSchema = z.object({
  name: z.string().nonempty("Name is required"),
  colors: z.array(z.string()).optional(),
  radius: z.number().optional(),
  spacing: z.number().optional(),
  components: z.array(z.object({
    type: z.string().nonempty("Component type is required"),
    variants: z.array(z.string()).optional(),
  })).optional(),
});

// Create a project
router.post("/projects", authMiddleware, async (req, res) => {
  try {
    // Validate the request body
    const validationResult = projectSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: validationResult.error.issues,
      });
    }

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
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Retrieve projects for a user (for switching projects)
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    // Retrieve projects for the logged-in user
    const projects = await Project.find({ user: req.userId });
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update an existing project (save changes)
router.put("/projects/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedData = req.body;

    // Validate the request body
    const validationResult = projectSchema.safeParse(updatedData);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: validationResult.error.issues,
      });
    }

    // Find and update the project
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, user: req.userId },
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found or not owned by user" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
