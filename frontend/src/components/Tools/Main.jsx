import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import Colour from "../HandleStyles/Colour";
import Radius from "../HandleStyles/Radius";
import Spacing from "../HandleStyles/Spacing";
import Components from "./Components";
import FigrIcon from "../util/FigrIcon";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const Main = () => {
  // State for managing the active tab
  const [value, setValue] = useState(0);

  // Event handler for tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleLogoutClick = () => {

    localStorage.removeItem('authToken');
  
    localStorage.removeItem('userId');
    
    navigate('/sign-in'); 
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
        <Box>
          <IconButton onClick={handleBackClick} edge="start">
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton edge="start">
            <Link href="/">
              <FigrIcon style={{ fontSize: "40px" }} />
            </Link>
          </IconButton>
        </Box>

        <Box>
          <Button sx={{ marginRight: "5px" }} variant="outlined">
            Save Project
          </Button>
          <Button onClick={handleLogoutClick} variant="outlined">
            Logout
          </Button>
        </Box>
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
