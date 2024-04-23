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
  label: { type: String, required: true },
  value: { type: String, required: true }, // Can be hex, hsl, or text
});

// Define Radius schema
const radiusSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }, // Example: '10px'
});

// Define Spacing schema
const spacingSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }, // Example: '6px'
});

// Define Variant schema
const variantSchema = new Schema({
  name: { type: String, required: true }, // Name of the variant (e.g. 'primary', 'secondary')
  styles: {
    backgroundColor: { type: String }, // CSS background color
    textColor: { type: String }, // CSS text color
    borderColor: { type: String }, // CSS border color
    borderRadius: { type: String }, // CSS border radius
    paddingX: { type: String }, // CSS padding on the X axis
    paddingY: { type: String }, // CSS padding on the Y axis
  },
});

// Define Component schema
const componentSchema = new Schema({
  type: { type: String, required: true }, // E.g. 'Button', 'Input', 'Select'
  variants: [variantSchema], // List of variants for the component
});

// Define Project schema
const projectSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  colors: [colorSchema], // List of color objects
  radius: [radiusSchema], // List of radius objects
  spacing: [spacingSchema], // List of spacing objects
  components: [componentSchema], // List of components with variants
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
