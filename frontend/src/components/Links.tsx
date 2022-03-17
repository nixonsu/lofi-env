import Link from "./Link";
import { StyledTasks } from "../styles/Tasks.styled";
import { ILink } from "../types";

interface Props {
  links: ILink[];
  onDelete: Function;
}

const Links = ({ links, onDelete }: Props) => {
  return (
    <StyledTasks>
      {links.map((link) => (
        <Link key={link._id} link={link} onDelete={onDelete} />
      ))}
    </StyledTasks>
  );
};

export default Links;
