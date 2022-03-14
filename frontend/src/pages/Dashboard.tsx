import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Header from "../components/Header";
import Timer from "../components/Timer";
import TaskTracker from "../components/TaskTracker";
import Radio from "../components/Radio";
import SoundPlayers from "../components/SoundPlayers";
import { StyledApp } from "../styles/App.styled";
import { ImageContainer } from "../styles/ImageContainer.styled";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
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
  );
};

export default Dashboard;
