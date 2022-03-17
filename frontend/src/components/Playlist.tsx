import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Links from "./Links";
import AddLink from "./AddLink";
import { StyledTaskTracker } from "../styles/TaskTracker.styled";
import { ILink } from "../types";
import { getLinks, reset } from "../features/links/linkSlice";
import { RootState } from "../app/store";
import { createLink } from "../features/links/linkSlice";
import { deleteLink } from "../features/links/linkSlice";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Playlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    links,
    isLoading,
    isSuccess,
    isError,
    message,
  }: {
    links: ILink[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  } = useSelector((state: RootState) => state.links);

  useEffect(() => {
    if (!isError) {
      console.log(message);
    }

    dispatch(getLinks());

    // Reset state on unmount
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch]);

  const addLink = (newLink: ILink) => {
    buttonSound.play();
    dispatch(createLink(newLink));
  };

  const removeLink = (link: ILink) => {
    buttonSound.play();
    dispatch(deleteLink(link));
  };
  return (
    <StyledTaskTracker>
      <h1>playlist</h1>
      <AddLink onAdd={addLink} />
      <Links links={links} onDelete={removeLink} />
    </StyledTaskTracker>
  );
};

export default Playlist;
