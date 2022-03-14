import { useState, SyntheticEvent } from "react";
import { StyledAddTask } from "../styles/AddTask.styled";
import IconButton from "./IconButton";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

interface Props {
  onAdd: Function;
}

const AddTask = ({ onAdd }: Props) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }
    onAdd({ id: Math.floor(Math.random() * 10000) + 1, text, isDone: false });
    dispatch(createTask({ text: text }));
    setText("");
  };
  return (
    <StyledAddTask onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add task here"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>

      <IconButton type="submit" icon={"pixelarticons:plus"} />
    </StyledAddTask>
  );
};

export default AddTask;
