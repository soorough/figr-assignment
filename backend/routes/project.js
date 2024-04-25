const express = require("express");
const z = require("zod");
const { authMiddleware } = require("../middleware/auth");
const { Project } = require("../database/db");

const router = express.Router();

// Schema validation using zod
const colorSchema = z.object({
  variableName: z.string(),
  hexCode: z.string(),
});

const radiusSchema = z.object({
  variableName: z.string(),
  radiusValue: z.number(),
});

const spacingSchema = z.object({
  variableName: z.string(),
  pxValue: z.number(),
  remValue: z.number(),
});

const variantSchema = z.object({
  name: z.string(),
  styles: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    borderColor: z.string().optional(),
    borderRadius: z.number().optional(),
    paddingX: z.number().optional(),
    paddingY: z.number().optional(),
  }),
});

const componentSchema = z.object({
  button: z.array(variantSchema),
  input: z.array(variantSchema),
  select: z.array(variantSchema),
});

const projectSchema = z.object({
  colors: z.array(colorSchema),
  radius: z.array(radiusSchema),
  spacing: z.array(spacingSchema),
  component: componentSchema,
});

router.post("/create", async (req, res) => {
  try {
    const { name, userId } = req.body;

    // Create a new project
    const newProject = new Project({
      user: userId,
      name: name,
      colors: [],
      radius: [],
      spacing: [],
      components: [],
    });

    // Save the new project to the database
    await newProject.save();

    // Send a response with the created project
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve projects for a user (for switching projects)
router.get("/getprojects", authMiddleware, async (req, res) => {
  try {
    // Retrieve projects for the logged-in user
    const projects = await Project.find({ user: req.userId });
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update an existing project (save changes)
router.put("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedData = req.body;


    // Find and update the project
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, user: req.userId },
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ message: "Project not found or not owned by user" });
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
