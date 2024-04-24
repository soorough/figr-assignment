import { Box, Button, Divider, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Colour from "./Colour";
import Radius from "./Radius";
import Spacing from "./Spacing";
import Components from "./Components";
import FigrIcon from "./FigrIcon";

const Main = () => {
  // State for managing the active tab
  const [value, setValue] = useState(0);

  // Event handler for tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Conditionally render components based on the active tab value
  const renderComponent = () => {
    switch (value) {
      case 0:
        return <Colour />;
      case 1:
        return <Radius />;
      case 2:
        return <Spacing />;
      case 3:
        return <Components />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        height={50}
        width="full"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <IconButton edge="start">
          <FigrIcon style={{ fontSize: '40px' }} />
        </IconButton>

        <Button variant="outlined">Save Project</Button>
      </Box>
      <Divider />
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Colour" />
        <Tab label="Radius" />
        <Tab label="Spacing" />
        <Tab label="Components" />
      </Tabs>
      
      {renderComponent()}
    </>
  );
};

export default Main;
