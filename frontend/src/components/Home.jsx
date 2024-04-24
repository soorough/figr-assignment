import { useNavigate } from "react-router-dom";
import videoBG from "../assets/AbstractWaves.mp4";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sign-up");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <video
        src={videoBG}
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "100vh", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "10rem", color: "white" }}>FIGR</h1>
        </div>

        <Button sx={{ color: 'white', borderColor: 'white' }} variant="outlined" size="medium" onClick={handleClick}>
          GET STARTED!
        </Button>
      </div>
    </div>
  );
};

export default Home;
