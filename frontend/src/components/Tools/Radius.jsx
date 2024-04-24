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

const Radius = () => {
  // State for list items
  const [listItems, setListItems] = useState([
    { id: 1, isOpen: false, variableName: "Primary", radiusValue: 5 },
    { id: 2, isOpen: false, variableName: "Secondary", radiusValue: 10 }
  ]);

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
      { id: newId, isOpen: false, variableName: `Radius ${newId}`, radiusValue: 0 }
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
            Radius
          </ListSubheader>
        }
      >
        {/* Iterate over list items */}
        {listItems.map((item) => (
          <div key={item.id}>
            <ListItemButton onClick={() => handleClick(item.id)}>
              <ListItemText primary={item.variableName} />
              {item.isOpen ? <ExpandLess /> : <ExpandMore />}
              {/* Add a delete button */}
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon fontSize="small"/>
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
                          onChange={(e) => {
                            const value = e.target.value;
                            // Update the variable name in the list item
                            setListItems((prevItems) =>
                              prevItems.map((listItem) =>
                                listItem.id === item.id
                                  ? { ...listItem, variableName: value }
                                  : listItem
                              )
                            );
                          }}
                        />
                        <TextField
                          id="outlined-number"
                          label="Radius Value"
                          type="number"
                          defaultValue={item.radiusValue}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            // Update the radius value in the list item
                            setListItems((prevItems) =>
                              prevItems.map((listItem) =>
                                listItem.id === item.id
                                  ? { ...listItem, radiusValue: value }
                                  : listItem
                              )
                            );
                          }}
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

export default Radius;
