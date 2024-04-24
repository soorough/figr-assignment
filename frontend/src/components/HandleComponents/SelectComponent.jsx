import React from 'react';
import { Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { useRecoilState } from 'recoil';
import componentVariantsAtom from '../../../recoil/ComponentVariants.atom';

const SelectInputs = ({ colors, radius, spacing, handleSelectVariant }) => {
  const [componentVariants, setComponentVariants] = useRecoilState(componentVariantsAtom);

  // Function to handle adding new select variant
  const addSelectVariant = () => {
    const newVariant = { name: '', styles: {} };
    setComponentVariants((prev) => ({
      ...prev,
      select: [...prev.select, newVariant],
    }));
  };

  // Function to update select variant styles and name
  const updateVariantStyle = (variantIndex, styleKey, value) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev.select.map((variant, idx) =>
        idx === variantIndex
          ? { ...variant, styles: { ...variant.styles, [styleKey]: value } }
          : variant
      );
      return { ...prev, select: updatedVariants };
    });
  };

  const updateVariantName = (variantIndex, newName) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev.select.map((variant, idx) =>
        idx === variantIndex ? { ...variant, name: newName } : variant
      );
      return { ...prev, select: updatedVariants };
    });
  };

  // Function to delete a variant
  const deleteVariant = (index) => {
    setComponentVariants((prev) => {
      const updatedVariants = [...prev.select];
      updatedVariants.splice(index, 1);
      return { ...prev, select: updatedVariants };
    });
  };

  return (
    <div>
      <h2>Selects</h2>
      <Button variant="contained" onClick={addSelectVariant}>
        Add Select Variant
      </Button>
      {componentVariants.select.map((variant, index) => (
        <Box key={index} mb={2}>
          <TextField
            label="Variant Name"
            value={variant.name}
            onChange={(e) => updateVariantName(index, e.target.value)}
          />
          <h4>Styles</h4>

          {/* Background color select */}
          <Box mb={2}>
            <Select
              label="Background Color"
              value={variant.styles.backgroundColor || ''}
              onChange={(e) =>
                updateVariantStyle(index, 'backgroundColor', e.target.value)
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
          <Box mb={2}>
            <Select
              label="Text Color"
              value={variant.styles.color || ''}
              onChange={(e) =>
                updateVariantStyle(index, 'color', e.target.value)
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
          <Box mb={2}>
            <Select
              label="Border Color"
              value={variant.styles.borderColor || ''}
              onChange={(e) =>
                updateVariantStyle(index, 'borderColor', e.target.value)
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
          <Box mb={2}>
            <Select
              label="Border Radius"
              value={variant.styles.borderRadius || ''}
              onChange={(e) =>
                updateVariantStyle(index, 'borderRadius', e.target.value)
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
          <Box mb={2}>
            <Select
              label="Padding X"
              value={variant.styles.paddingX || ''}
              onChange={(e) =>
                updateVariantStyle(index, 'paddingX', e.target.value)
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
          <Box mb={2}>
            <Select
              label="Padding Y"
              value={variant.styles.paddingY || ''}
              onChange={(e) =>
                updateVariantStyle(index, 'paddingY', e.target.value)
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
          <Button variant="outlined" color="error" onClick={() => deleteVariant(index)}>
            Delete Variant
          </Button>

          {/* Select preview */}
          <Select
            style={variant.styles}
            onChange={() => handleSelectVariant(variant)}
          >
            <MenuItem value={variant.name}>{variant.name}</MenuItem>
          </Select>
        </Box>
      ))}
    </div>
  );
};

export default SelectInputs;
