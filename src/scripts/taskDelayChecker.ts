
interface formatDateTimeType {hour:number; minute:number; day:number; month:number; year:number;}
function formatError() {throw new Error("Formato de data inválido  ( hour : minute - day / month / year ) ")}
function formatDateTime(dateTime:string):formatDateTimeType {
    //Removendo espaços
    const removingSpaces = dateTime.replace(/\s/g, "");
    //Separando tempo e a date
    const dateTimeArray  = removingSpaces.split("-")
    if( dateTimeArray.length !== 2) formatError()

    //Separando horas e minutos   
    let timeArray = dateTimeArray[0].split(":")
    if(timeArray.length === 3){timeArray = [timeArray[0],timeArray[1]] }
    if(timeArray.length !== 2) formatError()

    //Separando dia mes e ano
    const dateArray = dateTimeArray[1].split("/")
    if(dateArray.length !== 3) formatError()
    
    //verificando se a quantidade de caracteres é valida
    if(dateArray[2].length !== 4 || dateArray[1].length !== 2 || dateArray[0].length !== 2) formatError()
    if(timeArray[0].length !== 2 || timeArray[1].length !== 2) formatError()

    const year = parseInt(dateArray[2])
    const month = parseInt(dateArray[1])
    const day = parseInt(dateArray[0])
    const hour = parseInt(timeArray[0])
    const minute = parseInt(timeArray[1])

    const dateTimeString = {hour,minute,day,month,year}
   
    return dateTimeString
}
export function verifyDateTime(dateTime:string) {

    const currentTime  = new Date().toLocaleTimeString()
    const currentDate  = new Date().toLocaleDateString()

    const dateLimit = formatDateTime(dateTime)
    const dataCurrent = formatDateTime(currentTime+"-"+currentDate)

    switch (true) {

        // verificar se a data de agendameto e maior que a data atual
        case dataCurrent.year > dateLimit.year: throw new Error("A data da tarefa não pode ser menor que a data atual")
        case dataCurrent.month > dateLimit.month && dataCurrent.year == dateLimit.year : throw new Error("A data da tarefa não pode ser menor que a data atual")
        case dataCurrent.day > dateLimit.day && dataCurrent.month == dateLimit.month : throw new Error("A data da tarefa não pode ser menor que a data atual")
        case dataCurrent.hour >= dateLimit.hour: throw new Error("A tarefa não pode ser criada com menos de 1 hora para a coclusão")
        case dataCurrent.minute > dateLimit.minute: throw new Error("A tarefa não pode ser criada com menos de 1 hora para a coclusão")

        // verificar se dados são validos   ano < 2  mes < 12  hora < 24  minuto < 60
        case dataCurrent.year+2 < dateLimit.year: throw new Error("A data da tarefa não pode ser mais de 2 anos no futuro")
        case dateLimit.month > 12: throw new Error("Mes invalido")
        case dateLimit.hour > 23: throw new Error("Hora invalida")
        case dateLimit.minute > 59: throw new Error("Minuto invalido")

        // verificando se o dia é valido dependendo do mes
        case dateLimit.month ==  1 && dateLimit.day >= 32: throw new Error("Dia invalido")
        case dateLimit.month ==  2 && dateLimit.day >= 29: throw new Error("Dia invalido")
        case dateLimit.month ==  3 && dateLimit.day >= 32: throw new Error("Dia invalido")
        case dateLimit.month ==  4 && dateLimit.day >= 31: throw new Error("Dia invalido")
        case dateLimit.month ==  5 && dateLimit.day >= 32: throw new Error("Dia invalido")
        case dateLimit.month ==  6 && dateLimit.day >= 31: throw new Error("Dia invalido")
        case dateLimit.month ==  7 && dateLimit.day >= 32: throw new Error("Dia invalido")
        case dateLimit.month ==  8 && dateLimit.day >= 32: throw new Error("Dia invalido")
        case dateLimit.month ==  9 && dateLimit.day >= 31: throw new Error("Dia invalido")
        case dateLimit.month == 10 && dateLimit.day >= 32: throw new Error("Dia invalido")
        case dateLimit.month == 11 && dateLimit.day >= 31: throw new Error("Dia invalido")
        case dateLimit.month == 12 && dateLimit.day >= 32: throw new Error("Dia invalido")
    }
}
export function compareDateTime(dateTimeLimit:string):boolean {
    
    const currentTime  = new Date().toLocaleTimeString()
    const currentDate  = new Date().toLocaleDateString()
    
    const objTimeAndDate = formatDateTime(dateTimeLimit)
    const objTimeAndDateLimit = formatDateTime(currentTime+"-"+currentDate)

    switch (true) {
        case objTimeAndDate.year > objTimeAndDateLimit.year: return false
        case objTimeAndDate.month > objTimeAndDateLimit.month: return false
        case objTimeAndDate.day > objTimeAndDateLimit.day: return false
        case objTimeAndDate.hour > objTimeAndDateLimit.hour: return false
        case objTimeAndDate.minute > objTimeAndDateLimit.minute: return false
        default: return true
    }
}

    