import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListSubheader,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

const Colour = () => {
  // State for list items
  const [listItems, setListItems] = useState([
    { id: 1, isOpen: false, variableName: "Primary", hexCode: "#009FF5" },
    { id: 2, isOpen: false, variableName: "Secondary", hexCode: "#FF0000" },
  ]);
  
  // State for currently selected item for color preview
  const [selectedColor, setSelectedColor] = useState(null);

  // Handle click event for list items
  const handleClick = (id) => {
    setListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );

    // Set the selected color when an item is clicked
    const selectedItem = listItems.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedColor(selectedItem.hexCode);
    }
  };

  // Handle adding a new list item
  const handleAdd = () => {
    const newId = listItems.length + 1;
    setListItems((prevItems) => [
      ...prevItems,
      { id: newId, isOpen: false, variableName: `Color ${newId}`, hexCode: "#FFFFFF" }
    ]);
  };

  // Handle deleting a list item
  const handleDelete = (id) => {
    setListItems((prevItems) => prevItems.filter((item) => item.id !== id));
    // Reset selected color if the deleted item was selected
    if (selectedColor && listItems.find((item) => item.id === id).hexCode === selectedColor) {
      setSelectedColor(null);
    }
  };

  // Handle updating hex code of a list item
  const handleHexCodeChange = (id, newHexCode) => {
    setListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, hexCode: newHexCode } : item
      )
    );
    
    // Update the selected color if the updated item is the selected one
    const selectedItem = listItems.find((item) => item.id === id);
    if (selectedItem && selectedItem.hexCode === selectedColor) {
      setSelectedColor(newHexCode);
    }
  };

  return (
    <Box>
      {/* Button to add a new list item */}
      <Button variant="outlined" onClick={handleAdd}>
        Add New
      </Button>

      {/* List */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
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
                Colours
              </ListSubheader>
            }
          >
            {/* Iterate over list items */}
            {listItems.map((item) => (
              <div key={item.id}>
                <ListItemButton onClick={() => handleClick(item.id)}>
                  <ListItemText primary={item.variableName} />
                  {item.isOpen ? <ExpandLess /> : <ExpandMore />}
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
                            <TextField
                              id="outlined-helperText"
                              label="Variable Name"
                              defaultValue={item.variableName}
                            />
                            <TextField
                              id="outlined-helperText"
                              label="Enter HEX Code"
                              value={item.hexCode}
                              helperText="Value can be of text, hex or hsl."
                              onChange={(e) =>
                                handleHexCodeChange(item.id, e.target.value)
                              }
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
        </Grid>

        {/* Color preview */}
        <Grid item xs={6}>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              backgroundColor: selectedColor || "#FFFFFF",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {/* Display the selected color code */}
            {selectedColor || "No Color Selected"}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Colour;
