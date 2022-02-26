import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../App";
import useTheme from "../hooks/ThemeExpanders";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logoNoTube.png";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 10vh;
  z-index: 1;
  border-bottom: 1px solid
    ${({ theme }) => (theme.regTheme === "white" ? "#DDDDDD" : "#373737")};
  background-color: ${({ theme }) => theme.regTheme};
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    flex-grow: 1;
    margin: 2px;
  }
`;
const Search = styled.input`
  height: max-content;
  border-radius: 5px;
  border: 1px solid
    ${({ theme }) => (theme.regTheme === "white" ? "#DDDDDD" : "#373737")};
  outline: none;
  font-size: 1rem;
  width: max-content;
  padding: 5px;
  @media only screen and (max-width: 480px) {
    width: 50px;
  }
`;
const SearchBar = styled.div`
  height: 5vh;
  display: inline-flex;
  justify-content: stretch;
`;
const SearchButton = styled.svg`
  width: 20px;
  height: 20px;
`;
const P = styled.p`
  color: ${(props) => props.theme.regTheme};
  background-color: ${({ theme }) => theme.invTheme};
  border-radius: 2px;
  padding: 10px;
  margin: 2px;
`;
const Button = styled.button`
  outline: none;
  border-radius: 5px;
  border: 0.8px solid white;
  background-color: #e8343d;
  margin: 2px;
  color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  max-height: 100%;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    background-color: white;
    color: red;
  }
`;
const Logo = styled.img`
  margin-left: 5px;
  filter: drop-shadow(0 0 0.1rem black);
  height: clamp(10px, 40px, 60px);
`;
const Settings = styled.div`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.regTheme};
  border: 1px solid
    ${({ theme }) => (theme.regTheme === "white" ? "#DDDDDD" : "#373737")};
  border-radius: 3px;
  padding: 5px;
  right: 0;
  z-index: 2;
`;
const SettingButton = styled(Button)`
  background-color: ${({ theme }) => theme.regTheme};
  color: ${({ theme }) => theme.invTheme};
`;
const GearEmpty = styled.svg`
  z-index: 2;
  width: 30px;
  height: 30px;
  margin: 5px;
  filter: drop-shadow(0px 0.5px 14px white);
`;
const BurgerIcon = styled.svg`
  width: 20px;
  height: 20px;
`;
const GearFill = styled(GearEmpty)``;
const Slider = styled.div`
  @media only screen and (max-width: 768px) {
    width: 30vw;
    font-size: 15px;
  }
  background-color: ${({ theme }) => theme.regTheme};
  color: ${({ theme }) => theme.invTheme};
  width: 10vw;
  justify-content: stretch;
  position: fixed;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ theme }) => (theme.regTheme === "white" ? "#DDDDDD" : "#373737")};
`;
const FileInput = styled.input``;
const FileForm = styled.form`
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  * {
    margin: none;
    padding: none;
  }
  label {
    color: ${({ theme }) => theme.regTheme};
    background-color: ${({ theme }) => theme.invTheme};
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: wrap;
  margin-top: 5px;
  flex-grow: 3;
  margin-bottom: 5px;
  text-align: center;
  outline: none;
  border: 1px solid
    ${({ theme }) => (theme.regTheme === "white" ? "#DDDDDD" : "#373737")};
  background-color: ${({ theme }) => theme.regTheme};
  color: ${({ theme }) => theme.invTheme};
`;

export default function Header() {
  const file = useRef(null);
  const title = useRef(null);
  const search = useRef(null);
  async function searchFunction(e) {
    e.preventDefault();
    console.log(search.current.value)
    const res = await fetch(
      `http://localhost:3001/api/videos/get-by-title/${search.current.value}`
    );
    const value = await res.json();
    console.log(value.id)
    window.location.href = `http://localhost:3000/Video/${value.id}`
  }
  const { theme, setTheme } = useContext(ThemeContext);
  const [regTheme, invTheme] = useTheme(theme);
  const [settingsOpen, setSettings] = useState(false);
  const [burgerOpen, setBurger] = useState(false);
  return (
    <>
      <HeaderWrapper theme={{ regTheme, invTheme }}>
        <Link to="/">
          <Logo src={logo} alt={logo} />
        </Link>
        <BurgerIcon
          onClick={() => setBurger(!burgerOpen)}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </BurgerIcon>
        <SearchBar>
          <Search
            ref={search}
            type="text"
            placeholder="Search..."
            onChange={() => fetch("http://localhost:3001/")}
            theme={{ regTheme, invTheme }}
          />
          <SearchButton
            onClick={(e) => searchFunction(e)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </SearchButton>
        </SearchBar>
        <Link to="/Register">
          <Button>Register</Button>
        </Link>
        <div>
          {settingsOpen ? (
            <GearFill
              onClick={() => setSettings(!settingsOpen)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </GearFill>
          ) : (
            <GearEmpty
              onClick={() => setSettings(!settingsOpen)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </GearEmpty>
          )}
        </div>
      </HeaderWrapper>
      <AnimatePresence exitBeforeEnter>
        {settingsOpen && (
          <motion.div
            key={Location.pathname}
            initial={{
              position: "fixed",
              x: "150px",
              y: "100px",
              top: 0,
              right: 0,
              opacity: 0,
            }}
            animate={{
              x: -10,
              y: "100px",
              opacity: 1,
            }}
            exit={{
              x: "150px",
              y: 0,
              opacity: 0,
            }}
          >
            <Settings theme={{ regTheme, invTheme }}>
              <ul>
                <li>
                  <SettingButton
                    theme={{ regTheme, invTheme }}
                    onClick={() => setTheme("B")}
                  >
                    Set dark theme
                  </SettingButton>
                </li>
                <li>
                  <SettingButton
                    theme={{ regTheme, invTheme }}
                    onClick={() => setTheme("W")}
                  >
                    Set white theme
                  </SettingButton>
                </li>
              </ul>
            </Settings>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {burgerOpen && (
          <motion.div
            key={Location.pathname}
            initial={{
              x: -500,
              opacity: 0,
              height: "100%",
              top: 0,
              position: "absolute",
            }}
            animate={{
              x: 0,
              y: 0,
              position: "absolute",
              opacity: 1,
            }}
            exit={{
              x: -200,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Slider theme={{ regTheme, invTheme }}>
              <div>
                <p> NoTube </p>
                <FileForm
                  enctype="multipart/form-data"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("title", title.current.value);
                    formData.append("file", file.current.files[0]);
                    axios.post(
                      "http://localhost:3001/api/videos/post",
                      formData
                    );
                  }}
                >
                  <FileInput
                    type="file"
                    ref={file}
                    placeholder="Post a video"
                    theme={{ regTheme, invTheme }}
                  />
                  <input type="text" placeholder="title" ref={title} />
                  <input type="submit" />
                </FileForm>
                <BurgerIcon
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  onClick={() => setBurger(!burgerOpen)}
                  fill="currentColor"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </BurgerIcon>
              </div>
            </Slider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
