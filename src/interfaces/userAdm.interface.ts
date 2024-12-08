export interface UserAdmCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserAdm{
    id: string;
    name: string;
    email: string;
}
export interface UserAdmDB{
    id: string;
    name: string;
    email: string;
    password: string;
}
export interface UserAdmLogin{
    email: string;
    password: string;
}

export interface UserAdmUpdate {
    name?: string;
    email: string;
    password?: string;
}
 export interface UserAdmRepository {
    create(user: UserAdmCreate): Promise<UserAdmDB>;
    findByEmail(email: string): Promise<UserAdmDB | null>;
    update(user: UserAdmUpdate): Promise<UserAdmDB>;
 }