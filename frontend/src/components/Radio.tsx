import { useState, useRef, useEffect } from "react";
import YouTube, { Options } from "react-youtube";
import { StyledRadio, StyledRadioMedia } from "../styles/Radio.styled";
import IconButton from "./IconButton";
import Slider from "./Slider";

const mediaIdArray = [
  "5qap5aO4i9A",
  "39fglJz3EyA",
  "kgx4WGK0oNU",
  "tfBVp0Zi2iE",
];

// Button click sound
const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Radio = () => {
  const [index, setIndex] = useState(0);
  const [mediaId, setMediaId] = useState(mediaIdArray[index]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [radioVolume, setRadioVolume] = useState(50);
  const [opts, setOpts] = useState<Options>({
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      loop: 1,
    },
  });

  const firstUpdate = useRef(true);

  // Method to initialise player state by being passed on as a callback function to the Youtube componenet
  const onReady = (event: any) => {
    console.log(
      `YouTube Player object for videoId: "${mediaId}" has been saved to state.`
    );
    setMediaTitle(event.target.getVideoData().title);
    setPlayer(event.target);
  };

  const toggleAudioPlay = () => {
    buttonSound.play();
    if (isPlaying) {
      player.pauseVideo();
    } else if (!isPlaying) {
      player.playVideo();
    }

    setIsPlaying(!isPlaying);
  };

  // Method to change index state (refers to array of mediaId's)
  const nextTrack = () => {
    if (index === mediaIdArray.length - 1) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
    setIsPlaying(true);
  };

  // Side effect to changing mediaId state
  useEffect(() => {
    if (firstUpdate.current) {
      // Change autoplay variable value after initial load
      setOpts({ ...opts, playerVars: { autoplay: 1, loop: 1 } });
    }
    setMediaId(mediaIdArray[index]);
  }, [index, opts]);

  // Method to change radioVolume state (passed on as a callback function)
  const handleVolumeChange = (newValue: number) => {
    setRadioVolume(newValue);
  };

  // Side effect to changing radioVolume state
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      player.setVolume(radioVolume);
    }
  }, [radioVolume, player]);

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
      <p>{mediaTitle}</p>
      <YouTube
        videoId={mediaId}
        opts={opts}
        onReady={onReady}
        className="hidden"
      />
    </StyledRadio>
  );
};

export default Radio;
