import { TaskList, Task, TaskRepository, TaskUpdate} from "../interfaces/task.interface";
import { ChildRepository} from "../interfaces/child.interface";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { isLevelOp } from "../scripts/isLevelOp";
import { verifyDate} from "../scripts/taskDelayChecker";
import { verifyDifficulty } from "../scripts/verifyDifficultyAndTaskStatus";

class TaskAnalysisUseCase {
    private taskRepository: TaskRepository;
    private childRepository: ChildRepository;
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
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
    async confirmedTaskAnalysis(taskId: string , email:string): Promise<Task | {levelUP: boolean} > {

        if(!email) throw new Error("Usuario não autorizado");

        // Busca a lista de tarefas pelo id da tarefa
        const verifyTask = await this.taskRepository.findById(taskId);
        if(!verifyTask) throw new Error("Tarefa não encontrada");

        // Buscar filho
        const child = await this.childRepository.findById(verifyTask.childId);
        if(!child) throw new Error("Tarefa não encontrada");
        //-----------------------------------------------------  
       
        const data  = isLevelOp({level: child.level, xp: child.xp,taskDifficulty: verifyTask.difficulty})

        // Verifica se o filho tem xp para subir de level
        // se não tiver xp para subir de level
        if(!data.levelUP) { 
            const childData = {id: verifyTask.childId,xp: data.xp,}
            const childUP = await this.childRepository.update(childData);
            if (!childUP) throw new Error("Filho não atualizado");
            return  {levelUP:data.levelUP}
        }
        
        // se o filho tem xp para subir de level
        const childData = {id: verifyTask.childId,level:child.level+1,xp: data.xp,}
        const childUP = await this.childRepository.update(childData);
        if (!childUP) throw new Error("Filho não atualizado");

        // Deletar tarefa concluida
        const del = await this.taskRepository.delete(verifyTask.id);
        if (!del) throw new Error("não foi possivel deletar a tarefa");
        return  {levelUP:data.levelUP}
        
    }

    async redoTaskAnalysis(data: TaskUpdate , email:string): Promise<Task | {message: string} > {
        if(!email) throw new Error("Usuario não autorizado");

        // Busca a lista de tarefas pelo id da tarefa
        const tasks = await this.taskRepository.findById(data.id);
        if (!tasks) throw new Error("Lista de tarefas não encontrada");
        
        if (tasks.taskStatus === "completed" || tasks.taskStatus === "notCompleted") {

            if (data.date) {verifyDate(data.date)}
            if (data.difficulty) { verifyDifficulty(data.difficulty)}

            const task = await this.taskRepository.update({id:data.id,taskStatus: "toDo",date:data.date,difficulty:data.difficulty});
            if (!task) throw new Error("Tarefa não atualizada");
            return { message: "Tarefa auterada" };
        }
        return { message: "ferifique se a tarefa foi concluida" };
    }

}
export{ TaskAnalysisUseCase }