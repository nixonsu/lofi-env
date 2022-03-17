import IconButton from "./IconButton";
import { StyledTask } from "../styles/Task.styled";
import { ILink } from "../types";

interface Props {
  link: ILink;
  onDelete: Function;
}

const Link = ({ link, onDelete }: Props) => {
  return (
    <StyledTask>
      <>
        <p>{link.title}</p>
        <IconButton onClick={() => onDelete(link)} icon={"mdi:window-close"} />
      </>
    </StyledTask>
  );
};

export default Link;
