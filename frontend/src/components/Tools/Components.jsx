import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Radio,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";

const Components = () => {
  const [colors, setColors] = useState([]);
  const [radius, setRadius] = useState([]);
  const [spacing, setSpacing] = useState([]);
  const [componentVariants, setComponentVariants] = useState({
    button: [],
    input: [],
    select: [],
  });

  // Functions to handle adding new items
  const addColor = () => setColors([...colors, { label: "", value: "" }]);
  const addRadius = () => setRadius([...radius, { label: "", value: "" }]);
  const addSpacing = () => setSpacing([...spacing, { label: "", value: "" }]);
  
  const addComponentVariant = (componentType) => {
    const newVariant = { name: "", styles: {} };
    setComponentVariants({
      ...componentVariants,
      [componentType]: [...componentVariants[componentType], newVariant],
    });
  };

  // Functions to handle updating items
  const updateColor = (index, key, value) => {
    const updatedColors = colors.map((color, idx) =>
      idx === index ? { ...color, [key]: value } : color
    );
    setColors(updatedColors);
  };

  const updateRadius = (index, key, value) => {
    const updatedRadius = radius.map((r, idx) =>
      idx === index ? { ...r, [key]: value } : r
    );
    setRadius(updatedRadius);
  };

  const updateSpacing = (index, key, value) => {
    const updatedSpacing = spacing.map((s, idx) =>
      idx === index ? { ...s, [key]: value } : s
    );
    setSpacing(updatedSpacing);
  };

  // Function to update component variant styles and name
  const updateVariantStyle = (componentType, variantIndex, styleKey, value) => {
    const updatedVariants = componentVariants[componentType].map(
      (variant, idx) =>
        idx === variantIndex
          ? { ...variant, styles: { ...variant.styles, [styleKey]: value } }
          : variant
    );
    setComponentVariants({
      ...componentVariants,
      [componentType]: updatedVariants,
    });
  };

  const updateVariantName = (componentType, variantIndex, newName) => {
    const updatedVariants = componentVariants[componentType].map(
      (variant, idx) =>
        idx === variantIndex ? { ...variant, name: newName } : variant
    );
    setComponentVariants({
      ...componentVariants,
      [componentType]: updatedVariants,
    });
  };

  // Function to delete a variant
  const deleteVariant = (componentType, index) => {
    const updatedVariants = [...componentVariants[componentType]];
    updatedVariants.splice(index, 1);
    setComponentVariants({
      ...componentVariants,
      [componentType]: updatedVariants,
    });
  };

  return (
    <Box p={4}>
      <h1>Component Styler</h1>

      {/* Color Section */}
      <section>
        <h2>Colors</h2>
        <Button variant="contained" onClick={addColor}>
          Add Color
        </Button>
        {colors.map((color, index) => (
          <Box key={index} mb={2}>
            <TextField
              label="Label"
              value={color.label}
              onChange={(e) => updateColor(index, "label", e.target.value)}
            />
            <TextField
              label="Value"
              value={color.value}
              onChange={(e) => updateColor(index, "value", e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => setColors(colors.filter((_, idx) => idx !== index))}
            >
              Delete Color
            </Button>
          </Box>
        ))}
      </section>

      {/* Radius Section */}
      <section>
        <h2>Radius</h2>
        <Button variant="contained" onClick={addRadius}>
          Add Radius
        </Button>
        {radius.map((r, index) => (
          <Box key={index} mb={2}>
            <TextField
              label="Label"
              value={r.label}
              onChange={(e) => updateRadius(index, "label", e.target.value)}
            />
            <TextField
              label="Value"
              value={r.value}
              onChange={(e) => updateRadius(index, "value", e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => setRadius(radius.filter((_, idx) => idx !== index))}
            >
              Delete Radius
            </Button>
          </Box>
        ))}
      </section>

      {/* Spacing Section */}
      <section>
        <h2>Spacing</h2>
        <Button variant="contained" onClick={addSpacing}>
          Add Spacing
        </Button>
        {spacing.map((s, index) => (
          <Box key={index} mb={2}>
            <TextField
              label="Label"
              value={s.label}
              onChange={(e) => updateSpacing(index, "label", e.target.value)}
            />
            <TextField
              label="Value"
              value={s.value}
              onChange={(e) => updateSpacing(index, "value", e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSpacing(spacing.filter((_, idx) => idx !== index))}
            >
              Delete Spacing
            </Button>
          </Box>
        ))}
      </section>

      {/* Component Styling */}
      <section>
        <h2>Component Styling</h2>
        {["button", "input", "select"].map((componentType) => (
          <div key={componentType}>
            <h3>
              {componentType.charAt(0).toUpperCase() + componentType.slice(1)}
            </h3>
            <Button
              variant="contained"
              onClick={() => addComponentVariant(componentType)}
            >
              Add Variant
            </Button>
            {componentVariants[componentType].map((variant, index) => (
              <Box key={index} mt={2}>
                <TextField
                  label="Variant Name"
                  value={variant.name}
                  onChange={(e) =>
                    updateVariantName(componentType, index, e.target.value)
                  }
                />
                <h4>Styles</h4>
                <TextField
                  label="Background Color"
                  value={variant.styles.backgroundColor}
                  onChange={(e) =>
                    updateVariantStyle(
                      componentType,
                      index,
                      "backgroundColor",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Text Color"
                  value={variant.styles.color}
                  onChange={(e) =>
                    updateVariantStyle(
                      componentType,
                      index,
                      "color",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Border Color"
                  value={variant.styles.borderColor}
                  onChange={(e) =>
                    updateVariantStyle(
                      componentType,
                      index,
                      "borderColor",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Border Radius"
                  value={variant.styles.borderRadius}
                  onChange={(e) =>
                    updateVariantStyle(
                      componentType,
                      index,
                      "borderRadius",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Padding X"
                  value={variant.styles.paddingX}
                  onChange={(e) =>
                    updateVariantStyle(
                      componentType,
                      index,
                      "paddingX",
                      e.target.value
                    )
                  }
                />
                <TextField
                  label="Padding Y"
                  value={variant.styles.paddingY}
                  onChange={(e) =>
                    updateVariantStyle(
                      componentType,
                      index,
                      "paddingY",
                      e.target.value
                    )
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteVariant(componentType, index)}
                >
                  Delete Variant
                </Button>
              </Box>
            ))}
          </div>
        ))}
      </section>

      {/* Render customized components based on user-defined styles */}
      <section>
        <h2>Components</h2>
        {/* Render buttons */}
        <div>
          <h3>Buttons</h3>
          {componentVariants.button.map((variant, index) => (
            <Button key={index} style={variant.styles}>
              {variant.name}
            </Button>
          ))}
        </div>

        {/* Render input elements */}
        <div>
          <h3>Inputs</h3>
          {componentVariants.input.map((variant, index) => (
            <div key={index}>
              <TextField style={variant.styles} label={variant.name} />
              <Radio style={variant.styles} label={variant.name} />
              <Checkbox style={variant.styles} label={variant.name} />
            </div>
          ))}
        </div>

        {/* Render select elements */}
        <div>
          <h3>Selects</h3>
          {componentVariants.select.map((variant, index) => (
            <Select key={index} style={variant.styles} label={variant.name}>
              <MenuItem>{variant.name}</MenuItem>
            </Select>
          ))}
        </div>
      </section>
    </Box>
  );
};

export default Components;
