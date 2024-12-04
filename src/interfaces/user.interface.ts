export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
}

export interface UserUpdate {
    id: string;
    name: string;
    email: string;
    password: string;
}
 export interface UserRepository {
    create(user: UserCreate): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: UserUpdate): Promise<User>;
 }