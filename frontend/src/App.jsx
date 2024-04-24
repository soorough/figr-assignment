import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./components/Home";
import Main from "./components/Tools/Main";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Projects from "./components/Projects";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectName" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
