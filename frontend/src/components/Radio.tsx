import { useState, useRef, useEffect } from "react";
import { StyledRadio, StyledRadioMedia } from "../styles/Radio.styled";
import IconButton from "./IconButton";
import Slider from "./Slider";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

// Button click sound
const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Radio = () => {
  const { links } = useSelector((state: RootState) => state.links);

  const [index, setIndex] = useState(0);
  const [currentLink, setCurrentLink] = useState(links[index]);
  // Set default link to first link
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioVolume, setRadioVolume] = useState(50);

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

  // Side effect to changing index state
  useEffect(() => {
    setCurrentLink(links[index]);
  }, [links, index]);

  // Method to change radioVolume state
  const handleVolumeChange = (newValue: number) => {
    setRadioVolume(newValue);
  };

  return (
    <StyledRadio>
      <StyledRadioMedia>
        {isPlaying ? (
          <IconButton icon="pixelarticons:pause" onClick={toggleAudioPlay} />
        ) : (
          <IconButton icon="pixelarticons:play" onClick={toggleAudioPlay} />
        )}

        <IconButton icon="pixelarticons:next" onClick={nextTrack} />
        <Slider value={radioVolume} onChange={handleVolumeChange} />
      </StyledRadioMedia>
      <p>{currentLink.title}</p>
      <ReactPlayer
        url={currentLink.url}
        playing={isPlaying}
        volume={radioVolume * 0.01}
        width="0%"
        height="0%"
        style={{ display: "none" }}
      />
    </StyledRadio>
  );
};

export default Radio;
