import { useState, SyntheticEvent } from "react";
import { StyledAddTask } from "../styles/AddTask.styled";
import IconButton from "./IconButton";
import { toast } from "react-toastify";

interface Props {
  onAdd: Function;
}

const AddTask = ({ onAdd }: Props) => {
  const [text, setText] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      toast.warn("Please add a task");
      return;
    }
    onAdd({ text, isDone: false });
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
