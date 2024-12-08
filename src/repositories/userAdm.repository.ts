import { prisma } from "../dataBase/prisma.client";
import { UserAdm, UserAdmCreate, UserAdmDB, UserAdmRepository, UserAdmUpdate } from "../interfaces/userAdm.interface";

export class UserAdmRepositoryDb implements UserAdmRepository {


    async create(user: UserAdmCreate): Promise<UserAdmDB> {
        const userCreated = await prisma.userAdm.create({
            data: user,
        }); 
        return userCreated;
    }
    async findByEmail(email: string): Promise<UserAdmDB | null> {
       
        const userFindByEmail = await prisma.userAdm.findUnique({
            where: {
                email,
            },
        });
        return userFindByEmail || null;
    }
    async update(user: UserAdmUpdate): Promise<UserAdmDB> {
        const userUpdated = await prisma.userAdm.update({
            where: {
                email:user.email,
            },
            data: user,
        });
        return userUpdated;
    }

  
}