import { Child, ChildCreate, ChildRepository, ChildUpdate } from "../interfaces/child.interface";
import { TaskRepository } from "../interfaces/task.interface";
import { UserRepository } from "../interfaces/user.interface";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { UserRepositoryDb } from "../repositories/user.repository";

class ChildUseCase {
    private taskRepository: TaskRepository
    private childRepository: ChildRepository
    private userRepository: UserRepository
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
        this.userRepository = new UserRepositoryDb();
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
    async findByParents(userEmail: string): Promise<Child[]> {
        /// Verifica se o usuário existe
        const userExists = await this.userRepository.findByEmail(userEmail);
        if (!userExists) {
            throw new Error("User not found");
        }
       
        
        const userId = userExists.id;

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

        if (!id) {
            throw new Error("Id invalid");
        }
        
        // Verifica se o filho existe
        const childExists = await this.childRepository.findById(id);   
        if (!childExists) {
            throw new Error("Child not found");
        }
        
        
        // Buscar todas as tarefas do filho
        const tasks = await this.taskRepository.findByTaskList(childExists.id)

        // Deleta todas as tarefas do filho
        if (tasks[0]) {
            for (let i = 0; i < tasks.length; i++) {
                const element = tasks[i];
                await this.taskRepository.delete(element.id);
            }
        }
        
        
        
        await this.childRepository.delete(id);
    
    }
}
export{ ChildUseCase }