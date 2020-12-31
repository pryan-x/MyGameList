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

    // resets time to 00:00:59
    date.setUTCHours(00,00,59,999)
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
