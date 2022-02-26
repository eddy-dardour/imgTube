import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import useTheme from "../hooks/ThemeExpanders";
import { ThemeContext } from "../App";
import Register from "./Register";
import { Link } from "react-router-dom";
const VideosGrid = styled.div`
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1vh;
  margin: auto;
  width: 80%;
  flex-wrap: wrap;
`;
const IMG = styled.img`
  justify-self: flex-start;
  align-self: center;
  width: 100%;
  height: 80%;
`;
const VideoElement = styled.div`
  width: 100%;
  display: flex;
  margin: 2px;
  white-space: nowrap;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.regTheme};
  color: ${({ theme }) => theme.invTheme};
  flex-direction: column;
  border: 1px solid
    ${({ theme }) => (theme.regTheme === "white" ? "#DDDDDD" : "#373737")};
`;
const VideoTitle = styled.p`
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    max-width: 40rem;
  }
  color: ${({ theme }) => theme.invTheme};
  max-width: 20rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  box-orient: vertical;
  padding-left: 10px;
`;
const VideoData = styled.div`
  display: flex;
  justify-content: center;
`;
const Views = styled.p`
  margin: 5px;
`;
const Likes = styled.p`
  margin: 5px;
`;

export default function Home() {
  const [items, setItems] = useState([]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [regTheme, invTheme] = useTheme(theme);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3001/api/videos/get");
      const value = await res.json();
      setItems(value);
    }
    fetchData();
  }, []);
  return (
    <VideosGrid>
      {items.map((item, i) => {
        return (
          <Link
            style={{
              textDecoration: "none",
            }}
            to={`/Video/${item.id}`}
          >
            <VideoElement key={item.id} theme={{ regTheme, invTheme }}>
              <IMG src={`data:image/jpeg;base64,${item.data}`} alt={i} />
              <VideoTitle key={i} theme={{ regTheme, invTheme }}>
                {item.title}
              </VideoTitle>
              <VideoData>
                <Views>{item.views} Views</Views>
                <Likes>{item.likes} Likes</Likes>
              </VideoData>
            </VideoElement>
          </Link>
        );
      })}
    </VideosGrid>
  );
}
