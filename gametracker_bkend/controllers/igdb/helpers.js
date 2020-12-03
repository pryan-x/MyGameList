const getFilterDate = () => {
    const afterDate = new Date()
    const beforeDate = new Date()

    // sets date to x amt of days before today
    beforeDate.setDate(beforeDate.getDate() - 100)
    // sets date to x amt of days after today
    afterDate.setDate(afterDate.getDate() + 60)

    return {
        // converts to unix
        daysAfterToday: Math.floor(afterDate.getTime() / 1000),
        daysBeforeToday: Math.floor(beforeDate.getTime() / 1000)
    }
}

// gets datetime of 23:59 of the day before
const getTodaysDate = () => {
    const date = new Date()
    //sets date to yesterday
    date.setDate(date.getDate() - 1)
    // resets time to 11:59pm
    date.setUTCHours(23,59,59,999)
    // converts to unix
    return Math.floor(date.getTime() / 1000)
}

const getYearDates = () => {
    const year = new Date().getFullYear()

    const yearStart = new Date(Date.UTC(year, 0, 0, 23, 59, 59, 999))
    const lastYearStart = new Date(Date.UTC(year-1, 0, 0, 23, 59, 59, 999))

    // april 1st
    const springStart = new Date(Date.UTC(year, 3, 0, 23, 59, 59, 999))
    // july 1st
    const summerStart = new Date(Date.UTC(year, 6, 0, 23, 59, 59, 999))
    
    return {
        year: year,
        yearStartDate: Math.floor(yearStart / 1000),
        lastYearStartDate: Math.floor(lastYearStart / 1000),
        springStartDate: Math.floor(springStart / 1000),
        summerStartDate: Math.floor(summerStart / 1000),
    }
}



module.exports = {
    getFilterDate,
    getTodaysDate,
    getYearDates
}


// const queryForNewYear = () => {
//     const today = new Date()
//     const year = new Date().getFullYear()
    
//     // october 1st last year
//     const lastEndSummer = new Date(Date.UTC(year-1, 9, 0, 23, 59, 59, 999))
//     // beginning of current year (jan 1st)
//     const lastEndFall = new Date(Date.UTC(year, 0, 0, 23, 59, 59, 999))

//     // jan-mar
//     const endWinter = new Date(Date.UTC(year, 3, 0, 23, 59, 59, 999))
//     // april-june
//     const endSpring = new Date(Date.UTC(year, 6, 0, 23, 59, 59, 999))
    
//     // converts to unix before adding to object
//     if (today < endSpring) {
//         return {
//             lastYear: {
//                 start: Math.floor(endFall.getTime() / 1000),
//                 end: Math.floor(endWinter.getTime() / 1000),
//                 season: `${year-1}`
//             },
//             // query for previous year oct->today when there is not enough data in a new year (until june)
//             query: `
//             query games "Popular Recent Releases" {
//                 fields name,rating,rating_count,hypes,follows;
//                 where (first_release_date >= ${lastEndSummer} & first_release_date <= ${today}) & hypes > 2 & version_parent = null & rating != null & rating_count > 5;
//                 sort hypes desc;
//                 limit 20;
//             };
//             `
//         }
//     } else {
//         return {
//             // april-june
//             current: {
//                 yearStart: Math.floor(lastEndFall.getTime() / 1000),
//             },
//             // query for beginning of current year->today
//             query: `
//             query games "Popular Releases This Year" {
//                 fields name,rating,rating_count,hypes,follows;
//                 where (first_release_date >= ${lastEndFall} & first_release_date <= ${today}) & hypes > 2 & version_parent = null & rating != null & rating_count > 5;
//                 sort follows desc;
//                 limit 20;
//             };
//             `
//         }
//     }
// }


// THIS IS FOR GROUPING GAMES SEASONALLY IN THE FUTURE IF NEEDED
// // gets current season
// const getSeason = () => {
//     const today = new Date()

//     const year = new Date().getFullYear()

//     // last year oct-dec
//     const lastEndSummer = new Date(Date.UTC(year-1, 9, 0, 23, 59, 59, 999))
//     // beginning of new year
//     const lastEndFall = new Date(Date.UTC(year, 0, 0, 23, 59, 59, 999))
    
//     const endWinter = new Date(Date.UTC(year, 3, 0, 23, 59, 59, 999))
//     const endSpring = new Date(Date.UTC(year, 6, 0, 23, 59, 59, 999))
//     const endSummer = new Date(Date.UTC(year, 9, 0, 23, 59, 59, 999))
//     const endFall = new Date(Date.UTC(year+1, 0, 0, 23, 59, 59, 999))


//     // converts to unix before adding to object
//     if (today < endWinter) {
//         return {
//             // jan-march
//             current: {
//                 start: Math.floor(endFall.getTime() / 1000),
//                 end: Math.floor(endWinter.getTime() / 1000),
//                 season: `Winter ${year}`
//             },
//             last: {
//                 start: Math.floor(lastEndSummer.getTime() / 1000),
//                 end: Math.floor(lastEndFall.getTime() / 1000),
//                 season: `Fall ${year-1}` 
//             }
//         }
//     } else if (today < endSpring) {
//         return {
//             // april-june
//             current: {
//                 start: Math.floor(endWinter.getTime() / 1000),
//                 end: Math.floor(endSpring.getTime() / 1000),
//                 season: `Spring ${year}`
//             },
//             last: {
//                 start: Math.floor(endFall.getTime() / 1000),
//                 end: Math.floor(endWinter.getTime() / 1000),
//                 season: `Winter ${year}`
//             }
//         }
//     } else if (today < endSummer) {
//         return {
//             // july-sep
//             current: {
//                 start: Math.floor(endSpring.getTime() / 1000),
//                 end: Math.floor(endSummer.getTime() / 1000),
//                 season: `Summer ${year}`
//             },
//             last: {
//                 start: Math.floor(endWinter.getTime() / 1000),
//                 end: Math.floor(endSpring.getTime() / 1000)
//             },
//             season: `Spring ${year}`
//         }
//     } else {
//         return {
//             // oct-dec
//             current: {
//                 start: Math.floor(endSummer.getTime() / 1000),
//                 end: Math.floor(endFall.getTime() / 1000),
//                 season: `Fall ${year}`
//             },
//             last: {
//                 start: Math.floor(endSpring.getTime() / 1000),
//                 end: Math.floor(endSummer.getTime() / 1000),
//                 season: `Summer ${year}`
//             },
//         }
//     }
// }