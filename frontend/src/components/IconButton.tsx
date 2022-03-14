import { StyledIconButton } from "../styles/IconButton.styled";
import { Icon } from "@iconify/react";
import { MouseEventHandler } from "react";

interface Props {
  icon: string;
  className?: string;
  onClick?: MouseEventHandler;
  type?: string;
}

const IconButton = ({ icon, className, onClick }: Props) => {
  return (
    <StyledIconButton onClick={onClick}>
      <Icon icon={icon} className={className} width="35" height="35" />
    </StyledIconButton>
  );
};

export default IconButton;
