import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../App";
import useTheme from "../hooks/ThemeExpanders";

const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.normalTheme};
  color: ${({ theme }) => theme.inversedTheme};
  margin-top: 40px;
  border-radius: 10px;
  border: 2px
    ${({ theme }) => (theme.normalTheme === "white" ? "#DDDDDD" : "#373737")}
    solid;
  box-shadow: 5px 2px 2px 2px
    ${({ theme }) => (theme.normalTheme === "white" ? "#373737" : "#DDDDDD")}
    solid;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
  display: flex;
  width: 40vh;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Login() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [normalTheme, inversedTheme] = useTheme(theme);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [message, setMessage] = useState("");
  return (
    <>
      <LoginForm
        theme={{ normalTheme, inversedTheme }}
        onSubmit={(e) => {
          e.preventDefault();
          axios({
            method: "GET",
            url: `http://localhost:3001/api/login?email=${email.current.value}&password=${password.current.value}`,
          }).then((res) => setMessage(res.data));
        }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" ref={email} id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" ref={password} id="password"/>
        <input type="submit" value="Submit" />
        <p>
          Don't have an account ? <Link to="/Register">Register</Link>
        </p>
        <p>
          {message}
        </p>
      </LoginForm>
    </>
  );
}
