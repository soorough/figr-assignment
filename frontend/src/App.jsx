import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Projects from "./components/Projects";
import Home from "./components/Home";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
