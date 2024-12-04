import { Child, ChildCreate, ChildRepository, ChildUpdate } from "../interfaces/child.interface";
import { TaskRepository } from "../interfaces/task.interface";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { TaskRepositoryDb } from "../repositories/task.repository";

class ChildUseCase {
    private taskRepository: TaskRepository
    private childRepository: ChildRepository
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
    }
    async create(child: ChildCreate): Promise<Child> {
        // Verifica se o filho já existe
        const childExists = await this.childRepository.findByParents(child.userId);
        if (childExists) {
            for (let i = 0; i < childExists.length; i++) {
                const element = childExists[i];
                if (element.name === child.name) {
                    throw new Error("child already exists");
                }
                
            }
        }
        // Cria o filho
        const childCreated = await this.childRepository.create(child);
      
        return childCreated;
    }


    async findById(id: string): Promise<Child> {
        const child = await this.childRepository.findById(id);
        if (!child) {
            throw new Error("Child not found");
        }

        return child ;
    }
    async findByParents(userId: string): Promise<Child[]> {
        // Verifica se o filho's existe
        const childs = await this.childRepository.findByParents(userId);
        if (!childs) {
            throw new Error("child List not found");
        }
        // Retorna o filho's
        return childs;
    }
    async update(child: ChildUpdate): Promise<Child> {
        // Verifica se o filho existe
        const childExists = await this.childRepository.findById(child.id);
        if (!childExists) {
            throw new Error("Child not found");
        }
        // Atualiza o filho
        const childUpdated = await this.childRepository.update(child);
        return childUpdated;
    }
    async delete(id: string): Promise<void> {
        // Verifica se o filho existe
        const childExists = await this.childRepository.findById(id);   
        if (!childExists) {
            throw new Error("Child not found");
        }
        // Buscar todas as tarefas do filho
        const tasks = await this.taskRepository.findByTaskList(id)
        if (!childExists) {
            throw new Error("Child not found");
        }
        // Deleta todas as tarefas do filho
        for (let i = 0; i < tasks.length; i++) {
            const element = tasks[i];
            await this.taskRepository.delete(element.id);
        }
        await this.childRepository.delete(id);
    
    }
}
export{ ChildUseCase }