import { TaskState } from '../types/tasks';

type StateProps = {
  state: TaskState;
};
const State = ({ state }: StateProps) => {
  return <h1>{state}</h1>;
};

export default State;
