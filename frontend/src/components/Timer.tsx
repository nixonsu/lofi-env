import IconButton from "./IconButton";
import { useState, useEffect } from "react";
import { StyledTimer } from "../styles/Timer.styled";
import { Flex } from "../styles/Flex.styled";

const defaultRemainingTime = {
  totalSeconds: 300,
  minutes: 5,
  seconds: 0,
};

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;
const doneSound = new Audio("done.mp3");

const Timer = () => {
  const [isReset, setIsReset] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [timerIsFinished, setTimerIsFinished] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // Calculates time diff between when timer will end and the current time
  const getRemainingTime = () => {
    const difference = endTime - Date.parse(new Date().toString());
    // Convert milliseconds -> seconds
    const totalSeconds = difference / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    setRemainingTime((remainingTime) => {
      return {
        totalSeconds: totalSeconds,
        minutes: minutes,
        seconds: seconds,
      };
    });
  };

  const startTimer = () => {
    // Sets a different end time whenever the timer is played
    buttonSound.play();
    setEndTime(
      Date.parse(new Date().toString()) + remainingTime.totalSeconds * 1000
    );
    setIsActive(!isActive);
    setIsReset(!isReset);
  };

  const incrementTime = () => {
    resetTimer();
    setRemainingTime({
      ...remainingTime,
      totalSeconds: remainingTime.totalSeconds + 300,
      minutes: remainingTime.minutes + 5,
    });
  };

  const stopTimer = () => {
    buttonSound.play();
    setIsActive(false);
  };

  const resetTimer = () => {
    buttonSound.play();
    setTimerIsFinished(false);
    stopTimer();
    setRemainingTime(defaultRemainingTime);
  };

  const finishTimer = () => {
    doneSound.play();
    stopTimer();
    setTimerIsFinished(true);
  };

  // useEffect hook will run on [isActive, remainingTime] state changes
  useEffect(() => {
    let intervalId: any = null;

    if (isActive) {
      intervalId = setInterval(() => {
        if (remainingTime.totalSeconds <= 1) {
          finishTimer();
        }
        getRemainingTime();
      }, 1000);
    } else if (!isActive) {
      clearInterval(intervalId);
    }
    // Clear interval when timer is not active
    return () => clearInterval(intervalId);
  }, [isActive, remainingTime]);

  return (
    <StyledTimer>
      <h1 className={timerIsFinished ? "red" : undefined}>
        {`${remainingTime.minutes}`.padStart(2, "0")}:
        {`${remainingTime.seconds}`.padStart(2, "0")}
      </h1>

      <Flex direction="row">
        <IconButton
          icon={"plus"}
          onClick={incrementTime}
          height={40}
          width={40}
        />
        {!isActive ? (
          <IconButton
            icon={"play"}
            onClick={timerIsFinished ? undefined : startTimer}
            height={40}
            width={40}
          />
        ) : (
          <IconButton
            icon={"pause"}
            onClick={stopTimer}
            height={40}
            width={40}
          />
        )}
        <IconButton
          icon={"restart"}
          onClick={resetTimer}
          height={40}
          width={40}
        />
      </Flex>
    </StyledTimer>
  );
};

export default Timer;
