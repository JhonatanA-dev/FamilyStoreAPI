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
    
    const currentTime  = new Date().toLocaleTimeString()
    const currentDate  = new Date().toLocaleDateString()

    const objTimeAndDate = formatTimeAndDate(currentTime,currentDate)
    const objTimeAndDateLimit = formatTimeAndDate(timeLimit,dateLimit)

    switch (true) {
        case objTimeAndDate.year > objTimeAndDateLimit.year: return false
        case objTimeAndDate.month > objTimeAndDateLimit.month: return false
        case objTimeAndDate.day > objTimeAndDateLimit.day: return false
        case objTimeAndDate.hour > objTimeAndDateLimit.hour: return false
        case objTimeAndDate.minute > objTimeAndDateLimit.minute: return false
        default: return true
    }
}
console.log(validateTime("03:40","03/12/2024"));
    