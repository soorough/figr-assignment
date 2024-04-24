import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  ListSubheader,
  Grid,
} from "@mui/material";
import { useRecoilState } from "recoil";
import componentVariantsAtom from "../../../recoil/components/Components.atom";

import radiusAtom from "../../../recoil/Radius/Radius.atom";
import colorsAtom from "../../../recoil/Colors/Colors.atom";
import spacingAtom from "../../../recoil/Spacing/Spacing.atom";
import { useState } from "react";

const ButtonComponent = () => {
  const [colors] = useRecoilState(colorsAtom);
  const [radius] = useRecoilState(radiusAtom);
  const [spacing] = useRecoilState(spacingAtom);
  const [componentVariants, setComponentVariants] = useRecoilState(
    componentVariantsAtom
  );
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Function to add a new button variant
  const addButtonVariant = () => {
    const newVariant = { name: "", styles: {} };
    setComponentVariants((prev) => ({
      ...prev,
      button: [...prev.button, newVariant],
    }));
  };

  // Function to update a button variant's style
  const updateVariantStyle = (index, styleKey, value) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev.button.map((variant, i) =>
        i === index
          ? { ...variant, styles: { ...variant.styles, [styleKey]: value } }
          : variant
      );
      return { ...prev, button: updatedVariants };
    });
  };

  // Function to update a button variant's name
  const updateVariantName = (index, newName) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev.button.map((variant, i) =>
        i === index ? { ...variant, name: newName } : variant
      );
      return { ...prev, button: updatedVariants };
    });
  };

  // Function to delete a button variant
  const deleteVariant = (index) => {
    setComponentVariants((prev) => {
      const updatedVariants = [...prev.button];
      updatedVariants.splice(index, 1);
      return { ...prev, button: updatedVariants };
    });
  };

  // Function to handle the selection of a variant
  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <Grid container spacing={3}>
      {/* Left column for the form */}
      <Grid item xs={12} md={6}>
        <ListSubheader sx={{ fontSize: "15px" }}>Buttons</ListSubheader>
        <Button variant="contained" onClick={addButtonVariant}>
          Add Button Variant
        </Button>
        {componentVariants.button.map((variant, index) => (
          <Box key={index} mb={3}>
            <TextField
              sx={{ mt: "1rem" }}
              size="small"
              label="Variant Name"
              value={variant.name}
              onChange={(e) => updateVariantName(index, e.target.value)}
            />
            <h4>Styles</h4>

            {/* Grid for layout */}
            <Grid container spacing={2}>
              {/* Background color select */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Background Color"
                  value={variant.styles.backgroundColor || ""}
                  onChange={(e) =>
                    updateVariantStyle(index, "backgroundColor", e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Choose Color</em>
                  </MenuItem>
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.hexCode}>
                      {color.variableName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Text color select */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Text Color"
                  value={variant.styles.color || ""}
                  onChange={(e) =>
                    updateVariantStyle(index, "color", e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Choose Color</em>
                  </MenuItem>
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.hexCode}>
                      {color.variableName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Border color select */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Border Color"
                  value={variant.styles.borderColor || ""}
                  onChange={(e) =>
                    updateVariantStyle(index, "borderColor", e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Choose Color</em>
                  </MenuItem>
                  {colors.map((color, idx) => (
                    <MenuItem key={idx} value={color.hexCode}>
                      {color.variableName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Border radius select */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Border Radius"
                  value={variant.styles.borderRadius || ""}
                  onChange={(e) =>
                    updateVariantStyle(index, "borderRadius", e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Choose Radius</em>
                  </MenuItem>
                  {radius.map((r, idx) => (
                    <MenuItem key={idx} value={r.radiusValue}>
                      {r.variableName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Padding X select */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Padding X"
                  value={variant.styles.paddingX || ""}
                  onChange={(e) =>
                    updateVariantStyle(index, "paddingX", e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Choose Spacing</em>
                  </MenuItem>
                  {spacing.map((s, idx) => (
                    <MenuItem key={idx} value={s.pxValue}>
                      {s.variableName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Padding Y select */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Padding Y"
                  value={variant.styles.paddingY || ""}
                  onChange={(e) =>
                    updateVariantStyle(index, "paddingY", e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Choose Spacing</em>
                  </MenuItem>
                  {spacing.map((s, idx) => (
                    <MenuItem key={idx} value={s.pxValue}>
                      {s.variableName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Delete variant button */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteVariant(index)}
                >
                  Delete Variant
                </Button>
              </Grid>

              {/* Button preview */}
              <Grid item xs={12}>
                <Button
                  style={variant.styles}
                  onClick={() => handleSelectVariant(variant)}
                >
                  {variant.name}
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>

      {/* Right column for the preview */}
      <Grid item xs={12} md={6}>
        <ListSubheader sx={{ fontSize: "15px" }}>Preview</ListSubheader>
        {selectedVariant && (
          <Button
            style={selectedVariant.styles}
            onClick={() => handleSelectVariant(selectedVariant)}
          >
            {selectedVariant.name}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ButtonComponent;
