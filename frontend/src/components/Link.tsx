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
        <h2>{link.title}</h2>
        <IconButton
          onClick={() => onDelete(link)}
          icon={"cross"}
          height={30}
          width={30}
        />
      </>
    </StyledTask>
  );
};

export default Link;
