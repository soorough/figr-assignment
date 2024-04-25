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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import colorsAtom from "../../../recoil/Colors/Colors.atom";
import radiusAtom from "../../../recoil/Radius/Radius.atom";
import spacingAtom from "../../../recoil/Spacing/Spacing.atom";
import componentVariantsAtom from "../../../recoil/components/Components.atom";
import { transformDataForServer } from "../util/TransformData";
import {baseUrl} from "../util/Url.config"

const Main = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { projectId } = useParams();  // Retrieving projectId from the URL


  // Use Recoil to get current state values
  const colors = useRecoilValue(colorsAtom);
  const radius = useRecoilValue(radiusAtom);
  const spacing = useRecoilValue(spacingAtom);
  const component = useRecoilValue(componentVariantsAtom);

  // Define the recoilData
  const recoilData = {
    colors,
    radius,
    spacing,
    component,
  };

  const transformedData = transformDataForServer(recoilData);

  // Handle tab changes
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle back click
  const handleBackClick = () => {
    navigate(-1);
  };

  // Handle logout click
  const handleLogoutClick = () => {
    // Clear local storage and redirect to sign-in
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/sign-in");
  };

  // Handle saving data to backend
  const handleSaveClick = () => {
    saveDataToBackend(transformedData);
  };

  // Function to save data to backend
  const saveDataToBackend = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      // Use PUT request to update project data
      await axios.put(`${baseUrl}/api/v1/project/${projectId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data to the backend:", error);
    }
  };

  // Render components based on the active tab value
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
      <Box height={50} width="full" display="flex" alignItems="center" justifyContent="space-between" p={2}>
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
          <Button onClick={handleSaveClick} sx={{ marginRight: "5px" }} variant="outlined">
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
