import moment from 'moment';

class StdioDate {

    constructor() {
        this.day = 0;
        this.month = 0;
        this.year = 0;
    }

    isThisDate(date) {
        return this.day == date.day && this.month == date.month && this.year == date.year;
    }

    setDate(day, month, year) {
        this.day = parseInt(day);
        this.month = parseInt(month);
        this.year = parseInt(year);
    }

    toString() {
        this.day = this.day.toString();
        this.month = this.month.toString();
        this.year = this.year.toString();
    }

    setToday() {
        this.day = parseInt(moment().format('Do'));
        this.month = parseInt(moment().format('M'));
        this.year = parseInt(moment().format('YYYY'));
    }

    getMoment() {
        return moment(this.day+'/'+this.month+'/'+this.year,'Do/M/YYYY').clone();
    }

    getDayOfWeek() {
        return moment(this.day+'/'+this.month+'/'+this.year,'Do/M/YYYY').clone().format('e');
    }
}

export default (StdioDate = new StdioDate())