import { useState } from "react";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { StyledTaskTracker } from "../styles/TaskTracker.styled";
import { ITask } from "../types";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const TaskTracker = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const toggleTask = (id: number) => {
    buttonSound.play();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    buttonSound.play();
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (newTask: ITask) => {
    if (tasks.length > 4) {
      alert("Cannot add anynore tasks, please remove one to continue.");
      return;
    }
    buttonSound.play();
    setTasks([...tasks, newTask]);
  };
  return (
    <StyledTaskTracker>
      <h1>to-do</h1>
      <AddTask onAdd={addTask} />
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </StyledTaskTracker>
  );
};

export default TaskTracker;
