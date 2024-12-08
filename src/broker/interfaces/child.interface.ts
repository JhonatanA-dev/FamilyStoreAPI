export interface ChildCreated {
    name: string;
    password: string;
    age: number;
}
export interface ChildCreatedDB {
    name: string;
    password: string;
    age: number;
    level: number;
    xp: number;
    coins: number;
    userId: string;
    taskNotCompleted: number;
    taskCompleted: number
}
export interface ChildDb{
    id: string;
    name: string;
    password: string;
    age: number;
    level: number;
    xp: number;
    coins: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    taskNotCompleted: number;
    taskCompleted: number
}
export interface Child{
    id: string;
    name: string;
    level: number;
    coins: number;
    taskNotCompleted: number,
    taskCompleted: number
}
export interface ChildLogin{
    name: string;
    password: string;
}
export interface ChildUpdate {
    id: string;
    age?: number;
    password?: string;
}
export interface ChildList {
    name: string;
    age: number;
    level: number;
    xp: number;
    coins: number;
    taskNotCompleted: number;
    taskCompleted: number
    createdAt: Date;
    updatedAt: Date;
}
 export interface ChildRepository {
    create(child: ChildCreatedDB): Promise<ChildDb>;
    findById(id: string): Promise<ChildDb | null>;
    findByName(name: string): Promise<ChildDb | null>;
    findByParents(userId: string): Promise<ChildDb[] | null>;
    update(child: ChildUpdate): Promise<ChildDb>;
    delete(id: string): Promise<void>;
 }