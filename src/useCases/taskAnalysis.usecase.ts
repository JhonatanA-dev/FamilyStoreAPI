import { TaskList, Task, TaskCreate, TaskRepository, TaskUpdate, TaskArrayList } from "../interfaces/task.interface";
import { Child, ChildCreate, ChildRepository, ChildUpdate } from "../interfaces/child.interface";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { ChildRepositoryDb } from "../repositories/child.repository";

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
}
export{ TaskAnalysisUseCase }