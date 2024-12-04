
// iterface de entrada
interface isLevelOpinterface {
    level: number
    xp: number
    taskDifficulty: number
}
// iterface de retorno
interface isLevelOpReturninterface {
    levelUP: boolean
    xp: number
}

 export function isLevelOp({level,xp,taskDifficulty}:isLevelOpinterface):isLevelOpReturninterface {
    // Dificuldade  dependendo do dificuldade da tarefa
    let add = 0
    switch (taskDifficulty) {
        case 1: add = 50
        break;
        case 2: add = 100
        break;
        case 3: add = 200
        break;
        default:add = 50
        break;
    }

    // XP necessario para o proximo level
    let nextLevel = level + 1  
    let xpn = nextLevel * 100    


    // Dificuldade  dependendo do level do usuario
    const percentage = add/4  //variavel de que retorna 25% do XP 

    let xpAdd  = 0

    if (level <= 30) {xpAdd = percentage*4}               // level  0 até  30  100%  do valor
    if (level <= 50 && level > 30) {xpAdd = percentage*3} // level 30 até  50   75%  do valor
    if (level <= 80 && level > 50) {xpAdd = percentage*2} // level 50 até  80   50%  do valor
    if (level <= 100 && level > 80) {xpAdd = percentage}  // level 80 até 100   25%  do valor


    // XP a ser adicionado ao banco de dados
    let xpRegister = xp + xpAdd    


    // Verifica se o usuario subiu de level
    if (xpRegister >= xpn) { return { 

            levelUP:true, 
            xp : Math.round(xpRegister) 

    }} else { return {

            levelUP:false,
            xp : Math.round(xpRegister)  

    }}
}

