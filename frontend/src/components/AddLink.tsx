import { useState, SyntheticEvent } from "react";
import { StyledAddTask } from "../styles/AddTask.styled";
import IconButton from "./IconButton";

interface Props {
  onAdd: Function;
}

const AddLink = ({ onAdd }: Props) => {
  const [url, setText] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!url) {
      alert("Please add a link");
      return;
    }
    onAdd({ url });
    setText("");
  };
  return (
    <StyledAddTask onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add link here"
        value={url}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>

      <IconButton type="submit" icon={"pixelarticons:plus"} />
    </StyledAddTask>
  );
};

export default AddLink;
