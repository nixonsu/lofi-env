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
  className?: string;
}

const Icon = ({ name, height, width, className }: Props) => {
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
        <BirdIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "burd" && (
        <BurdIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "coffee" && (
        <CoffeeIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "cross" && (
        <CrossIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "fire" && (
        <FireIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "logout" && (
        <LogOutIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "moon" && (
        <MoonIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "next" && (
        <NextIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "pause" && (
        <PauseIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "play" && (
        <PlayIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "playlist" && (
        <PlaylistIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "plus" && (
        <PlusIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "rain" && (
        <RainIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "restart" && (
        <RestartIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "tick" && (
        <TickIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
      {name === "wind" && (
        <WindIcon
          className={className}
          height={height}
          width={width}
          fill={fill}
        />
      )}
    </>
  );
};

export default Icon;
