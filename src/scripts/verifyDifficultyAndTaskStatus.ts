export function verifyDifficultyAndTaskStatus(difficulty?: number, taskStatus?: string) {

    const verifyDifficulty = [1,2,3].find(item => item === difficulty);
    if(!verifyDifficulty) throw new Error("Dificuldade não encontrada opsões: 1 --> Facio, 2 -->Normal, 3 --> Dificil");

    const verifyTaskStatusList = [ "toDo","inProgress","completed","notCompleted"];
    const verifyTaskStatus = verifyTaskStatusList.find(item => item === taskStatus);

    if(!verifyTaskStatus) throw new Error("Status não encontrado opsões: toDo, inProgress, completed, notCompleted");

}