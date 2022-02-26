import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Video from "./components/Video";
import { ThemeExpander } from "./hooks/ThemeExpanders";
import "./App.css";
import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import useTheme from "./hooks/ThemeExpanders";

export const ThemeContext = createContext();

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  height: 100vh;
  background-color: ${(props) => props.theme};
`;
function ProviderAll() {
  const [theme, setThemeFunction] = useState("W");

    function setTheme(theme) {
      setThemeFunction(theme);
    }
    document.body.style.backgroundColor = ThemeExpander(theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Video/:id" element={<Video/>}/>
          </Routes>
        </BrowserRouter>
    </ThemeContext.Provider>
  );
}

function App() {
  return <ProviderAll />;
}

export default App;
