import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import Header from "../components/Header";
import Timer from "../components/Timer";
import TaskTracker from "../components/TaskTracker";
import SoundPlayers from "../components/SoundPlayers";
import { StyledApp } from "../styles/App.styled";
import { ImageContainer } from "../styles/ImageContainer.styled";
import { getColors, updateColor, reset } from "../features/colors/colorSlice";
import { CirclePicker, ColorChangeHandler } from "react-color";
import Radio from "../components/Radio";
import { StyledDashboard } from "../styles/Dashboard.styled";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useSelector((state: RootState) => state.colors);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getColors());

    // Reset state on unmount
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleOnChange: ColorChangeHandler = (color, event) => {
    if (color.hex === "#181818") {
      dispatch(
        updateColor({
          ...colors,
          backgroundColor: color.hex,
          primaryTextColor: "white",
        })
      );
    } else {
      dispatch(
        updateColor({
          ...colors,
          backgroundColor: color.hex,
          primaryTextColor: "black",
        })
      );
    }
  };

  return (
    <StyledDashboard>
      <StyledApp>
        <div className="section first">
          <Timer />
          <TaskTracker />
        </div>
        <div className="section middle">
          <Header title="lofi-env" />
          <div className="slideshow">
            <ImageContainer>
              <img src="pixelart.png" alt="" className="art" />
            </ImageContainer>
          </div>
          <Radio />
        </div>

        <div className="section last">
          <CirclePicker
            color={colors.backgroundColor}
            colors={[
              "#ffffcc",
              "#ffccee",
              "#ffccbb",
              "#ffcccc",
              "white",
              "#181818",
            ]}
            onChange={handleOnChange}
          />
          <SoundPlayers />
        </div>
      </StyledApp>
    </StyledDashboard>
  );
};

export default Dashboard;
