import {
  ListItemText,
  Button,
  ListItem,
  List,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsAtom } from "../../recoil/Projects/Projects.atom";
import { useRecoilState } from "recoil";
import {baseUrl} from "./util/Url.config"

const ProjectList = () => {
  const [projects, setProjects] = useRecoilState(projectsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${baseUrl}/api/v1/project/getprojects`,
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
  }, [setProjects]);

  const handleOpenClick = (projectId) => {
    // Navigate to the specific project's route
    navigate(`/projects/${projectId}`);
  };

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
                  onClick={() => handleOpenClick(project._id)}
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
