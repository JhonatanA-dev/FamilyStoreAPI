import { prisma } from "../dataBase/prisma.client";
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/user.interface";

export class UserRepositoryDb implements UserRepository {


    async create(user: UserCreate): Promise<User> {
        const userCreated =await prisma.user.create({
            data: user,
        }); 
        
        return userCreated;
    }
    async findById(id: string): Promise<User | null> {
        const userFindById = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return userFindById || null;
    }
    async findByEmail(email: string): Promise<User | null> {
        const userFindByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return userFindByEmail || null;
    }
    async update(user: UserUpdate): Promise<User> {
        const userUpdated = await prisma.user.update({
            where: {
                id:user.id,
            },
            data: user,
        });
        return userUpdated;
    }

  
}