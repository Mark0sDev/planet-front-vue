export enum TaskStatus {
  START = 'start',
  CLAIM = 'claim',
  DONE = 'done',
}

export interface Task {
  id: number
  title: string
  avatar: string
  reward: string
  status: TaskStatus
  timer?: string
}

export interface TaskCardProps {
  task: Task
}
