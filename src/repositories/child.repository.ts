import { prisma } from "../dataBase/prisma.client";
import { Child, ChildCreate, ChildRepository, ChildUpdate } from "../interfaces/child.interface";

export class ChildRepositoryDb implements ChildRepository {


    async create(child: ChildCreate): Promise<Child> {
        const childCreated = await prisma.children.create({
            data: child,
        });
        return childCreated;
    }
    async findById(id: string): Promise<Child | null> {
        console.log(id);
        
        const childFindByid = await prisma.children.findUnique({
            where: {
                id,
            },
        });
        return childFindByid || null;
    } 

    async findByParents(userId: string): Promise<Child[] | null> {
        const childFindById = await prisma.children.findMany({
            where: {
                userId,
            },
        });
        return childFindById || null;
    }
 
    async update(child: ChildUpdate): Promise<Child> {
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