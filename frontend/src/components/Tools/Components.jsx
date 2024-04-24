import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  ListSubheader,
} from "@mui/material";
import { useRecoilState } from "recoil";
import spacingAtom from "../../../recoil/Spacing/Spacing.atom";
import radiusAtom from "../../../recoil/Radius/Radius.atom";
import colorsAtom from "../../../recoil/Colors/Colors.atom";
import componentVariantsAtom from "../../../recoil/components/Components.atom";
import ButtonComponent from "../HandleComponents/ButtonComponent";

const Components = () => {
  const [colors] = useRecoilState(colorsAtom);
  const [radius] = useRecoilState(radiusAtom);
  const [spacing] = useRecoilState(spacingAtom);
  const [componentVariants, setComponentVariants] = useRecoilState(
    componentVariantsAtom
  );
  const [selectedVariant, setSelectedVariant] = React.useState(null);

  // Function to handle adding new variants
  const addComponentVariant = (componentType) => {
    const newVariant = { name: "", styles: {} };
    setComponentVariants((prev) => ({
      ...prev,
      [componentType]: [...prev[componentType], newVariant],
    }));
  };

  // Function to update component variant styles and name
  const updateVariantStyle = (componentType, variantIndex, styleKey, value) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev[componentType].map((variant, idx) =>
        idx === variantIndex
          ? { ...variant, styles: { ...variant.styles, [styleKey]: value } }
          : variant
      );
      return { ...prev, [componentType]: updatedVariants };
    });
  };

  const updateVariantName = (componentType, variantIndex, newName) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev[componentType].map((variant, idx) =>
        idx === variantIndex ? { ...variant, name: newName } : variant
      );
      return { ...prev, [componentType]: updatedVariants };
    });
  };

  // Function to delete a variant
  const deleteVariant = (componentType, index) => {
    setComponentVariants((prev) => {
      const updatedVariants = [...prev[componentType]];
      updatedVariants.splice(index, 1);
      return { ...prev, [componentType]: updatedVariants };
    });
  };

  // Function to handle selecting a variant for preview
  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <Box display="flex">
      {/* Main component section */}
      <Box flex="1" p={4}>
        <ListSubheader sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Components
        </ListSubheader>

        <ButtonComponent/>

        {/* Inputs Section */}
        <div>
          <h2>Inputs</h2>
          <Button
            variant="contained"
            onClick={() => addComponentVariant("input")}
          >
            Add Input Variant
          </Button>
          {componentVariants.input.map((variant, index) => (
            <Box key={index} mb={2}>
              <TextField
                label="Variant Name"
                value={variant.name}
                onChange={(e) =>
                  updateVariantName("input", index, e.target.value)
                }
              />
              <h4>Styles</h4>

              {/* Background color select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Background Color"
                  value={variant.styles.backgroundColor || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "input",
                      index,
                      "backgroundColor",
                      e.target.value
                    )
                  }
                >
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Text color select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Text Color"
                  value={variant.styles.color || ""}
                  onChange={(e) =>
                    updateVariantStyle("input", index, "color", e.target.value)
                  }
                >
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Border color select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Border Color"
                  value={variant.styles.borderColor || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "input",
                      index,
                      "borderColor",
                      e.target.value
                    )
                  }
                >
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Border radius select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Border Radius"
                  value={variant.styles.borderRadius || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "input",
                      index,
                      "borderRadius",
                      e.target.value
                    )
                  }
                >
                  {radius.map((r, idx) => (
                    <MenuItem key={idx} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Padding X select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Padding X"
                  value={variant.styles.paddingX || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "input",
                      index,
                      "paddingX",
                      e.target.value
                    )
                  }
                >
                  {spacing.map((s, idx) => (
                    <MenuItem key={idx} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Padding Y select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Padding Y"
                  value={variant.styles.paddingY || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "input",
                      index,
                      "paddingY",
                      e.target.value
                    )
                  }
                >
                  {spacing.map((s, idx) => (
                    <MenuItem key={idx} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Delete variant button */}
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteVariant("input", index)}
              >
                Delete Variant
              </Button>

              {/* Input preview */}
              <TextField label={variant.name} style={variant.styles} />
            </Box>
          ))}
        </div>

        {/* Selects Section */}
        <div>
          <h2>Selects</h2>
          <Button
            variant="contained"
            onClick={() => addComponentVariant("select")}
          >
            Add Select Variant
          </Button>
          {componentVariants.select.map((variant, index) => (
            <Box key={index} mb={2}>
              <TextField
                label="Variant Name"
                value={variant.name}
                onChange={(e) =>
                  updateVariantName("select", index, e.target.value)
                }
              />
              <h4>Styles</h4>

              {/* Background color select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Background Color"
                  value={variant.styles.backgroundColor || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "select",
                      index,
                      "backgroundColor",
                      e.target.value
                    )
                  }
                >
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Text color select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Text Color"
                  value={variant.styles.color || ""}
                  onChange={(e) =>
                    updateVariantStyle("select", index, "color", e.target.value)
                  }
                >
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Border color select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Border Color"
                  value={variant.styles.borderColor || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "select",
                      index,
                      "borderColor",
                      e.target.value
                    )
                  }
                >
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Border radius select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Border Radius"
                  value={variant.styles.borderRadius || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "select",
                      index,
                      "borderRadius",
                      e.target.value
                    )
                  }
                >
                  {radius.map((r, idx) => (
                    <MenuItem key={idx} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Padding X select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Padding X"
                  value={variant.styles.paddingX || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "select",
                      index,
                      "paddingX",
                      e.target.value
                    )
                  }
                >
                  {spacing.map((s, idx) => (
                    <MenuItem key={idx} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Padding Y select */}
              <Box mb={2} fullWidth>
                <Select
                  fullWidth
                  label="Padding Y"
                  value={variant.styles.paddingY || ""}
                  onChange={(e) =>
                    updateVariantStyle(
                      "select",
                      index,
                      "paddingY",
                      e.target.value
                    )
                  }
                >
                  {spacing.map((s, idx) => (
                    <MenuItem key={idx} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Delete variant button */}
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteVariant("select", index)}
              >
                Delete Variant
              </Button>

              {/* Select preview */}
              <Select
                value={variant.name}
                label={variant.name}
                style={variant.styles}
              >
                {/* Add options here */}
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </Box>
          ))}
        </div>
      </Box>

      {/* Preview section */}
      <Box p={4}>
        <h2>Preview</h2>
        <Box mb={2}>
          <h3>Selected Variant</h3>
          <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>
        </Box>
      </Box>
    </Box>
  );
};

export default Components;
