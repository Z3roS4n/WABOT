const date = new Date();

module.exports = {
    vars: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay()],

    year: date.getFullYear(),
    month: date.getMonth(),
    dayMonth: date.getDate(),
    day: date.getDay(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ms: date.getMilliseconds(),

    weekDay: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    dayOfTheWeek: () => {
        return this.weekDay[this.day];
    }
}