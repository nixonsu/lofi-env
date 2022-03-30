import { useState, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { StyledAddTask } from "../styles/AddTask.styled";
import IconButton from "./IconButton";

interface Props {
  onAdd: Function;
}

const AddLink = ({ onAdd }: Props) => {
  const [url, setText] = useState("");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!url) {
      toast.warn("Please add a link");
      return;
    }

    // Fetch title of youtube video

    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      const data = await response.json();
      const title = data.title;
      onAdd({ url, title });
      setText("");
    } catch (error) {
      toast.warn("Please add a valid youtube URL");
      return;
    }
  };
  return (
    <StyledAddTask onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="paste youtube link here"
        value={url}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>

      <IconButton type="submit" icon={"plus"} height={30} width={30} />
    </StyledAddTask>
  );
};

export default AddLink;
