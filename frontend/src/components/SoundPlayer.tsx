import { useState } from "react";
import PropTypes from "prop-types";
import ReactHowler from "react-howler";
import Slider from "./Slider";
import IconButton from "./IconButton";
import { StyledSoundPlayer } from "../styles/SoundPlayer.styled";

interface Props {
  soundName: string;
  audioFileName: string;
}

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const SoundPlayer = ({ soundName, audioFileName }: Props) => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0);

  const toggleAudioPlay = () => {
    buttonSound.play();
    setPlaying(!playing);
  };

  const handleVolumeChange = (newValue: number) => {
    setVolume(newValue);
  };
  return (
    <StyledSoundPlayer>
      <IconButton
        onClick={toggleAudioPlay}
        icon={soundName}
        className={playing ? "full-opacity" : "half-opacity"}
        height={40}
        width={40}
      />
      <Slider
        value={volume}
        min={0}
        max={1}
        step={0.1}
        onChange={handleVolumeChange}
        isVertical={true}
      />
      <ReactHowler
        src={audioFileName}
        playing={playing}
        loop={true}
        volume={volume}
      />
    </StyledSoundPlayer>
  );
};

SoundPlayer.propTypes = {
  soundName: PropTypes.string,
  audioFileName: PropTypes.string,
};

export default SoundPlayer;
