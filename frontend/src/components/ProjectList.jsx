import {
  ListItemText,
  Button,
  ListItem,
  List,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:3000/api/v1/project/getprojects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extract the projects from the response data
        const data = response.data.projects;
        console.log(data);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();

    return () => {};
  }, []);

  return (
    <>
      <div style={{ width: "100%", padding: "20px" }}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Old Projects
        </Typography>
        <Paper elevation={3} style={{ padding: "10px" }}>
          <List style={{ width: "100%" }}>
            {projects.map((project, index) => (
              <ListItem
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "10px",
                  transition: "background-color 0.3s ease",
                  width: "100%", // Set list item width to 100%
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemText primary={project.name} />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "auto" }}
                >
                  Open
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </>
  );
};

export default ProjectList;
