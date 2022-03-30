import { StyledSoundPlayers } from "../styles/SoundPlayers.styled";
import SoundPlayer from "./SoundPlayer";

const SoundPlayers = () => {
  return (
    <StyledSoundPlayers>
      <SoundPlayer
        soundName={"rain"}
        audioFileName={"rain.wav"}
      />
      <SoundPlayer soundName={"fire"} audioFileName={"fireplace.wav"} />
      <SoundPlayer soundName={"wind"} audioFileName={"storm.wav"} />
      <SoundPlayer soundName={"bird"} audioFileName={"bird.wav"} />
      <SoundPlayer
        soundName={"moon"}
        audioFileName={"night.wav"}
      />
      <SoundPlayer
        soundName={"coffee"}
        audioFileName={"restaurant.wav"}
      />
    </StyledSoundPlayers>
  );
};

export default SoundPlayers;
