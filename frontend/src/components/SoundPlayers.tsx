import { StyledSoundPlayers } from "../styles/SoundPlayers.styled";
import SoundPlayer from "./SoundPlayer";

const SoundPlayers = () => {
  return (
    <StyledSoundPlayers>
      <SoundPlayer soundName={"rain"} audioFileName={"rain.mp3"} />
      <SoundPlayer soundName={"fire"} audioFileName={"fireplace.mp3"} />
      <SoundPlayer soundName={"wind"} audioFileName={"storm.mp3"} />
      <SoundPlayer soundName={"bird"} audioFileName={"bird.mp3"} />
      <SoundPlayer soundName={"moon"} audioFileName={"night.mp3"} />
      <SoundPlayer soundName={"coffee"} audioFileName={"restaurant.mp3"} />
    </StyledSoundPlayers>
  );
};

export default SoundPlayers;
