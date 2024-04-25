const express = require("express");
const userRouter = require("./user");
const projectRouter = require("./project");

const router = express.Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);

module.exports = router;
