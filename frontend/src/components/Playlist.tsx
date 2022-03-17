import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Links from "./Links";
import AddLink from "./AddLink";
import { StyledTaskTracker } from "../styles/TaskTracker.styled";
import { ILink } from "../types";
import { getLinks, reset } from "../features/links/linkSlice";
import { RootState } from "../app/store";
import { createLink } from "../features/links/linkSlice";
import { deleteLink } from "../features/links/linkSlice";
import { toast } from "react-toastify";
import Radio from "./Radio";
import IconButton from "./IconButton";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Playlist = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistIsShowing, setPlaylistIsShowing] = useState(false);

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

  const toggleAudioPlay = () => {
    buttonSound.play();
    setIsPlaying(!isPlaying);
  };

  // Method to change index state (refers to array of mediaId's)
  const nextTrack = () => {
    if (index === links.length - 1) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
    setIsPlaying(true);
  };

  const addLink = (newLink: ILink) => {
    buttonSound.play();
    dispatch(createLink(newLink));
  };

  const removeLink = (link: ILink) => {
    buttonSound.play();
    // If there is only one link left, prevent user from removing link
    if (links.length === 1) {
      toast.error("Playlist must contain atleast one track");
      return;
    }
    // If index refers to the last element of the array
    if (index === links.length - 1) {
      // Move index back by one before removing link
      setIndex((index) => index - 1);
    }
    dispatch(deleteLink(link));
  };

  const handleOnClick = () => {
    setPlaylistIsShowing(!playlistIsShowing);
  };

  return (
    <div>
      <IconButton icon="pixelarticons:align-justify" onClick={handleOnClick} />
      <Radio
        toggleAudioPlay={toggleAudioPlay}
        nextTrack={nextTrack}
        index={index}
        isPlaying={isPlaying}
      />
      {playlistIsShowing ? (
        <StyledTaskTracker>
          <h1>playlist</h1>
          <AddLink onAdd={addLink} />
          <Links links={links} onDelete={removeLink} />
        </StyledTaskTracker>
      ) : null}
    </div>
  );
};

export default Playlist;
