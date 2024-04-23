const express = require("express");
const z = require("zod");
const { authMiddleware } = require("../middleware/auth");
const { Project } = require("../database/db");

const router = express.Router();

module.exports = router;
