import { useRecoilState } from "recoil";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Button,
  ListSubheader,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import spacingAtom from "../../../recoil/Spacing/Spacing.atom"; // Import your spacing Atom

const Spacing = () => {
  // Use Recoil state for list items
  const [listItems, setListItems] = useRecoilState(spacingAtom);

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
    <Grid container spacing={2} mt={2}>
      {/* Input list on the left */}
      <Grid item xs={6}>
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
      </Grid>

      {/* Prototype of text in a box on the right */}
      <Grid item xs={5} md={3}>
        <Box
          sx={{
            py:"2",
            width: "150px",
            height: "150px",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            padding: listItems.find((item) => item.isOpen)?.pxValue || 0, // Apply padding based on selected list item's pxValue
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          HEHE!
        </Box>
      </Grid>
    </Grid>
  );
};

export default Spacing;
