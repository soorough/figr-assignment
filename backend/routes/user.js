const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/auth");
const { User } = require("../database/db");

const router = express.Router();

//Schema validation using zod

const signupSchema = z.object({
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

// Signup API

router.post("/signup", async (req, res) => {
  try {
    const { success, error, data } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password, name } = data;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Sigin API

router.post("/signin", async (req, res) => {
  const { success, error, data } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = data;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Signin successful", token });
});

// Logout API

router.post("/logout", authMiddleware, (req, res) => {
  res.json({ message: "Logout successful" });
});

// User details update API

router.put("/update", authMiddleware, async (req, res) => {
  try {
    if (!success) {
      res.status(411).json({
        message: "Error while updating information",
      });
    }

    await User.updateOne(req.body, {
      id: req.userId,
    });

    return res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating user profile:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
