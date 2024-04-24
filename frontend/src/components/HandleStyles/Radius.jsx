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
import radiusAtom from "../../../recoil/Radius/Radius.atom";

const Radius = () => {
  // Access and modify radius state using Recoil
  const [radiusList, setRadiusList] = useRecoilState(radiusAtom);

  // Handle click event for list items
  const handleClick = (id) => {
    setRadiusList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  // Handle adding a new list item
  const handleAdd = () => {
    const newId = radiusList.length + 1;
    setRadiusList((prevItems) => [
      ...prevItems,
      { id: newId, isOpen: false, variableName: `Radius ${newId}`, radiusValue: 0 },
    ]);
  };

  // Handle deleting a list item
  const handleDelete = (id) => {
    setRadiusList((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* Button to add a new list item */}
      <Button variant="outlined" onClick={handleAdd}>
        Add New
      </Button>

      <Grid container spacing={2} mt={2}>
        {/* Main input list on the left side */}
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
                Radius
              </ListSubheader>
            }
          >
            {/* Iterate over list items */}
            {radiusList.map((item) => (
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
                        <Grid item xs={12}>
                          <Stack spacing={2}>
                            <TextField
                              id="outlined-helperText"
                              label="Variable Name"
                              defaultValue={item.variableName}
                              onChange={(e) => {
                                const value = e.target.value;
                                setRadiusList((prevItems) =>
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
                                setRadiusList((prevItems) =>
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
        </Grid>

        {/* Radius preview box on the right side */}
        <Grid item xs={5} md={3}>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              backgroundColor: "#ffffff",
              border: "1px solid #ccc",
              borderRadius: radiusList.find((item) => item.isOpen)?.radiusValue || 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {/* Display the variable name and radius value */}
            {radiusList.find((item) => item.isOpen)
              ? `Variable: ${radiusList.find((item) => item.isOpen).variableName}, Radius: ${radiusList.find((item) => item.isOpen).radiusValue}px`
              : "No Radius Selected"}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Radius;
