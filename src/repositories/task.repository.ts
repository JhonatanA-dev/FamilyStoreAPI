
import { prisma } from "../dataBase/prisma.client";
import { TaskList, Task, TaskCreate, TaskRepository, TaskUpdate } from "../interfaces/task.interface";

export class TaskRepositoryDb implements TaskRepository {


    async create(task: TaskCreate): Promise<Task> {
        const taskCreated = await prisma.task.create({
            data: task,
        });
        
        return taskCreated;
    }
    async findById(id: string): Promise<Task | null> {
        const taskFindById = await prisma.task.findUnique({
            where: {
                id,
            },
        });
        
        return taskFindById || null;
    }
    async findByTaskList(childId:string): Promise<TaskList[]> {
        const list = await prisma.task.findMany({
            where: {
                childId,
            },   
        })
        console.log(list);
        
        return list;
    }

    async update(task: TaskUpdate): Promise<Task> {
        const taskUpdated = await prisma.task.update({
            where: {
                id:task.id,
            },
            data: task,
        });
        return taskUpdated;
    }

    async delete(id: string): Promise<boolean> {
        const taskDelete = await prisma.task.delete({
            where: {
                id,
            },
        });
        
        if (taskDelete) {
            return true;
        }else{
            return false;
        }
    }
}