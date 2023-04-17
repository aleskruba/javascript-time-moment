var myDate = new Date('2023-04-18T13:00:00')
    month = myDate.getMonth()
    date = myDate.getDate()
    day = myDate.getDay()

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


console.log(month+1) //start with 0
console.log(date)
console.log(day) // Monday is 1
console.log(months[month])  // April

///////////////////////////////////////
const now = new Date()

console.log(now.toLocaleDateString()) // 4/17/2023

console.log(now.toLocaleDateString('en-GB')) // 17/04/2023

console.log('hh ',now.toLocaleDateString('de-DE', {
    dateStyle:"long",
    calendar:"hebrew"
}
)) // 17/04/2023

console.log('timeZONE : ',now.toLocaleDateString('de-DE', {
    timeZone:"UTC",
}
)) // 17/04/2023

console.log('today :',now.toLocaleDateString('de-DE', {
    weekday:"short", //narrow, long
    year: "numeric" // 2-digit
    
}
)) // today : 2023 Mo

console.log('today full :',now.toLocaleDateString(undefined, {
    dateStyle:"full", //narrow, long
}
)) // Monday, April 17, 2023


/////////////////////////////////////////
const dayOfWeek = (date) => date.toLocaleDateString(undefined,{
    weekday:"long"
})
console.log(dayOfWeek(now)) //Monday

const fullDate = (date) => date.toLocaleDateString('ru-RU',{
    dateStyle:"full",
    calendat:"persian"
})  ///понедельник, 17 апреля 2023 г


//////////////////////////////////////////
const newYears = new Date("1/1/22")
//2022-01-01T00:00:00.000Z


