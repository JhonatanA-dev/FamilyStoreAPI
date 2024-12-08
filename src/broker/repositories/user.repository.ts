import { prisma } from "../dataBase/prisma.client";
import { User, UserCreate, UserDB, UserRepository, UserUpdate } from "../interfaces/user.interface";

export class UserRepositoryDb implements UserRepository {


    async create(user: UserCreate): Promise<UserDB> {
        const userCreated = await prisma.user.create({
            data: user,
        }); 
        return userCreated;
    }
    async findByEmail(email: string): Promise<UserDB | null> {
       
        const userFindByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return userFindByEmail || null;
    }
    async update(user: UserUpdate): Promise<UserDB> {
        const userUpdated = await prisma.user.update({
            where: {
                email:user.email,
            },
            data: user,
        });
        return userUpdated;
    }

  
}