import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { StyledTaskTracker } from "../styles/TaskTracker.styled";
import { ITask } from "../types";
import { getTasks, reset, updateTask } from "../features/tasks/taskSlice";
import { RootState } from "../app/store";
import { createTask } from "../features/tasks/taskSlice";
import { deleteTask } from "../features/tasks/taskSlice";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const TaskTracker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useSelector((state: RootState) => state.colors);

  const {
    tasks,
    isLoading,
    isSuccess,
    isError,
    message,
  }: {
    tasks: ITask[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (!isError) {
      console.log(message);
    }
    dispatch(getTasks());

    // Reset state on unmount
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  const toggleTask = (task: ITask) => {
    buttonSound.play();
    dispatch(updateTask({ ...task, isDone: !task.isDone }));
  };

  const removeTask = (task: ITask) => {
    buttonSound.play();
    dispatch(deleteTask(task));
  };

  const addTask = (newTask: ITask) => {
    buttonSound.play();
    dispatch(createTask(newTask));
    console.log(colors);
  };
  return (
    <StyledTaskTracker>
      <h1>to-do</h1>
      <AddTask onAdd={addTask} />
      <Tasks tasks={tasks} onDelete={removeTask} onToggle={toggleTask} />
    </StyledTaskTracker>
  );
};

export default TaskTracker;
