export class StdioLunarDate {

    constructor() {
        this.lunarDay = 0;
        this.lunarMonth = 0;
        this.lunarYear = 0;
        this.lunarLeap = 0;
    }

    setLunarDate(lunarDay, lunarMonth, lunarYear, lunarLeap) {
        this.lunarDay = parseInt(lunarDay);
        this.lunarMonth = parseInt(lunarMonth);
        this.lunarYear = parseInt(lunarYear);
        this.lunarLeap = lunarLeap;
    }
}