import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import Header from "../components/Header";
import Timer from "../components/Timer";
import TaskTracker from "../components/TaskTracker";
import Radio from "../components/Radio";
import SoundPlayers from "../components/SoundPlayers";
import { StyledApp } from "../styles/App.styled";
import { ImageContainer } from "../styles/ImageContainer.styled";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { getColors } from "../features/colors/colorSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useSelector((state: RootState) => state.colors);

  // Global theme name space for dashboard styles
  let theme: DefaultTheme = {
    colors: colors,
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getColors());
  }, [user, navigate, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {console.log(colors.backgroundColor)}
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
          <SoundPlayers />
        </div>
      </StyledApp>
    </ThemeProvider>
  );
};

export default Dashboard;
