import { Child, ChildCreate, ChildCreateUseCase, ChildLogin, ChildRepository, ChildUpdate } from "../interfaces/child.interface";
import { TaskRepository } from "../interfaces/task.interface";
import { UserRepository } from "../interfaces/user.interface";
import { signChild } from "../middlewares/isAuthenticated";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { UserRepositoryDb } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { validatePassword } from "../scripts/validateLogin";

class ChildUseCase {
    private taskRepository: TaskRepository;
    private childRepository: ChildRepository;
    private userRepository: UserRepository;
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
        this.userRepository = new UserRepositoryDb();
    }
    async create(child: ChildCreateUseCase,email:string): Promise<{ created: boolean }> {

        // Validação dos dados
        if (!child.name || !child.age|| !child.password ) throw new Error("Dados invalidos");
        
        if (!validatePassword(child.password)) throw new Error("Dados incorretos");

        // Verifica se o filho já existe
        const childExists = await this.childRepository.findByName(child.name);
        if (childExists) throw new Error("Nome de usuario já existe");
        
        const userData = await this.userRepository.findByEmail(email);
        if (!userData) throw new Error("Usuário não encontrado");
        
        const password = await bcrypt.hash(child.password, 10);

        const childUpdatedData = {name: child.name,  age: child.age,  password,  level : 1 ,  userId: userData.id};

        const childCreated = await this.childRepository.create(childUpdatedData);
        
        if (childCreated.name === child.name)return {created:true};
        return {created:false};
    }
    async login(child: ChildLogin): Promise<{token : string}> {

        // Validação dos dados
        if (!child.name || !child.password) throw new Error("Dados invalidos");
        
        // Verifica se o usuário existe
        const userData = await this.childRepository.findByName(child.name);
        if (!userData) throw new Error("Usuario não encontrado");
        
        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(child.password, userData.password);
        if (!passwordMatch) throw new Error("Dados incorretos");
        
        const token = signChild(userData.name);
        return {token} ;
    }
    async findByName(childName: string): Promise<Child> {

        /// Verifica se o usuário existe
        const childExists = await this.childRepository.findByName(childName);
        if (!childExists) throw new Error("Usuário não encontrado");

        return childExists;
    }
    async findByParents(userEmail: string): Promise<Child[]> {

        /// Verifica se o usuário existe
        const userExists = await this.userRepository.findByEmail(userEmail);
        if (!userExists) throw new Error("Usuário não encontrado");
        
        // Verifica se os filhos existe
        const childs = await this.childRepository.findByParents(userExists.id);
        if (!childs) throw new Error("Filhos não encontrado");

        return childs;
    }
    async update(child: {id: string, age?:number,password?:string}): Promise<{updated : boolean}> {
        // Validação dos dados
        if (!child.id) throw new Error("Id do filho não informado ");
        
        if (child.password){
            if (!validatePassword(child.password)) throw new Error("Dados incorretos");
            child.password = await bcrypt.hash(child.password, 10);
        }

        // Verifica se o filho existe
        const childExists = await this.childRepository.findById(child.id);
        if (!childExists) throw new Error("Child not found");
        
        const childUpdatedData = {id:childExists.id,  age:child.age,  password:child.password};

        // Atualiza o filho
        const childUpdated = await this.childRepository.update(childUpdatedData);
        if (!childUpdated) throw new Error("Filho não atualizado");
        
        return {updated:true};
    }
    async delete(id: string): Promise<void> {

        // Validação dos dados
        if (!id) throw new Error("Id invalid");
        
        
        // Verifica se o filho existe
        const childExists = await this.childRepository.findById(id);   
        if (!childExists) throw new Error("Child not found");
        
        // Buscar todas as tarefas do filho
        const tasks = await this.taskRepository.findByTaskList(childExists.id)
        if(!tasks) throw new Error("Tasks not found");

        // Deleta todas as tarefas do filho
        tasks.map(async (task) => await this.taskRepository.delete(task.id));
        
        await this.childRepository.delete(id);
    
    }
}
export{ ChildUseCase }