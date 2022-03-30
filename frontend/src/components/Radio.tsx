import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Links from "./Links";
import AddLink from "./AddLink";
import { ILink } from "../types";
import { getLinks, reset } from "../features/links/linkSlice";
import { RootState } from "../app/store";
import { createLink } from "../features/links/linkSlice";
import { deleteLink } from "../features/links/linkSlice";
import { toast } from "react-toastify";
import IconButton from "./IconButton";
import { StyledRadio, StyledRadioMedia } from "../styles/Radio.styled";
import Slider from "./Slider";
import ReactPlayer from "react-player/youtube";
import { StyledPlaylist } from "../styles/Playlist.styled";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Radio = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistIsShowing, setPlaylistIsShowing] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const { links } = useSelector((state: RootState) => state.links);

  const [currentLink, setCurrentLink] = useState(links[index]);
  // Set default link to first link
  const [radioVolume, setRadioVolume] = useState(50);

  // Side effect to changing index state
  useEffect(() => {
    setCurrentLink(links[index]);
  }, [links, index]);

  // Method to change radioVolume state
  const handleVolumeChange = (newValue: number) => {
    setRadioVolume(newValue);
  };

  useEffect(() => {
    dispatch(getLinks());

    // Reset state on unmount
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

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
    buttonSound.play();
    setPlaylistIsShowing(!playlistIsShowing);
  };

  return (
    <div>
      <StyledRadio>
        <StyledRadioMedia>
          {isPlaying ? (
            <IconButton
              icon="pause"
              onClick={toggleAudioPlay}
              height={40}
              width={40}
            />
          ) : (
            <IconButton
              icon="play"
              onClick={toggleAudioPlay}
              height={40}
              width={40}
            />
          )}

          <IconButton icon="next" onClick={nextTrack} height={40} width={40} />
          <Slider value={radioVolume} onChange={handleVolumeChange} />
          <IconButton
            icon="playlist"
            onClick={handleOnClick}
            height={40}
            width={40}
          />
        </StyledRadioMedia>
        <h1>{currentLink.title}</h1>
        <ReactPlayer
          url={currentLink.url}
          playing={isPlaying}
          volume={radioVolume * 0.01}
          width="0%"
          height="0%"
          style={{ display: "none" }}
        />
      </StyledRadio>
      {playlistIsShowing ? (
        <StyledPlaylist>
          <h1>playlist ♪</h1>
          <AddLink onAdd={addLink} />
          <Links links={links} onDelete={removeLink} />
        </StyledPlaylist>
      ) : null}
    </div>
  );
};

export default Radio;
