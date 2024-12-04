interface formatTimeAndDate {
    hour:number
    minute:number
    day:number
    month:number
    year:number
}
function formatTimeAndDate(time:string,date:string):formatTimeAndDate {
    const timeArray = time.split(":")
    const dateArray = date.split("/")

    const year = parseInt(dateArray[2])
    const month = parseInt(dateArray[1])
    const day = parseInt(dateArray[0])
    const hour = parseInt(timeArray[0])
    const minute = parseInt(timeArray[1])

    return {hour,minute,day,month,year}
}

export function validateTime(timeLimit:string,dateLimit:string):boolean {
    
    const time  = new Date().toLocaleTimeString()
    const date  = new Date().toLocaleDateString()
  

    const objTimeAndDate = formatTimeAndDate(time,date)
    const objTimeAndDateLimit = formatTimeAndDate(timeLimit,dateLimit)



    switch (true) {
        case objTimeAndDate.year > objTimeAndDateLimit.year: return false
        break;
        case objTimeAndDate.month > objTimeAndDateLimit.month: return false
        break;
        case objTimeAndDate.day > objTimeAndDateLimit.day: return false
        break;
        case objTimeAndDate.hour > objTimeAndDateLimit.hour: return false
        break
        case objTimeAndDate.minute > objTimeAndDateLimit.minute: return false
        break
        default: return true
        break;
    }
}
console.log(validateTime("03:40","03/12/2024"));
    