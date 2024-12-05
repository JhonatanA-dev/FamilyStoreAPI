import { TaskList, Task, TaskCreate, TaskRepository, TaskUpdate, TaskArrayList } from "../interfaces/task.interface";
import { Child, ChildCreate, ChildRepository, ChildUpdate } from "../interfaces/child.interface";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { organizeTaskList } from "../scripts/organizeTaskList";
import { verifyDifficultyAndTaskStatus } from "../scripts/verifyDifficultyAndTaskStatus";

class TaskUseCase {
    private taskRepository: TaskRepository;
    private childRepository: ChildRepository;
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
    }


    async create(email:string,data: TaskCreate): Promise<Task> {
    
        if(!email) throw new Error("Usuario não autorizado");
        
        
        // Validação dos dados
        if (!data.title || !data.description || !data.date || !data.difficulty || !data.taskStatus || !data.childId) {
            throw new Error("Dados invalidos")};
        
        // Verifica se o filho existe
        const verifyChild = await this.childRepository.findById(data.childId);
        if(!verifyChild) throw new Error("Filho não encontrado");

        // Verifica se a dificuldade e o status da tarefa são válidos
        verifyDifficultyAndTaskStatus(data.difficulty,data.taskStatus);
        
        const taskCreated = await this.taskRepository.create(data);
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

    async update(email:string,task: TaskUpdate): Promise<Task> {
  
        if(!email) throw new Error("Usuario não autorizado");
        
        // Validação dos dados
        if(!task.id) throw new Error("Dados invalidos");
        
        // Verifica se a tarefa existe
        const verifyTask = await this.taskRepository.findById(task.id);
        if(!verifyTask) throw new Error("Task not found");

        // Verifica se a dificuldade e o status da tarefa são válidos
        if(task.difficulty || task.taskStatus) verifyDifficultyAndTaskStatus(task.difficulty,task.taskStatus);

        // Atualiza a tarefa
        const taskUpdated = await this.taskRepository.update(task);
        return taskUpdated;
    }
    
    async delete(id: string): Promise<{message: string}> {

        // Busca a lista de tarefas pelo id da tarefa
        const verifyTask = await this.taskRepository.findById(id);
        if(!verifyTask) throw new Error("Tarefa não encontrada");
        
        await this.taskRepository.delete(id);

        return  {message :'Tarefa deletada com sucesso'}
    }

    async findByIdTaskAnalysis(taskId: string): Promise<Task | {message: string} > {

        // Busca a lista de tarefas pelo id da tarefa
        const tasks = await this.taskRepository.findById(taskId);
        if (!tasks) throw new Error("Lista de tarefas não encontrada");
        
        if (tasks.taskStatus === "completed" || tasks.taskStatus === "notCompleted") return tasks || null;

        return { message: "Tarefa não concluida" };
    }

    async findByChildIdTaskAnalysis(childId: string): Promise<TaskList[]> {

        // Busca a lista de tarefas do filho
        const child = await this.taskRepository.findByTaskList(childId);
        if (!child) throw new Error("Lista de tarefas não encontrada");
        
        // Cria uma lista com as tarefas concluidas ou não concluidas
        const tasks  = child.filter((task) => task.taskStatus === "completed" || task.taskStatus === "notCompleted");
        if (!tasks[0]) throw new Error("Lista de tarefas não encontrada");
        
        return tasks 
    }
}
export{ TaskUseCase }