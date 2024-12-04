import { TaskList, Task, TaskCreate, TaskRepository, TaskUpdate, TaskArrayList } from "../interfaces/task.interface";
import { Child, ChildCreate, ChildRepository, ChildUpdate } from "../interfaces/child.interface";
import { TaskRepositoryDb } from "../repositories/task.repository";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { organizeTaskList } from "../scripts/organizeTaskList";

class TaskUseCase {
    private taskRepository: TaskRepository
    private childRepository: ChildRepository
    constructor() {
        this.taskRepository = new TaskRepositoryDb();
        this.childRepository = new ChildRepositoryDb();
    }
    async create(data: TaskCreate): Promise<Task> {

        const task = {
            title: data.title,
            description: data.description,
            date:data.date,
            difficulty: data.difficulty,
            taskStatus: data.taskStatus,
            childId: data.childId,
        }

        // Verifica se o filho existe
        const verifyChild = await this.childRepository.findById(data.childId)
        if(!verifyChild){
            throw new Error("Child not found")
        }

        // Verifica se a dificuldade é valida
        const verifyDifficultyList = [1,2,3]
        const verifyDifficulty = verifyDifficultyList.find(item => item === task.difficulty)
        if(!verifyDifficulty){
            throw new Error("Difficulty not found options: 1 --> Facio, 2 -->Normal, 3 --> Dificil")
        }

        // Verifica se o status é valido
        const verifyTaskStatusList = [ "toDo","inProgress","completed","notCompleted"]
        const verifyTaskStatus = verifyTaskStatusList.find(item => item === task.taskStatus)
        if(!verifyTaskStatus){
            throw new Error("TaskStatus not found options: toDO, inProgress, completed, notCompleted")
        }

        // Cria a tarefa
        const taskCreated = await this.taskRepository.create(task);
        
        return taskCreated;
    }
    async findById(id: string): Promise<Task | null> {

        // Verifica se a tarefa existe
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error("Task not found");
        }

        return task || null;
    }
    
    async findByTaskList(childId: string): Promise<TaskArrayList> {

        // Verifica se a lista de tarefas existe
        const tasks = await this.taskRepository.findByTaskList(childId);
        if (!tasks) {
            throw new Error("Task List not found");
        }

        // Organiza a lista
        const list = organizeTaskList(tasks)

        return list;
    }

    async update(task: TaskUpdate): Promise<Task> {
        // Verifica se a tarefa existe
        const verifyTask = await this.taskRepository.findById(task.id);
        if(!verifyTask){
            throw new Error("Task not found")
        }
        // Atualiza a tarefa
        const taskUpdated = await this.taskRepository.update(task);
        return taskUpdated;
    }

    async delete(id: string): Promise<{message: string}> {
        // Verifica se a tarefa existe
        const verifyTask = await this.taskRepository.findById(id);
        if(!verifyTask){
            throw new Error("Task not found")
        }
        // Deleta a tarefa
        await this.taskRepository.delete(id);

        return  {message :'Task deleted successfully'}
    }
    async findByIdTaskAnalysis(taskId: string): Promise<Task | {message: string} > {

        // Verifica se a lista de tarefas existe
        const tasks = await this.taskRepository.findById(taskId);
        if (!tasks) {
            throw new Error("Task List not found");
        }
        if (tasks.taskStatus === "completed" || tasks.taskStatus === "notCompleted") {
            return tasks || null
        }
         return { message: "Task not completed" }
    }
}
export{ TaskUseCase }