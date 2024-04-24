import { useState } from "react";
import { Box, Grid, Stack, TextField, Button } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

const Spacing = () => {
  // State for list items
  const [listItems, setListItems] = useState([
    { id: 1, isOpen: false, variableName: "Spacing 1", pxValue: 16, remValue: 1 },
    { id: 2, isOpen: false, variableName: "Spacing 2", pxValue: 24, remValue: 1.5 }
  ]);

  // Function to convert px to rem (assuming base font size of 16px)
  const pxToRem = (pxValue) => {
    const baseFontSize = 16; // Base font size in pixels
    return pxValue / baseFontSize;
  };

  // Handle click event for list items
  const handleClick = (id) => {
    setListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  // Handle adding a new list item
  const handleAdd = () => {
    const newId = listItems.length + 1;
    setListItems((prevItems) => [
      ...prevItems,
      {
        id: newId,
        isOpen: false,
        variableName: `Spacing ${newId}`,
        pxValue: 0,
        remValue: pxToRem(0)
      }
    ]);
  };

  // Handle deleting a list item
  const handleDelete = (id) => {
    setListItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* Button to add a new list item */}
      <Button variant="outlined" onClick={handleAdd}>
        Add New
      </Button>

      {/* List */}
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            component="div"
            id="nested-list-subheader"
          >
            Spacing
          </ListSubheader>
        }
      >
        {/* Iterate over list items */}
        {listItems.map((item) => (
          <div key={item.id}>
            <ListItemButton onClick={() => handleClick(item.id)}>
              <ListItemText primary={item.variableName} />
              {item.isOpen ? <ExpandLess /> : <ExpandMore />}
              {/* Delete button */}
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </ListItemButton>
            <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Box
                  width="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Stack spacing={2}>
                        {/* Variable name text field */}
                        <TextField
                          id={`variable-name-${item.id}`}
                          label="Variable Name"
                          defaultValue={item.variableName}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            // Update the variable name in the list item
                            setListItems((prevItems) =>
                              prevItems.map((listItem) =>
                                listItem.id === item.id
                                  ? { ...listItem, variableName: newValue }
                                  : listItem
                              )
                            );
                          }}
                        />

                        {/* Pixel value text field */}
                        <TextField
                          id={`px-value-${item.id}`}
                          label="Enter px Value"
                          type="number"
                          defaultValue={item.pxValue}
                          onChange={(e) => {
                            const newPxValue = parseFloat(e.target.value);
                            // Calculate the rem value and update the list item
                            const newRemValue = pxToRem(newPxValue);
                            setListItems((prevItems) =>
                              prevItems.map((listItem) =>
                                listItem.id === item.id
                                  ? {
                                      ...listItem,
                                      pxValue: newPxValue,
                                      remValue: newRemValue
                                    }
                                  : listItem
                              )
                            );
                          }}
                        />

                        {/* Disabled text field to display the rem value */}
                        <TextField
                          id={`rem-value-${item.id}`}
                          label="rem"
                          value={item.remValue.toFixed(2)}
                          disabled
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </>
  );
};

export default Spacing;
