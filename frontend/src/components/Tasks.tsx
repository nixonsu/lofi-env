import Task from "./Task";
import { StyledTasks } from "../styles/Tasks.styled";
import { ITask } from "../types";

interface Props {
  tasks: ITask[];
  onDelete: Function;
  onToggle: Function;
}

const Tasks = ({ tasks, onDelete, onToggle }: Props) => {
  return (
    <StyledTasks>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </StyledTasks>
  );
};

export default Tasks;
