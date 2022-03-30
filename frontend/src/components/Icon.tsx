import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {
  icon: string;
  height: number;
  width: number;
}

const Icon = ({ icon, height, width }: Props) => {
  const { colors } = useSelector((state: RootState) => state.colors);

  return (
    <>
      {colors.backgroundColor === "#181818" ? (
        <img
          className="yes"
          src={`${icon}-white.svg`}
          height={height}
          width={width}
          alt=""
        />
      ) : (
        <img
          className="yes"
          src={`${icon}.svg`}
          height={height}
          width={width}
          alt=""
        />
      )}
    </>
  );
};

export default Icon;
