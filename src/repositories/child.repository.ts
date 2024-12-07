import { prisma } from "../dataBase/prisma.client";
import { Child, ChildCreated, ChildCreatedDB, ChildDb, ChildRepository, ChildUpdate } from "../interfaces/child.interface";


export class ChildRepositoryDb implements ChildRepository {

    async create(child: ChildCreatedDB): Promise<ChildDb> {
        const childCreated = await prisma.children.create({
            data: child,
        });
        return childCreated;
    }
    async findById(id: string): Promise<ChildDb | null> {
        const childFindById = await prisma.children.findUnique({
            where: {
                id,
            },
        });      
        return childFindById || null;
    } 
    async findByName(name: string): Promise<ChildDb | null> {
     
        const childFindByName = await prisma.children.findUnique({
            where: {
                name,
            },
        });
        return childFindByName || null;
    } 
    async findByParents(userId: string): Promise<ChildDb[] | null> {
        const childFindById = await prisma.children.findMany({
            where: {
                userId,
            },
        });
        return childFindById || null;
    }
  
    async update(child: ChildUpdate): Promise<ChildDb> {
        const ChildUpdated = await prisma.children.update({
            where: {
                id:child.id,
            },
            data: child,
        });
        return ChildUpdated;
    }
    async delete(id: string): Promise<void> {
        await prisma.children.delete({
            where: {
                id,
            },
        });
    }
}