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
    const title = await fetch(
      `https://www.youtube.com/oembed?url=${url}&format=json`
    )
      .then((response) => response.json())
      .then((data) => data.title);

    onAdd({ url, title });
    setText("");
  };
  return (
    <StyledAddTask onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Paste youtube link here"
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
