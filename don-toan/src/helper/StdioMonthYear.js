export class StdioMonthYear {
    constructor() {
        this.month = 0;
        this.year = 0;
    }

    setMonthYear(month, year) {
        this.month = parseInt(month);
        this.year = parseInt(year);
    }

    // toString() {
    //     this.month = this.month.toString();
    //     this.year = this.year.toString();
    // }

    static toString(monthYear) {
        if (monthYear == null)
            return "";
        return 'THÁNG ' + monthYear.month + ' / ' + monthYear.year
    }
}