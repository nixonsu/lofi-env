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
          <IconButton onClick={() => onToggle(task)} icon={"mdi:check"} />
          <IconButton
            onClick={() => onDelete(task)}
            icon={"mdi:window-close"}
          />
        </>
      ) : (
        <>
          <h2>{task.text}</h2>
          <IconButton onClick={() => onToggle(task)} icon={"mdi:check"} />
          <IconButton
            onClick={() => onDelete(task)}
            icon={"mdi:window-close"}
          />
        </>
      )}

      {}
    </StyledTask>
  );
};

export default Task;
