class StdioLunarDate {
    constructor() {
        this.lunarDay = 0;
        this.lunarMonth = 0;
        this.lunarYear = 0;
        this.leapYear = 0;
    }

    setLunarDate(lunarDay, lunarMonth, lunarYear, leapYear) {
        this.lunarDay = parseInt(lunarDay);
        this.lunarMonth = parseInt(lunarMonth);
        this.lunarYear = parseInt(lunarYear);
        this.leapYear = leapYear;
    }
}

export default (StdioLunarDate = new StdioLunarDate())