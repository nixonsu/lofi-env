import { useEffect, useState } from "react";
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
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";

const Dashboard = () => {
  const [gifLoaded, setGifLoaded] = useState(false);
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
          secondaryTextColor: "gray",
        })
      );
    } else {
      dispatch(
        updateColor({
          ...colors,
          backgroundColor: color.hex,
          primaryTextColor: "black",
          secondaryTextColor: color.hex,
        })
      );
    }
  };

  return (
    <>
      <StyledDashboard style={{ display: gifLoaded ? "" : "none" }}>
        <Nav />
        <StyledApp>
          <div className="section first">
            <Timer />
            <TaskTracker />
          </div>
          <div className="section middle">
            <Header title="lofi-env" />
            <div className="slideshow">
              <ImageContainer
                onLoad={() => {
                  setGifLoaded(true);
                }}
              >
                {colors.backgroundColor === "#181818" ? (
                  <img src="house-dark.gif" alt="" className="art" />
                ) : (
                  <img src="house-light.gif" alt="" className="art" />
                )}
              </ImageContainer>
            </div>
            <Radio />
          </div>

          <div className="section last">
            <CirclePicker
              color={colors.backgroundColor}
              colors={[
                "#e0aea4",
                "#e9d887",
                "#a7b78b",
                "#89a99d",
                "#9db4c1",
                "#aba2b9",
                "#9c8f81",
                "white",
                "#181818",
              ]}
              onChange={handleOnChange}
            />
            <SoundPlayers />
          </div>
        </StyledApp>
      </StyledDashboard>
      {gifLoaded ? "" : <Spinner />}
    </>
  );
};

export default Dashboard;
