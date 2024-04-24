import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import videoBG from "../assets/AbstractWaves.mp4";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/soorough">
        SOOROUGH
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// Function to get logged-in user's ID
function getLoggedInUserId() {
  // Retrieve token from local storage (or wherever you stored it)
  const token = localStorage.getItem("authToken");

  if (token) {
    // Decode the token to get the payload
    const decodedToken = jwtDecode(token);

    // Return the user ID from the token payload
    return decodedToken.userId;
  } else {
    // Handle case when token is not found
    console.warn("No token found");
    return null;
  }
}

export default function Projects() {
  const currentUserId = getLoggedInUserId();
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/project/create", {
        name: projectName,
        userId: currentUserId,
      });

      const { name } = response.data;

      navigate(`/projects/${name}`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "100vh",
            }}
          >
            <video
              src={videoBG}
              autoPlay
              loop
              muted
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "black" }}>
                <FolderIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Projects
              </Typography>
              {/* Remove the inner form here */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="projectname"
                label="Name"
                name="projectname"
                autoComplete="project-name"
                autoFocus
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create a new project
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/projects/"
//         );
//         const data = response.data;
//         setProjects(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProjects();

//     return () => {};
//   }, []);

//   return (
//     <>
//       <>
//         {projects.map((project, index) => (
//           <div key={index}>
//             <button>{project.name}</button>
//           </div>
//         ))}
//       </>
//     </>
//   );
// };
