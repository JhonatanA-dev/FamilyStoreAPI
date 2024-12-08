import { Task, TaskCreate, TaskRepository, TaskUpdate, TaskArrayList, TaskUserUpdate, TaskChildUpdate } from "../interfaces/task.interface";
import { ChildRepository} from "../interfaces/child.interface";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { organizeTaskList } from "../scripts/organizeTaskList";
import { verifyDifficulty,verifyTaskStatus } from "../scripts/verifyDifficultyAndTaskStatus";
import { verifyDate } from "../scripts/taskDelayChecker";

class TaskUseCase {
    private taskRepository: TaskRepository;
    private childRepository: ChildRepository;
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
    }
    async create(email:string,data: TaskCreate): Promise<Task> {
        const  {title,description,date,difficulty,coins,childId} = data;
        if(!email) throw new Error("Usuario não autorizado ");

        // Validação dos dados
        if (!title || !description || !date || !difficulty || !coins || !childId) {
            throw new Error("Dados invalidos ")};
        
        // Verifica se o filho existe
        const verifyChild = await this.childRepository.findById(childId);
        if(!verifyChild) throw new Error("Filho não encontrado");

        // Verifica se a data é válida
        verifyDate(date)

        // Verifica se a dificuldade  da tarefa são válidos
        verifyDifficulty(difficulty);

        const dataCreate = {title,description,date,difficulty,taskStatus: "toDo",coins,childId}
      
        const taskCreated = await this.taskRepository.create(dataCreate);
        if (!taskCreated) throw new Error("Erro ao criar tarefa");
        
        return taskCreated;
    }

    async findByTaskList(childId: string): Promise<TaskArrayList >{
        if (!childId) throw new Error("Id do filho não informado");
     
        // Verifica se o filho existe
        const childExists = await this.childRepository.findById(childId);
        if (!childExists) throw new Error("Child not found");
        
        // Verifica se a lista de tarefas existe
        const tasks = await this.taskRepository.findByTaskList(childId);
        if (!tasks)  throw new Error("Lista de tarefas não encontrada");


        // Organiza a lista   aquivo do script/organizeTaskList.ts 
        const list = organizeTaskList(tasks);
    
        return list;
    }

    async taskUserUpdate(email:string,task: TaskUserUpdate): Promise<Task> {
  
        if(!email) throw new Error("Usuario não autorizado");
        
        // Validação dos dados
        if(!task.id) throw new Error("Dados invalidos");
        if(!task.title && !task.description && !task.difficulty){
            throw new Error("augumas informações não foram preenchidas");}

        const {id,title,description,difficulty} = task;

        if(difficulty) {verifyDifficulty(difficulty)};
        // Verifica se a tarefa existe
        const verifyTask = await this.taskRepository.findById(id);
        if(!verifyTask) throw new Error("Task not found");

        // Atualiza a tarefa
        const taskUpdated = await this.taskRepository.update(task);
        return taskUpdated;
    }
    async taskChildUpdate(name:string,task: TaskChildUpdate): Promise<Task> {
  
        if(!name) throw new Error("Usuario não autorizado");
        
        // Validação dos dados
        if(!task.id) throw new Error("Dados invalidos");

        const verifyTaskStatus = ["inProgress","completed"].find(item => item === task.taskStatus);
        if(!verifyTaskStatus) throw new Error("Status não encontrado opsões: inProgress, completed");
        
        // Verifica se a tarefa existe
        const verifyTask = await this.taskRepository.findById(task.id);
        if(!verifyTask) throw new Error("Task not found");
        if(verifyTask.taskStatus === "completed") throw new Error("Tarefa concluida");

        // Atualiza a tarefa
        const taskUpdated = await this.taskRepository.update(task);
        return taskUpdated;
    }
    async delete(id: string,email:string): Promise<{message: string}> {

        if(!email) throw new Error("Usuario não autorizado");

        // Busca a lista de tarefas pelo id da tarefa
        const verifyTask = await this.taskRepository.findById(id);
        if(!verifyTask) throw new Error("Tarefa não encontrada");
        
        await this.taskRepository.delete(id);

        return  {message :'Tarefa deletada com sucesso'}
    }
}
export{ TaskUseCase }