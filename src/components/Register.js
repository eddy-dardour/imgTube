import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../App";
import useTheme from "../hooks/ThemeExpanders";

const RegisterForm = styled.form`
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

export default function Register() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [normalTheme, inversedTheme] = useTheme(theme);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [message, setMessage] = useState("");
  return (
    <>
      <RegisterForm
        theme={{ normalTheme, inversedTheme }}
        onSubmit={(e) => {
          e.preventDefault();
          axios({
            method: "POST",
            url: "http://localhost:3001/api/register",
            headers: {
              "Content-Type": "application/json",
            },
            data : {
              username: username.current.value,
              email: email.current.value,
              password: email.current.value,
            },
          }).then((res) => console.log(res));
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={username}
          autoComplete="username"
        />
        <label htmlFor="email">Email</label>
        <input type="email" ref={email} id="email" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          ref={password}
          id="password"
          autoComplete="current-password"
        />
        <input type="submit" value="Submit" />
        <p>
          Already have an account ? <Link to="/Login">Login</Link>
        </p>
        <p>{message}</p>
      </RegisterForm>
    </>
  );
}
