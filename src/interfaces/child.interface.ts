export interface ChildCreate {
    name: string;
    age: number;
    level: number;
    userId: string;
}
export interface Child{
    id: string;
    name: string;
    age: number;
    level: number;
}

export interface ChildUpdate {
    id: string;
    name?: string;
    age?: number;
    level?: number;
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
    findByParents(userId: string): Promise<Child[] | null>;
    update(child: ChildUpdate): Promise<Child>;
    delete(id: string): Promise<void>;
 }