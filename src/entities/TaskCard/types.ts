export enum TaskStatus {
  START = 'start',
  CLAIM = 'claim',
  DONE = 'done',
}

export interface Task {
  id: number
  title: string
  avatar: string
  status: TaskStatus
  timer?: string
  checkButton: boolean
  link?: string
  disabledCheck?: boolean
}

export interface TaskCardProps {
  task: Task
}
