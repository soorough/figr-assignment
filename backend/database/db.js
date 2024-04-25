const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const connectionURI = process.env.URI;

mongoose.connect(connectionURI);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected successfully");
});

db.on("error", (err) => {
  console.error("Database connection error:", err);
});

// Define Color schema
const colorSchema = new Schema({
  variableName: { type: String, required: true },
  hexCode: { type: String, required: true },
});

// Define Radius schema
const radiusSchema = new Schema({
  variableName: { type: String, required: true },
  radiusValue: { type: Number, required: true },
});

// Define Spacing schema
const spacingSchema = new Schema({
  variableName: { type: String, required: true },
  pxValue: { type: Number, required: true },
  remValue: { type: Number, required: true },
});

// Define Styles schema for variants
const stylesSchema = new Schema({
  backgroundColor: { type: String, default: null },
  textColor: { type: String, default: null },
  borderColor: { type: String, default: null },
  borderRadius: { type: Number, default: null },
  paddingX: { type: Number, default: null },
  paddingY: { type: Number, default: null },
});


// Define Variant schema
const variantSchema = new Schema({
  name: { type: String, required: true },
  styles: { type: stylesSchema, required: true },
});

// Define Components schema
const componentsSchema = new Schema({
  button: [variantSchema],
  input: [variantSchema],
  select: [variantSchema],
});

// Define Project schema
const projectSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  colors: [colorSchema],
  radius: [radiusSchema],
  spacing: [spacingSchema],
  component: {componentsSchema},
});

// Define User schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
});

// Create models from the schemas
const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);

// Export the models
module.exports = { User, Project };
