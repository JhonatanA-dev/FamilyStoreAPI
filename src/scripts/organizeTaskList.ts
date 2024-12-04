import { TaskArrayList, TaskList } from "../interfaces/task.interface";



export function organizeTaskList(list: TaskList[]) {
    const toDo  = []
    const inProgress  = []
    const completed  = []
    const notCompleted  = []

    for (let index = 0; index < list.length; index++) {
        const element = list[index];

        switch (element.taskStatus) {
            case "toDo": toDo.push(element)
                
                break;
            case "inProgress": inProgress.push(element)
                
                break;
            case "completed": completed.push(element)
                
                break;
            case "notCompleted": notCompleted.push(element)
                
                break;    
        
            default:
                break;
        }
        
    }

    const taskList:TaskArrayList = {
        numberToDO: toDo.length,
        toDo,
        numberInProgress: inProgress.length,
        inProgress,
        numberCompleted: completed.length,
        completed,
        numberNotCompleted: notCompleted.length,
        notCompleted
    }
    return taskList
}
