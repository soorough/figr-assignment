import React from 'react';
import { Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { useRecoilState } from 'recoil';
import componentVariantsAtom from '../../../recoil/ComponentVariants.atom';

const InputInputs = () => {
    const [componentVariants, setComponentVariants] = useRecoilState(componentVariantsAtom);


  // Function to handle adding new input variant
  const addInputVariant = () => {
    const newVariant = { name: '', styles: {} };
    setComponentVariants((prev) => ({
      ...prev,
      input: [...prev.input, newVariant],
    }));
  };

  // Function to update input variant styles and name
  const updateVariantStyle = (variantIndex, styleKey, value) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev.input.map((variant, idx) =>
        idx === variantIndex
          ? { ...variant, styles: { ...variant.styles, [styleKey]: value } }
          : variant
      );
      return { ...prev, input: updatedVariants };
    });
  };

  const updateVariantName = (variantIndex, newName) => {
    setComponentVariants((prev) => {
      const updatedVariants = prev.input.map((variant, idx) =>
        idx === variantIndex ? { ...variant, name: newName } : variant
      );
      return { ...prev, input: updatedVariants };
    });
  };

  // Function to delete a variant
  const deleteVariant = (index) => {
    setComponentVariants((prev) => {
      const updatedVariants = [...prev.input];
      updatedVariants.splice(index, 1);
      return { ...prev, input: updatedVariants };
    });
  };

  return (
    <div>
      <h2>Inputs</h2>
      <Button variant="contained" onClick={addInputVariant}>
        Add Input Variant
      </Button>
      {componentVariants.input.map((variant, index) => (
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

          {/* Input preview */}
          <TextField
            style={variant.styles}
            value={variant.name}
            onChange={() => handleSelectVariant(variant)}
          />
        </Box>
      ))}
    </div>
  );
};

export default InputInputs;
