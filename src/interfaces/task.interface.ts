export interface TaskCreate {
    title: string;
    description: string;
    date: string;
    difficulty: number;
    taskStatus: string;
    childId: string;
}

export interface Task{
    id: string;
    title: string;
    description: string;
    date: string;
    difficulty: number;
    taskStatus: string;
    childId: string;
}

export interface TaskUpdate {
    id: string;
    title?: string;
    description?: string;
    date?: string;
    difficulty?: number;
    taskStatus?: string;
}

export interface TaskList {
    id: string;
    title: string;
    description: string;
    date: string;
    difficulty: number;
    taskStatus: string;
    createdAt: Date;
    updatedAt: Date;
    childId: string;
}
export interface TaskArrayList {
    numberToDO:number,
    toDo:TaskList[],
    numberInProgress:number,
    inProgress:TaskList[],
    numberCompleted:number,
    completed:TaskList[],
    numberNotCompleted:number,
    notCompleted:TaskList[]
}

 export interface TaskRepository {
    create(task: TaskCreate): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findByTaskList(childId:string): Promise<TaskList[]>;
    update(task: TaskUpdate): Promise<Task>;
    delete(id: string): Promise<boolean>;
 }