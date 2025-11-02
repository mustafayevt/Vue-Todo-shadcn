export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface Todo {
  id: string
  title: string
  description: string
  status: TodoStatus
  priority: TodoPriority
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  completedAt?: Date
}

export type TodoFormData = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>

export interface TodoFilter {
  status?: TodoStatus
  priority?: TodoPriority
  category?: string
  searchQuery?: string
  tags?: string[]
}

export interface TodoStats {
  total: number
  todo: number
  inProgress: number
  done: number
}
