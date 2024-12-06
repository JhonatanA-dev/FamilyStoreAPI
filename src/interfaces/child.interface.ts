export interface ChildCreate {
    name: string;
    password: string;
    age: number;
    level: number;
    userId: string;
    xp: number;
}
export interface Child{
    id: string;
    name: string;
    password: string;
    age: number;
    level: number;
    xp: number;
}
export interface ChildCreateUseCase {
    name: string;
    password: string;
    age: number;
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
    createdAt: Date;
    updatedAt: Date;
    level: number;
}
 export interface ChildRepository {
    create(child: ChildCreate): Promise<Child>;
    findById(id: string): Promise<Child | null>;
    findByName(name: string): Promise<Child | null>;
    findByParents(userId: string): Promise<Child[] | null>;
    update(child: ChildUpdate): Promise<Child>;
    delete(id: string): Promise<void>;
 }