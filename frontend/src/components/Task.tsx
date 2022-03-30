import IconButton from "./IconButton";
import { StyledTask } from "../styles/Task.styled";
import { ITask } from "../types";

interface Props {
  task: ITask;
  onDelete: Function;
  onToggle: Function;
}

const Task = ({ task, onDelete, onToggle }: Props) => {
  return (
    <StyledTask>
      {task.isDone ? (
        <>
          <h2 className="strike-through">{task.text}</h2>
          <IconButton
            onClick={() => onToggle(task)}
            icon={"tick"}
            height={30}
            width={30}
          />
          <IconButton
            onClick={() => onDelete(task)}
            icon={"cross"}
            height={30}
            width={30}
          />
        </>
      ) : (
        <>
          <h2>{task.text}</h2>
          <IconButton
            onClick={() => onToggle(task)}
            icon={"tick"}
            height={30}
            width={30}
          />
          <IconButton
            onClick={() => onDelete(task)}
            icon={"cross"}
            height={30}
            width={30}
          />
        </>
      )}

      {}
    </StyledTask>
  );
};

export default Task;
