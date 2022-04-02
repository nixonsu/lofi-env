import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  BirdIcon,
  BurdIcon,
  CoffeeIcon,
  CrossIcon,
  FireIcon,
  LogOutIcon,
  MoonIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PlaylistIcon,
  PlusIcon,
  RainIcon,
  RestartIcon,
  TickIcon,
  WindIcon,
} from "../icons";

interface Props {
  name: string;
  height: number;
  width: number;
}

const Icon = ({ name, height, width }: Props) => {
  const { colors } = useSelector((state: RootState) => state.colors);
  let fill;
  if (colors.backgroundColor === "#181818") {
    fill = "white";
  } else {
    fill = "black";
  }

  return (
    <>
      {name === "bird" && (
        <BirdIcon height={height} width={width} fill={fill} />
      )}
      {name === "burd" && (
        <BurdIcon height={height} width={width} fill={fill} />
      )}
      {name === "coffee" && (
        <CoffeeIcon height={height} width={width} fill={fill} />
      )}
      {name === "cross" && (
        <CrossIcon height={height} width={width} fill={fill} />
      )}
      {name === "fire" && (
        <FireIcon height={height} width={width} fill={fill} />
      )}
      {name === "logout" && (
        <LogOutIcon height={height} width={width} fill={fill} />
      )}
      {name === "moon" && (
        <MoonIcon height={height} width={width} fill={fill} />
      )}
      {name === "next" && (
        <NextIcon height={height} width={width} fill={fill} />
      )}
      {name === "pause" && (
        <PauseIcon height={height} width={width} fill={fill} />
      )}
      {name === "play" && (
        <PlayIcon height={height} width={width} fill={fill} />
      )}
      {name === "playlist" && (
        <PlaylistIcon height={height} width={width} fill={fill} />
      )}
      {name === "plus" && (
        <PlusIcon height={height} width={width} fill={fill} />
      )}
      {name === "rain" && (
        <RainIcon height={height} width={width} fill={fill} />
      )}
      {name === "restart" && (
        <RestartIcon height={height} width={width} fill={fill} />
      )}
      {name === "tick" && (
        <TickIcon height={height} width={width} fill={fill} />
      )}
      {name === "wind" && (
        <WindIcon height={height} width={width} fill={fill} />
      )}
    </>
  );
};

export default Icon;
