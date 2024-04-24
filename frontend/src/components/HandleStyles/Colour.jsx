import { useRecoilState } from "recoil";
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
import colorsAtom from "../../../recoil/Colors/Colors.atom";

const Colour = () => {
  // Access and modify colors state
  const [colors, setColors] = useRecoilState(colorsAtom);

  // Handle click event for list items
  const handleClick = (id) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === id
          ? { ...color, isOpen: !color.isOpen }
          : { ...color, isOpen: false }
      )
    );
  };
  // Handle adding a new list item
  const handleAdd = () => {
    const newId = colors.length + 1;
    setColors((prevColors) => [
      ...prevColors,
      { id: newId, isOpen: false, variableName: `Color ${newId}`, hexCode: "#FFFFFF" },
    ]);
  };

  // Handle deleting a list item
  const handleDelete = (id) => {
    setColors((prevColors) => prevColors.filter((color) => color.id !== id));
  };

  // Handle updating hex code of a list item
  const handleHexCodeChange = (id, newHexCode) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === id ? { ...color, hexCode: newHexCode } : color
      )
    );
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
            sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}
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
            {colors.map((color) => (
              <div key={color.id}>
                <ListItemButton onClick={() => handleClick(color.id)}>
                  <ListItemText primary={color.variableName} />
                  {color.isOpen ? <ExpandLess /> : <ExpandMore />}
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(color.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </ListItemButton>
                <Collapse in={color.isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Box
                      width="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      p={2}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Stack spacing={2}>
                            <TextField
                              id="outlined-helperText"
                              label="Variable Name"
                              defaultValue={color.variableName}
                              onChange={(e) => {
                                const newName = e.target.value;
                                setColors((prevColors) =>
                                  prevColors.map((c) =>
                                    c.id === color.id
                                      ? { ...c, variableName: newName }
                                      : c
                                  )
                                );
                              }}
                            />
                            <TextField
                              id="outlined-helperText"
                              label="Enter HEX Code"
                              value={color.hexCode}
                              helperText="Value can be of text, hex, or hsl."
                              onChange={(e) =>
                                handleHexCodeChange(color.id, e.target.value)
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
        <Grid item xs={5} md={2}>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              backgroundColor: colors.find((color) => color.isOpen)?.hexCode || "#FFFFFF",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {/* Display the hex code of the currently selected color */}
            {colors.find((color) => color.isOpen)?.hexCode || "No Color Selected"}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Colour;
