export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Subtask = {
  id: number;
  title: string;
  completed: boolean;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  deadline: string | null;
  subtasks: Subtask[];
};

export const taskStates = ['completed', 'overdue', 'pending'] as const;
export type TaskState = (typeof taskStates)[number];
