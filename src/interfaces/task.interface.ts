export interface TaskCreate {
    title: string;
    description: string;
    date: string;
    difficulty: number;
    coins: number;
    childId: string;
}

export interface Task{
    id: string;
    title: string;
    description: string;
    date: string;
    difficulty: number;
    taskStatus: string;
    coins: number;
    childId: string;
}

export interface TaskUpdate {
    id: string;
    title?: string;
    description?: string;
    date?: string;
    level?: number;
    xp?: number;
    coins?: number;
    difficulty?: number;
    taskStatus?: string;
    childId?: string;
}

export interface TaskUserUpdate {
    id: string;
    title?: string;
    description?: string;
    date?: string;
    difficulty?: number;
    taskStatus?: string;
}
export interface TaskChildUpdate {
    id: string;
    taskStatus: string;
}

export interface TaskList {
    id: string;
    title: string;
    description: string;
    date: string;
    difficulty: number;
    taskStatus: string;
    coins: number;
    createdAt: Date;
    updatedAt: Date;
    childId: string;
}
export interface TaskArrayList {
    toDo:TaskList[],
    inProgress:TaskList[],
    completed:TaskList[],
    notCompleted:TaskList[]
}

 export interface TaskRepository {
    create(task: TaskCreate): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findByTaskList(childId:string): Promise<TaskList[]>;
    update(task: TaskUpdate): Promise<Task>;
    delete(id: string): Promise<boolean>;
 }