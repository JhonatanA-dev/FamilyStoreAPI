function formatError() {throw new Error("Formato de data inválido  ( hour : minute - day / month / year ) ")}

function formatDateTime(dateTime){
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

export function verifyDateTime(dateTime){

    const currentTime  = new Date().toLocaleTimeString()
    const currentDate  = new Date().toLocaleDateString()

    const dateLimit = formatDateTime(dateTime)
    const dataCurrent = formatDateTime(currentTime+"-"+currentDate)


    switch (true) {
        case dataCurrent.year > dateLimit.year: return false
        case dataCurrent.month > dateLimit.month: return false
        case dataCurrent.day > dateLimit.day: return false
        case dataCurrent.hour >= dateLimit.hour: return false
        case dataCurrent.minute > dateLimit.minute: return false
        default: return true
    }
}
console.log(verifyDateTime("04:36-06/12/2024"));
