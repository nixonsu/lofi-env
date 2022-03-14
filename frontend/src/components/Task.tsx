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
          <p className="strike-through">{task.text}</p>
          <IconButton onClick={() => onToggle(task.id)} icon={"mdi:check"} />
          <IconButton
            onClick={() => onDelete(task.id)}
            icon={"mdi:window-close"}
          />
        </>
      ) : (
        <>
          <p>{task.text}</p>
          <IconButton onClick={() => onToggle(task.id)} icon={"mdi:check"} />
          <IconButton
            onClick={() => onDelete(task.id)}
            icon={"mdi:window-close"}
          />
        </>
      )}

      {}
    </StyledTask>
  );
};

export default Task;
