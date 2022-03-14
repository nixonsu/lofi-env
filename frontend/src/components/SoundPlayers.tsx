import { StyledSoundPlayers } from "../styles/SoundPlayers.styled";
import SoundPlayer from "./SoundPlayer";

const SoundPlayers = () => {
  return (
    <StyledSoundPlayers>
      <SoundPlayer
        soundName={"bi:cloud-rain-fill"}
        audioFileName={"rain.wav"}
      />
      <SoundPlayer soundName={"el:fire"} audioFileName={"fireplace.wav"} />
      <SoundPlayer soundName={"bx:bx-wind"} audioFileName={"storm.wav"} />
      <SoundPlayer soundName={"fa-solid:dove"} audioFileName={"bird.wav"} />
      <SoundPlayer
        soundName={"clarity:moon-solid"}
        audioFileName={"night.wav"}
      />
      <SoundPlayer
        soundName={"bx:bx-restaurant"}
        audioFileName={"restaurant.wav"}
      />
    </StyledSoundPlayers>
  );
};

export default SoundPlayers;
