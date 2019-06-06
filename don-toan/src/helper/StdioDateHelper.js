import moment from 'moment';
import {StdioMonthYear} from './StdioMonthYear'
import {StdioLunarDate} from './StdioLunarDate'
import { StdioDate } from './StdioDate';

export class StdioDateHelper {

    static initMoment() {
        require('moment/locale/vi');
        moment.locale();
    }

    static getCurrentMoment() {
        return moment().clone();
    }

    static getNextMonthMoment() {
        let today = new StdioDate;
        return today.getCurrentMoment().clone().add('1', 'M')
    }

    static getCurrentDate() {
        let today = new StdioDate;
        today.setToday();
        return today;
    }

    static getCurrentMonth() {
        return getCurrentDate().month;
    }

    static getDayOfWeekFromDate(date) {
        dayOfWeek = moment(date.day+'/'+date.month+'/'+date.year,'Do/M/YYYY').clone().format('dddd');
        dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        return dayOfWeek
    }

    static getStdioDateFromDateString(date, format) {
        let stdioDate = new StdioDate;
        stdioDate.setDate(moment(date,format).clone().format('Do'), moment(date,format).clone().format('MM'), moment(date,format).clone().format('YYYY'));
        return stdioDate;
    }

    static getCurrentMonthYear() {
        let today = this.getCurrentDate();
        let monthYear = new StdioMonthYear;
        monthYear.setMonthYear(today.month, today.year);
        return monthYear;
    }

    static getMomentFromMonthYear(monthYear) {
        return moment(monthYear.month+'/'+monthYear.year,'M/YYYY');
    }
    
    static getNextMonthYear(monthYear) {
        let nextMonthYearMoment = this.getMomentFromMonthYear(monthYear).clone().add('1', 'M');
        let nextMonthYear = new StdioMonthYear;
        nextMonthYear.setMonthYear(nextMonthYearMoment.format('M'), nextMonthYearMoment.format('YYYY'));
        return nextMonthYear;
    }

    static getPreviousMonthYear(monthYear) {
        let previousMonthYearMoment = this.getMomentFromMonthYear(monthYear).clone().subtract('1', 'M');
        let previousMonthYear = new StdioMonthYear;
        previousMonthYear.setMonthYear(previousMonthYearMoment.format('M'), previousMonthYearMoment.format('YYYY'));
        return previousMonthYear;
    }

    static getPreviousYear(monthYear) {
        let previousYearMoment = this.getMomentFromMonthYear(monthYear).clone().subtract('1', 'y');
        let previousYear = new StdioMonthYear;
        previousYear.setMonthYear(previousYearMoment.format('M'), previousYearMoment.format('YYYY'));
        return previousYear
    }

    static getNextYear(monthYear) {
        let nextYearMoment = this.getMomentFromMonthYear(monthYear).clone().add('1', 'y');
        let nextYear = new StdioMonthYear;
        nextYear.setMonthYear(nextYearMoment.format('M'), nextYearMoment.format('YYYY'));
        return nextYear
    }

    static getFirstDateOfMonthYear(monthYear) {
        let date = new StdioDate;
        date.setDate(
            1,
            monthYear.month,
            monthYear.year
        );
        return date;
    }

    static getLastDateOfMonthYear(monthYear) {
        let date = new StdioDate;
        date.setDate(
            this.getMomentFromMonthYear(monthYear).endOf('month').format('Do'),
            monthYear.month,
            monthYear.year
        );
        return date;
    }

    static isLastDateOfMonth(date) {
        let monthYear = new StdioMonthYear;
        monthYear.setMonthYear(date.month, date.year);
        lastDateOfMonthYear = this.getLastDateOfMonthYear(monthYear);
        return date.day == lastDateOfMonthYear.day;
    }
    
    static getMonthYearFromDate(date) {
        let monthYear = new StdioMonthYear;
        monthYear.setMonthYear( moment(date.day+'/'+date.month+'/'+date.year,'Do/M/YYYY').clone().format('M'),
                                moment(date.day+'/'+date.month+'/'+date.year,'Do/M/YYYY').clone().format('YYYY')
        );
        return monthYear;
    }

    static isLastLunarDateOfMonth (lunarDate) {
        let date = this.convertLunarToSolar(lunarDate, 7.0);
        let nextDate = new StdioDate;
        nextDate.setDate(
            moment(date.day+'/'+date.month+'/'+date.year, 'Do/M/YYYY').clone().add(1, 'days').format('Do'),
            moment(date.day+'/'+date.month+'/'+date.year, 'Do/M/YYYY').clone().add(1, 'days').format('M'),
            moment(date.day+'/'+date.month+'/'+date.year, 'Do/M/YYYY').clone().add(1, 'days').format('YYYY')
        );
        let nextLunarDate = this.convertSolarToLunar(nextDate, 7.0);
        return lunarDate.lunarDay - nextLunarDate.lunarDay > 1
    }

    static getFirstDayOfWeekOfMonthYear(monthYear) {
        return this.getFirstDateOfMonthYear(monthYear).format('e');
    }

    static jdFromDate(date) {
        let a, y, m, jd;
        a = Math.floor((14 - date.month) / 12);
        y = date.year + 4800 - a;
        m = date.month + 12 * a - 3;
        jd = date.day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        if (jd < 2299161) {
            jd = date.day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
        }
        return jd;
    }

    static jdToDate(jd){
        let a, b, c, d, e, m, day, month, year;

        if (jd > 2299160) { // After 5/10/1582, Gregorian calendar
            a = jd + 32044;
            b = Math.floor((4 * a + 3) / 146097);
            c = a - Math.floor((b * 146097) / 4);
        } else {
            b = 0;
            c = jd + 32082;
        }
        d = Math.floor((4 * c + 3) / 1461);
        e = c - Math.floor((1461 * d) / 4);
        m = Math.floor((5 * e + 2) / 153);
        day = e - Math.floor((153 * m + 2) / 5) + 1;
        month = m + 3 - 12 * Math.floor(m / 10);
        year = b * 100 + d - 4800 + Math.floor(m / 10);

        let date = new StdioDate;
        date.setDate(day, month, year);
        return date
    }

    static getNewMoonDay(k, timeZone){
        let T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
        const PI = 3.14159265359;
        T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
        T2 = T * T;
        T3 = T2 * T;
        dr = PI/180;
        Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
        M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
        Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
        F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
        C1=(0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
        if (T < -11) {
            deltat= 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
        } else {
            deltat= -0.000278 + 0.000265 * T + 0.000262 * T2;
        };
        JdNew = Jd1 + C1 - deltat;
        return Math.floor(JdNew + 0.5 + timeZone / 24)
    }

    static getSunLongitude(jdn, timeZone) {
        let T, T2, dr, M, L0, DL, L;
        const PI = 3.14159265359;

        T = (jdn - 2451545.5 - timeZone / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
        T2 = T * T;
        dr = PI/180; // degree to radian
        M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
        L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
        DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
        L = L0 + DL; // true longitude, degree
        L = L * dr;
        L = L - PI * 2 * (Math.floor(L / (PI * 2))); // Normalize to (0, 2*PI)
        return Math.floor(L / PI * 6)
    }

    static getLunarMonth11(yy, timeZone) {
        let k, off, nm, sunLong;
        let date = new StdioDate;
        date.setDate(31, 12, yy);
        off = this.jdFromDate(date) - 2415021;
        k = Math.floor(off / 29.530588853);
        nm = this.getNewMoonDay(k, timeZone);
        sunLong = this.getSunLongitude(nm, timeZone); // sun longitude at local midnight
        if (sunLong >= 9) {
            nm = this.getNewMoonDay(k - 1, timeZone);
        }
        return nm;
    }

    static getLeapMonthOffset(a11, timeZone) {
        let k, last, arc, i;
        k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        last = 0;
        i = 1; // We start with the month following lunar month 11
        arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
        do {
            last = arc;
            i++;
            arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
        } while (arc != last && i < 14);
        return i - 1;
    }

    static convertSolarToLunar(date, timeZone){
        let k, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap, leapMonthDiff;
        dayNumber = this.jdFromDate(date);
        k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
        monthStart = this.getNewMoonDay(k + 1, timeZone);
        if (monthStart > dayNumber) {
            monthStart = this.getNewMoonDay(k, timeZone);
        }
        a11 = this.getLunarMonth11(date.year, timeZone);
        b11 = a11;
        if (a11 >= monthStart) {
            lunarYear = date.year;
            a11 = this.getLunarMonth11(date.year - 1, timeZone);
        } else {
            lunarYear = date.year + 1;
            b11 = this.getLunarMonth11(date.year + 1, timeZone);
        }
        lunarDay = dayNumber - monthStart + 1;
        diff = Math.floor((monthStart - a11) / 29);
        lunarLeap = 0;
        lunarMonth = diff + 11;
        if (b11 - a11 > 365) {
            leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff == leapMonthDiff) {
                    lunarLeap = 1;
                }
            }
        }
        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }
        if (lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }
        let lunarDate = new StdioLunarDate;
        lunarDate.setLunarDate(lunarDay, lunarMonth, lunarYear, lunarLeap);
        return lunarDate
    }

    static convertLunarToSolar(lunarDate, timeZone) {
        let k, a11, b11, off, leapOff, leapMonth, monthStart;
        if (lunarDate.lunarMonth < 11) {
            a11 = this.getLunarMonth11(lunarDate.lunarYear - 1, timeZone);
            b11 = this.getLunarMonth11(lunarDate.lunarYear, timeZone);
        } else {
            a11 = this.getLunarMonth11(lunarDate.lunarYear, timeZone);
            b11 = this.getLunarMonth11(lunarDate.lunarYear + 1, timeZone);
        }
        off = lunarDate.lunarMonth - 11;
        if (off < 0) {
            off += 12;
        }
        if (b11 - a11 > 365) {
            leapOff = this.getLeapMonthOffset(a11, timeZone);
            leapMonth = leapOff - 2;
            if (leapMonth < 0) {
                leapMonth += 12;
            }
            if (lunarDate.lunarLeap != 0 && lunarDate.lunarMonth != leapMonth) {
                return StdioDate;
            } else if (lunarDate.lunarLeap != 0 || off >= leapOff) {
                off += 1;
            }
        }
        k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
        monthStart = this.getNewMoonDay(k + off, timeZone);
        return this.jdToDate(monthStart + lunarDate.lunarDay - 1);
    }

    static convertLunarMonthToString(lunarMonth, lunarLeap){
        let name;
        switch (lunarMonth) {
            case 1:
                name = 'Giêng';
                break;
            case 2:
                name = 'Hai';
                break;
            case 3:
                name = 'Ba';
                break;
            case 4:
                name = 'Bốn';
                break;
            case 5:
                name = 'Năm';
                break;
            case 6:
                name = 'Sáu';
                break;
            case 7:
                name = 'Bảy';
                break;
            case 8:
                name = 'Tám';
                break;
            case 9:
                name = 'Chín';
                break;
            case 10:
                name = 'Mưới';
                break;
            case 11:
                name = 'Một';
                break;
            case 12:
                name = 'Chạp';
                break;
        }
        return lunarLeap ? name + ' (nhuận)' : name;
    }

    static convertLunarYearToCanChi(lunarYear){
        let can, chi;
        switch ((lunarYear + 6) % 10) {
            case 0:
                can = 'Giáp';
                break;
            case 1:
                can = 'Ất';
                break;
            case 2:
                can = 'Bính';
                break;
            case 3:
                can = 'Đinh';
                break;
            case 4:
                can = 'Mậu';
                break;  
            case 5:
                can = 'Kỷ';
                break;  
            case 6:
                can = 'Canh';
                break;  
            case 7:
                can = 'Tân';
                break;  
            case 8:
                can = 'Nhâm';
                break;  
            case 9:
                can = 'Quý';
                break;  
        }
        switch ((lunarYear + 8) % 12) {
            case 0:
                chi = 'Tý';
                break;
            case 1:
                chi = 'Sửu';
                break;
            case 2:
                chi = 'Dần';
                break;
            case 3:
                chi = 'Mão';
                break;
            case 4:
                chi = 'Thìn';
                break;
            case 5:
                chi = 'Tỵ';
                break;
            case 6:
                chi = 'Ngọ';
                break;
            case 7:
                chi = 'Mùi';
                break;
            case 8:
                chi = 'Thân';
                break;
            case 9:
                chi = 'Dậu';
                break;
            case 10:
                chi = 'Tuất';
                break;
            case 11:
                chi = 'Hợi';
                break;
        }
        return can + ' ' + chi;
    }

    static convertLunarDayToCanChi(solarDate) {
        let can, chi;
        let jd = this.jdFromDate(solarDate);
        switch ((jd + 9) % 10) {
            case 0:
                can = 'Giáp';
                break;
            case 1:
                can = 'Ất';
                break;
            case 2:
                can = 'Bính';
                break;
            case 3:
                can = 'Đinh';
                break;
            case 4:
                can = 'Mậu';
                break;  
            case 5:
                can = 'Kỷ';
                break;  
            case 6:
                can = 'Canh';
                break;  
            case 7:
                can = 'Tân';
                break;  
            case 8:
                can = 'Nhâm';
                break;  
            case 9:
                can = 'Quý';
                break; 
        }
        switch ((jd + 1) % 12) {
            case 0:
                chi = 'Tý';
                break;
            case 1:
                chi = 'Sửu';
                break;
            case 2:
                chi = 'Dần';
                break;
            case 3:
                chi = 'Mão';
                break;
            case 4:
                chi = 'Thìn';
                break;
            case 5:
                chi = 'Tỵ';
                break;
            case 6:
                chi = 'Ngọ';
                break;
            case 7:
                chi = 'Mùi';
                break;
            case 8:
                chi = 'Thân';
                break;
            case 9:
                chi = 'Dậu';
                break;
            case 10:
                chi = 'Tuất';
                break;
            case 11:
                chi = 'Hợi';
                break;
        }

        return can + ' ' + chi;
    }

    static convertLunarMonthToCanChi(lunarDate){
        let can, chi;
        switch (lunarDate.lunarMonth) {
            case 11:
                chi = 'Tý';
                break;
            case 12:
                chi = 'Sửu';
                break;
            case 1:
                chi = 'Dần';
                break;
            case 2:
                chi = 'Mão';
                break;
            case 3:
                chi = 'Thìn';
                break;
            case 4:
                chi = 'Tỵ';
                break;
            case 5:
                chi = 'Ngọ';
                break;
            case 6:
                chi = 'Mùi';
                break;
            case 7:
                chi = 'Thân';
                break;
            case 8:
                chi = 'Dậu';
                break;
            case 9:
                chi = 'Tuất';
                break;
            case 10:
                chi = 'Hợi';
                break;
        }

        switch ((lunarDate.lunarYear * 12 + lunarDate.lunarMonth + 3) % 10) {
            case 0:
                can = 'Giáp';
                break;
            case 1:
                can = 'Ất';
                break;
            case 2:
                can = 'Bính';
                break;
            case 3:
                can = 'Đinh';
                break;
            case 4:
                can = 'Mậu';
                break;  
            case 5:
                can = 'Kỷ';
                break;  
            case 6:
                can = 'Canh';
                break;  
            case 7:
                can = 'Tân';
                break;  
            case 8:
                can = 'Nhâm';
                break;  
            case 9:
                can = 'Quý';
                break;
        }

        return lunarDate.lunarLeap ? can + ' ' + chi + ' nhuận' : can + ' ' + chi;
    }
    
    static getLacThuHoaGiapFromDay(solarDate) {
        let can, chi;
        let jd = this.jdFromDate(solarDate);
        can = (jd + 9) % 10;
        chi = (jd + 1) % 12;
        switch (can+'|'+chi) {
            case '0|0': case '1|1':
                return {color: 'white', text: 'Hải Trung Kim'};
            case '2|2': case '3|3':
                return {color: '#00aadd', text: 'Giáng Hạ Thuỷ'};
            case '4|4': case '5|5':
                return {color: 'white', text: 'Đại Lâm Mộc'};
            case '6|6': case '7|7':
                return {color: 'white', text: 'Lộ Bàng Thổ'};
            case '8|8': case '9|9':
                return {color: 'white', text: 'Kiếm Phong Kim'};
            case '0|10': case '1|11':
                return {color: '#00aadd', text: 'Tuyền trung Thuỷ'};
            case '2|0': case '3|1':
                return {color: '#ff5555', text: 'Lư Trung Hoả'};
            case '4|2': case '5|3':
                return {color: 'white', text: 'Thành Đầu Thổ'};
            case '6|4': case '7|5':
                return {color: 'white', text: 'Bạch Lạp Kim'};
            case '8|6': case '9|7':
                return {color: 'white', text: 'Dương Liễu Mộc'};
            case '0|8': case '1|9':
                return {color: '#ff5555', text: 'Sơn Đầu Hoả'};
            case '2|10': case '3|11':
                return {color: 'white', text: 'Ốc Thượng Thổ'};
            case '4|0': case '5|1':
                return {color: '#00aadd', text: 'Trường Lưu thuỷ'};
            case '6|2': case '7|3':
                return {color: 'white', text: 'Tùng Bách Mộc'};
            case '8|4': case '9|5':
                return {color: '#ff5555', text: 'Tích Lịch Hoả'};
            case '0|6': case '1|7':
                return {color: 'white', text: 'Sa Trung Kim'};
            case '2|8': case '3|9':
                return {color: '#00aadd', text: 'Thiên Hà Thuỷ'};
            case '4|10': case '5|11':
                return {color: 'white', text: 'Bình Địa Mộc'};
            case '6|0': case '7|1':
                return {color: 'white', text: 'Bích Thượng Thổ'};
            case '8|2': case '9|3':
                return {color: 'white', text: 'Kim Bạch Kim'};
            case '0|4': case '1|5':
                return {color: '#00aadd', text: 'Đại Khê Thuỷ'};
            case '2|6': case '3|7':
                return {color: '#ff5555', text: 'Sơn Hạ Hoả'};
            case '4|8': case '5|9':
                return {color: 'white', text: 'Đại Dịch Thổ'};
            case '6|10': case '7|11':
                return {color: 'white', text: 'Thoa Xuyến Kim'};
            case '8|0': case '9|1':
                return {color: 'white', text: 'Tang Đố Mộc'};
            case '0|2': case '1|3':
                return {color: '#ff5555', text: 'Phúc Đăng Hoả'};
            case '2|4': case '3|5':
                return {color: 'white', text: 'Sa Trung Thổ'};
            case '4|6': case '5|7':
                return {color: '#00aadd', text: 'Đại Hải Thuỷ'};
            case '6|8': case '7|9':
                return {color: 'white', text: 'Thạch Lựu Mộc'};
            case '8|10': case '9|11':
                return {color: '#ff5555', text: 'Thiên Thượng Hoả'};
        }
    }

    static getLacThuHoaGiapFromMonth(lunarDate) {
        let can, chi;
        can = (lunarDate.lunarYear * 12 + lunarDate.lunarMonth + 3) % 10;
        chi = lunarDate.lunarMonth + 1;
        if (chi > 11){
            chi = chi - 12;
        }
        switch (can+'|'+chi) {
            case '0|0': case '1|1':
                return {color: 'white', text: 'Hải Trung Kim'};
            case '2|2': case '3|3':
                return {color: '#00aadd', text: 'Giáng Hạ Thuỷ'};
            case '4|4': case '5|5':
                return {color: 'white', text: 'Đại Lâm Mộc'};
            case '6|6': case '7|7':
                return {color: 'white', text: 'Lộ Bàng Thổ'};
            case '8|8': case '9|9':
                return {color: 'white', text: 'Kiếm Phong Kim'};
            case '0|10': case '1|11':
                return {color: '#00aadd', text: 'Tuyền trung Thuỷ'};
            case '2|0': case '3|1':
                return {color: '#ff5555', text: 'Lư Trung Hoả'};
            case '4|2': case '5|3':
                return {color: 'white', text: 'Thành Đầu Thổ'};
            case '6|4': case '7|5':
                return {color: 'white', text: 'Bạch Lạp Kim'};
            case '8|6': case '9|7':
                return {color: 'white', text: 'Dương Liễu Mộc'};
            case '0|8': case '1|9':
                return {color: '#ff5555', text: 'Sơn Đầu Hoả'};
            case '2|10': case '3|11':
                return {color: 'white', text: 'Ốc Thượng Thổ'};
            case '4|0': case '5|1':
                return {color: '#00aadd', text: 'Trường Lưu thuỷ'};
            case '6|2': case '7|3':
                return {color: 'white', text: 'Tùng Bách Mộc'};
            case '8|4': case '9|5':
                return {color: '#ff5555', text: 'Tích Lịch Hoả'};
            case '0|6': case '1|7':
                return {color: 'white', text: 'Sa Trung Kim'};
            case '2|8': case '3|9':
                return {color: '#00aadd', text: 'Thiên Hà Thuỷ'};
            case '4|10': case '5|11':
                return {color: 'white', text: 'Bình Địa Mộc'};
            case '6|0': case '7|1':
                return {color: 'white', text: 'Bích Thượng Thổ'};
            case '8|2': case '9|3':
                return {color: 'white', text: 'Kim Bạch Kim'};
            case '0|4': case '1|5':
                return {color: '#00aadd', text: 'Đại Khê Thuỷ'};
            case '2|6': case '3|7':
                return {color: '#ff5555', text: 'Sơn Hạ Hoả'};
            case '4|8': case '5|9':
                return {color: 'white', text: 'Đại Dịch Thổ'};
            case '6|10': case '7|11':
                return {color: 'white', text: 'Thoa Xuyến Kim'};
            case '8|0': case '9|1':
                return {color: 'white', text: 'Tang Đố Mộc'};
            case '0|2': case '1|3':
                return {color: '#ff5555', text: 'Phúc Đăng Hoả'};
            case '2|4': case '3|5':
                return {color: 'white', text: 'Sa Trung Thổ'};
            case '4|6': case '5|7':
                return {color: '#00aadd', text: 'Đại Hải Thuỷ'};
            case '6|8': case '7|9':
                return {color: 'white', text: 'Thạch Lựu Mộc'};
            case '8|10': case '9|11':
                return {color: '#ff5555', text: 'Thiên Thượng Hoả'};
        }
    }

    static getLacThuHoaGiapFromYear(lunarYear) {
        let can, chi;
        can = (lunarYear + 6) % 10;
        chi = (lunarYear + 8) % 12;
        switch (can+'|'+chi) {
            case '0|0': case '1|1':
                return {color: 'white', text: 'Hải Trung Kim'};
            case '2|2': case '3|3':
                return {color: '#00aadd', text: 'Giáng Hạ Thuỷ'};
            case '4|4': case '5|5':
                return {color: 'white', text: 'Đại Lâm Mộc'};
            case '6|6': case '7|7':
                return {color: 'white', text: 'Lộ Bàng Thổ'};
            case '8|8': case '9|9':
                return {color: 'white', text: 'Kiếm Phong Kim'};
            case '0|10': case '1|11':
                return {color: '#00aadd', text: 'Tuyền trung Thuỷ'};
            case '2|0': case '3|1':
                return {color: '#ff5555', text: 'Lư Trung Hoả'};
            case '4|2': case '5|3':
                return {color: 'white', text: 'Thành Đầu Thổ'};
            case '6|4': case '7|5':
                return {color: 'white', text: 'Bạch Lạp Kim'};
            case '8|6': case '9|7':
                return {color: 'white', text: 'Dương Liễu Mộc'};
            case '0|8': case '1|9':
                return {color: '#ff5555', text: 'Sơn Đầu Hoả'};
            case '2|10': case '3|11':
                return {color: 'white', text: 'Ốc Thượng Thổ'};
            case '4|0': case '5|1':
                return {color: '#00aadd', text: 'Trường Lưu thuỷ'};
            case '6|2': case '7|3':
                return {color: 'white', text: 'Tùng Bách Mộc'};
            case '8|4': case '9|5':
                return {color: '#ff5555', text: 'Tích Lịch Hoả'};
            case '0|6': case '1|7':
                return {color: 'white', text: 'Sa Trung Kim'};
            case '2|8': case '3|9':
                return {color: '#00aadd', text: 'Thiên Hà Thuỷ'};
            case '4|10': case '5|11':
                return {color: 'white', text: 'Bình Địa Mộc'};
            case '6|0': case '7|1':
                return {color: 'white', text: 'Bích Thượng Thổ'};
            case '8|2': case '9|3':
                return {color: 'white', text: 'Kim Bạch Kim'};
            case '0|4': case '1|5':
                return {color: '#00aadd', text: 'Đại Khê Thuỷ'};
            case '2|6': case '3|7':
                return {color: '#ff5555', text: 'Sơn Hạ Hoả'};
            case '4|8': case '5|9':
                return {color: 'white', text: 'Đại Dịch Thổ'};
            case '6|10': case '7|11':
                return {color: 'white', text: 'Thoa Xuyến Kim'};
            case '8|0': case '9|1':
                return {color: 'white', text: 'Tang Đố Mộc'};
            case '0|2': case '1|3':
                return {color: '#ff5555', text: 'Phúc Đăng Hoả'};
            case '2|4': case '3|5':
                return {color: 'white', text: 'Sa Trung Thổ'};
            case '4|6': case '5|7':
                return {color: '#00aadd', text: 'Đại Hải Thuỷ'};
            case '6|8': case '7|9':
                return {color: 'white', text: 'Thạch Lựu Mộc'};
            case '8|10': case '9|11':
                return {color: '#ff5555', text: 'Thiên Thượng Hoả'};
        }
    }

    static getTuoiHopFromDay(solarDate) {
        let can, chi;
        let jd = this.jdFromDate(solarDate);
        switch ((jd + 9) % 10) {
            case 0:
                can = 'Kỷ';
                break;
            case 1:
                can = 'Canh';
                break;
            case 2:
                can = 'Tân';
                break;
            case 3:
                can = 'Nhâm';
                break;
            case 4:
                can = 'Quý';
                break;  
            case 5:
                can = 'Giáp';
                break;  
            case 6:
                can = 'Ất';
                break;  
            case 7:
                can = 'Bính';
                break;  
            case 8:
                can = 'Đinh';
                break;  
            case 9:
                can = 'Mâu';
                break; 
        }
        switch ((jd + 1) % 12) {
            case 0:
                chi = 'Sửu';
                break;
            case 1:
                chi = 'Tý';
                break;
            case 2:
                chi = 'Hợi';
                break;
            case 3:
                chi = 'Tuất';
                break;
            case 4:
                chi = 'Dậu';
                break;
            case 5:
                chi = 'Thân';
                break;
            case 6:
                chi = 'Mùi';
                break;
            case 7:
                chi = 'Ngọ';
                break;
            case 8:
                chi = 'Tỵ';
                break;
            case 9:
                chi = 'Thìn';
                break;
            case 10:
                chi = 'Mão';
                break;
            case 11:
                chi = 'Dần';
                break;
        }
        return can + ' ' + chi;
    }

    static getTuoiHopFromMonth(lunarDate) {
        let can, chi;
        switch (lunarDate.lunarMonth) {
            case 11:
                chi = 'Sửu';
                break;
            case 12:
                chi = 'Tý';
                break;
            case 1:
                chi = 'Hợi';
                break;
            case 2:
                chi = 'Tuất';
                break;
            case 3:
                chi = 'Dậu';
                break;
            case 4:
                chi = 'Thân';
                break;
            case 5:
                chi = 'Mùi';
                break;
            case 6:
                chi = 'Ngọ';
                break;
            case 7:
                chi = 'Tỵ';
                break;
            case 8:
                chi = 'Thìn';
                break;
            case 9:
                chi = 'Mão';
                break;
            case 10:
                chi = 'Dần';
                break;
        }
        switch ((lunarDate.lunarYear * 12 + lunarDate.lunarMonth + 3) % 10) {
            case 0:
                can = 'Kỷ';
                break;
            case 1:
                can = 'Canh';
                break;
            case 2:
                can = 'Tân';
                break;
            case 3:
                can = 'Nhâm';
                break;
            case 4:
                can = 'Quý';
                break;  
            case 5:
                can = 'Giáp';
                break;  
            case 6:
                can = 'Ất';
                break;  
            case 7:
                can = 'Bính';
                break;  
            case 8:
                can = 'Đinh';
                break;  
            case 9:
                can = 'Mâu';
                break;
        }

        return can + ' ' + chi;
    }

    static getTuoiHopFromYear(lunarYear) {
        let can, chi;
        switch ((lunarYear + 6) % 10) {
            case 0:
                can = 'Kỷ';
                break;
            case 1:
                can = 'Canh';
                break;
            case 2:
                can = 'Tân';
                break;
            case 3:
                can = 'Nhâm';
                break;
            case 4:
                can = 'Quý';
                break;  
            case 5:
                can = 'Giáp';
                break;  
            case 6:
                can = 'Ất';
                break;  
            case 7:
                can = 'Bính';
                break;  
            case 8:
                can = 'Đinh';
                break;  
            case 9:
                can = 'Mâu';
                break;
        }
        switch ((lunarYear + 8) % 12) {
            case 0:
                chi = 'Sửu';
                break;
            case 1:
                chi = 'Tý';
                break;
            case 2:
                chi = 'Hợi';
                break;
            case 3:
                chi = 'Tuất';
                break;
            case 4:
                chi = 'Dậu';
                break;
            case 5:
                chi = 'Thân';
                break;
            case 6:
                chi = 'Mùi';
                break;
            case 7:
                chi = 'Ngọ';
                break;
            case 8:
                chi = 'Tỵ';
                break;
            case 9:
                chi = 'Thìn';
                break;
            case 10:
                chi = 'Mão';
                break;
            case 11:
                chi = 'Dần';
                break;
        }
        return can + ' ' + chi;
    }

    static getTuoiKyFromDay(solarDate) {
        let can, chi, can1;
        let jd = this.jdFromDate(solarDate);
        switch ((jd + 9) % 10) {
            case 0:
                can1 = 'Giáp';
                can = 'Canh';
                break;
            case 1:
                can1 = 'Ất';
                can = 'Tân';
                break;
            case 2:
                can1 = 'Bính';
                can = 'Nhâm';
                break;
            case 3:
                can1 = 'Đinh';
                can = 'Quý';
                break;
            case 4:
                can1 = 'Mậu';
                can = 'Giáp';
                break;  
            case 5:
                can1 = 'Kỷ';
                can = 'Ất';
                break;  
            case 6:
                can1 = 'Canh';
                can = 'Bính';
                break;  
            case 7:
                can1 = 'Tân';
                can = 'Đinh';
                break;  
            case 8:
                can1 = 'Nhâm'
                can = 'Mậu';
                break;  
            case 9:
                can1 = 'Quý';
                can = 'Kỷ';
                break; 
        }

        switch ((jd + 1) % 12) {
            case 0:
                chi = 'Ngọ';
                break;
            case 1:
                chi = 'Mùi';
                break;
            case 2:
                chi = 'Thân';
                break;
            case 3:
                chi = 'Dậu';
                break;
            case 4:
                chi = 'Tuất';
                break;
            case 5:
                chi = 'Hợi';
                break;
            case 6:
                chi = 'Tý';
                break;
            case 7:
                chi = 'Sửu';
                break;
            case 8:
                chi = 'Dần';
                break;
            case 9:
                chi = 'Mão';
                break;
            case 10:
                chi = 'Thìn';
                break;
            case 11:
                chi = 'Tỵ';
                break;
        }
        let tuoiKy = [can1 + ' ' + chi, can + ' ' + chi];
        return tuoiKy
    }

    static getTuoiKyFromMonth(lunarDate){
        let can, chi, can1;
        switch (lunarDate.lunarMonth) {
            case 11:
                chi = 'Ngọ';
                break;
            case 12:
                chi = 'Mùi';
                break;
            case 1:
                chi = 'Thân';
                break;
            case 2:
                chi = 'Dậu';
                break;
            case 3:
                chi = 'Tuất';
                break;
            case 4:
                chi = 'Hợi';
                break;
            case 5:
                chi = 'Tý';
                break;
            case 6:
                chi = 'Sửu';
                break;
            case 7:
                chi = 'Dần';
                break;
            case 8:
                chi = 'Mão';
                break;
            case 9:
                chi = 'Thìn';
                break;
            case 10:
                chi = 'Tỵ';
                break;
        }

        switch ((lunarDate.lunarYear * 12 + lunarDate.lunarMonth + 3) % 10) {
            case 0:
                can1 = 'Giáp';
                can = 'Canh';
                break;
            case 1:
                can1 = 'Ất';
                can = 'Tân';
                break;
            case 2:
                can1 = 'Bính';
                can = 'Nhâm';
                break;
            case 3:
                can1 = 'Đinh';
                can = 'Quý';
                break;
            case 4:
                can1 = 'Mậu';
                can = 'Giáp';
                break;  
            case 5:
                can1 = 'Kỷ';
                can = 'Ất';
                break;  
            case 6:
                can1 = 'Canh';
                can = 'Bính';
                break;  
            case 7:
                can1 = 'Tân';
                can = 'Đinh';
                break;  
            case 8:
                can1 = 'Nhâm'
                can = 'Mậu';
                break;  
            case 9:
                can1 = 'Quý';
                can = 'Kỷ';
                break;
        }
        let tuoiKy = [can1 + ' ' + chi, can + ' ' + chi];
        return tuoiKy;
    }

    static getTuoiKyFromYear(lunarYear) {
        let can, chi, can1;
        switch ((lunarYear + 6) % 10) {
            case 0:
                can1 = 'Giáp';
                can = 'Canh';
                break;
            case 1:
                can1 = 'Ất';
                can = 'Tân';
                break;
            case 2:
                can1 = 'Bính';
                can = 'Nhâm';
                break;
            case 3:
                can1 = 'Đinh';
                can = 'Quý';
                break;
            case 4:
                can1 = 'Mậu';
                can = 'Giáp';
                break;  
            case 5:
                can1 = 'Kỷ';
                can = 'Ất';
                break;  
            case 6:
                can1 = 'Canh';
                can = 'Bính';
                break;  
            case 7:
                can1 = 'Tân';
                can = 'Đinh';
                break;  
            case 8:
                can1 = 'Nhâm'
                can = 'Mậu';
                break;  
            case 9:
                can1 = 'Quý';
                can = 'Kỷ';
                break;
        }
        switch ((lunarYear + 8) % 12) {
            case 0:
                chi = 'Ngọ';
                break;
            case 1:
                chi = 'Mùi';
                break;
            case 2:
                chi = 'Thân';
                break;
            case 3:
                chi = 'Dậu';
                break;
            case 4:
                chi = 'Tuất';
                break;
            case 5:
                chi = 'Hợi';
                break;
            case 6:
                chi = 'Tý';
                break;
            case 7:
                chi = 'Sửu';
                break;
            case 8:
                chi = 'Dần';
                break;
            case 9:
                chi = 'Mão';
                break;
            case 10:
                chi = 'Thìn';
                break;
            case 11:
                chi = 'Tỵ';
                break;
        }
        let tuoiKy = [can1 + ' ' + chi, can + ' ' + chi];
        return tuoiKy;
    }

    static getQueFromDonLucNham(lunarDate, time) {
        chi = (lunarDate.lunarYear + 8) % 12 + 1 + lunarDate.lunarMonth + lunarDate.lunarLeap + lunarDate.lunarDay + time - 3;
        switch (chi % 6) {
            case 0:
                return {color: '#FFD702', text: "Vô Vong"};
            case 1:
                return {color: '#FFD702', text: "Đại An"};
            case 2:
                return {color: 'black', text: "Lưu Niên"};
            case 3:
                return {color: '#ff5555', text: "Tốc Hỷ"};
            case 4:
                return {color: 'white', text: "Xích Khẩu"};
            case 5:
                return {color: '#05EE00', text: "Tiểu Cát"};
        }
    }

    static getQueFromDonBatMon(lunarDate, time) {
        chi = lunarDate.lunarMonth + lunarDate.lunarDay + lunarDate.lunarLeap + time
        switch (chi % 8) {
            case 0:
                return {color: 'black', text: "Hưu"};
            case 1:
                return {color: '#05EE00', text: "Sinh"};
            case 2:
                return {color: '#05EE00', text: "Thương"};
            case 3:
                return {color: '#ff5555', text: "Đỗ"};
            case 4:
                return {color: '#ff5555', text: "Cảnh"};
            case 5:
                return {color: 'white', text: "Tử"};
            case 6:
                return {color: 'white', text: "Kinh"};
            case 7:
                return {color: 'black', text: "Khai"};
        }
    }

    static isBadDay(lunarDate) {
        let date = this.convertLunarToSolar(lunarDate, 7.0);
        let jd = this.jdFromDate(date);
        let canDay = (jd + 9) % 10;
        let chiDay = (jd + 1) % 12;
        
        switch (lunarDate.lunarMonth) {
            case 1:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 2: case 4: case 5: case 6: case 8: case 9:
                        return true;
                }
                break;
            case 2:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 1: case 3: case 4: case 5: case 6: case 8:
                        return true;
                }
                break;
            case 3:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 1: case 4: case 5: case 6: case 7: case 8:
                        return true;
                }
                break;
            case 4:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 2: case 3: case 9: case 7: case 9: case 10: case 11:
                        return true;
                }
                break;
            case 5:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 2: case 3: case 4: case 7: case 8: case 10: case 11:
                        return true;
                }
                break;
            case 6:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 2: case 3: case 4: case 6: case 7: case 9: case 10: case 11:
                        return true;
                }
                break;
            case 7:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 1: case 2: case 3: case 4: case 6: case 9: case 11:
                        return true;
                }
                break;
            case 8:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 1: case 2: case 3: case 4: case 6: case 9:
                        return true;
                }
                break;
            case 9:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 0: case 1: case 2: case 3: case 4: case 6: case 9:
                        return true;
                }
                break;
            case 10:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 1: case 3: case 4: case 5: case 7: case 8: case 9:
                        return true;
                }
                break;
            case 11:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 1: case 2: case 3: case 5: case 6: case 7: case 8: case 9: case 10:
                        return true;
                }
                break;
            case 12:
                switch (lunarDate.lunarDay) {
                    case 3: case 5: case 7: case 13: case 14: case 18: case 22: case 23: case 27:
                        return true;
                }
                switch (chiDay) {
                    case 1: case 3: case 4: case 5: case 8: case 9:
                        return true;
                }
                break;
        }

        switch ((lunarDate.lunarYear + 8) % 12) {
            case 0:
                switch (chiDay) {
                    case 5: case 6: case 7:
                        return true; 
                }
                break;
            case 1:
                switch (chiDay) {
                    case 2: case 3: case 4:
                        return true; 
                }
                break;
            case 2:
                switch (chiDay) {
                    case 11: case 0: case 1:
                        return true; 
                }
                break;
            case 3:
                switch (chiDay) {
                    case 8: case 9: case 10:
                        return true; 
                }
                break;
            case 4:
                switch (chiDay) {
                    case 5: case 6: case 7:
                        return true; 
                }
                break;
            case 5:
                switch (chiDay) {
                    case 2: case 3: case 4: case 11:
                        return true; 
                }
                break;
            case 6:
                switch (chiDay) {
                    case 11: case 0: case 1:
                        return true; 
                }
                break;
            case 7:
                switch (chiDay) {
                    case 8: case 9: case 10:
                        return true; 
                }
                break;
            case 8:
                switch (chiDay) {
                    case 5: case 6: case 7:
                        return true; 
                }
                break;
            case 9:
                switch (chiDay) {
                    case 2: case 3: case 4:
                        return true; 
                }
                break;
            case 10:
                switch (chiDay) {
                    case 11: case 0: case 1:
                        return true; 
                }
                break;
            case 11:
                switch (chiDay) {
                    case 8: case 9: case 10:
                        return true; 
                }
                break;
        }

        switch (date.month) {
            case 2:
                if (date.day == 3) return true;
                break;
            case 3:
                if (date.day == 20) return true;
                break;
            case 5:
                if (date.day == 5) return true;
                break;
            case 6:
                if (date.day == 5) return true;
                break;
            case 8: 
                if (date.day == 8) return true;
                break;
            case 9:
                if (date.day == 22) return true;
                break;
            case 11:
                if (date.day == 7) return true;
                break;
            case 12:
                if (date.day == 21) return true;
                break;
        }

        switch ((lunarDate.lunarYear + 6) % 10) {
            case 0: case 5:
                switch (lunarDate.lunarMonth) {
                    case 3:
                        if (canDay == 4 && chiDay == 10) return true;
                        break;
                    case 7:
                        if (canDay == 9 && chiDay == 11) return true;
                        break;
                    case 10:
                        if (canDay == 2 && chiDay == 8) return true;
                        break;
                    case 11:
                        if (canDay == 3 && chiDay == 11) return true;
                        break;
                }
                break;
            case 1: case 6:
                switch (lunarDate.lunarMonth) {
                    case 4:
                        if (canDay == 8 && chiDay == 8) return true;
                        break;
                    case 9:
                        if (canDay == 1 && chiDay == 5) return true;
                        break;
                }
                break;
            case 2: case 7:
                switch (lunarDate.lunarMonth) {
                    case 3:
                        if (canDay == 7 && chiDay == 5) return true;
                        break;
                    case 9:
                        if (canDay == 6 && chiDay == 4) return true;
                        break;
                    case 10:
                        if (canDay == 0 && chiDay == 4) return true;
                        break;
                }
                break;
            case 4: case 9:
                switch (lunarDate.lunarMonth) {
                    case 6:
                        if (canDay == 5 && chiDay == 1) return true;
                        break;
                }
                break;
        }
        return false;
    }

    static getChiTietQue(que) {
        switch (que) {
            case 'Sinh':
                return `\tSinh nghĩa là: Sống, là sự bắt đầu (cho một việc, một cái gì đó), là ý tưởng ban đầu, là mầm cây, là cỏ, là cây nhỏ, là loại cây mềm yếu (cây Liễu chẳng hạn), là mùa xuân, là sự hứa hẹn, là hy vọng…\n\tCung Sinh là Âm Mộc, nhưng nghĩa Sinh thuộc Dương Mộc. Độ số là 3. Về phương vị là chính Đông. Về màu sắc là xanh lá mạ, xanh non.`;
            case 'Thương':
                return `\tThương nghĩa là: Buồn, là thuộc trạng thái tình cảm, là cây lớn, là sự phát triền sung mãn sắp chuyển sang giai đoạn suy vi.\n\tCung Thương là Dương Mộc, nhưng nghĩa của Thương thuộc Âm Mộc. Độ số là 8. Về phương vị là Đông Bắc. Về màu sắc là xanh lá cây xậm.`;
            case 'Đỗ':
                return `\tĐỗ nghĩa là: Đạt, là sự thành đạt, là kết quả tốt đẹp, là được việc, là quí nhân phù trợ.\n\tCung Đỗ là Âm Hoả, nhưng nghĩa của Đỗ thuộc Dương Hoả. Độ số là 7. Về Phương vị là chính Nam. Về màu sắc là màu đỏ.`;
            case 'Cảnh':
                return `\tCảnh nghĩa là: Đi chơi ở trong sự nhàn hạ, phong lưu.Là từ xa tới, là du lịch, là đi xa, là vẻ đẹp, là nhà đẹp, cao rộng có vườn cây hoặc nội thất rực rỡ.\n\tCung Cảnh thuộc Dương Hoả, nhưng nghĩa của Cảnh thuộc Âm Hoả. Độ số là 2. Về phương vị là Đông Nam. Về màu sắc là màu đỏ nâu. Cảnh, vì là Âm Hỏa – chính vị Khôn Thổ (Theo Hậu thiên Lạc Việt) – nên còn có ý nghĩa là Âm Thổ: miếng đất đẹp.`;
            case 'Tử':
                return `\tTử nghĩa là: Chết, sự chấm dứt, kết thúc, là cắt đứt, là sát phạt, là tiền bạc tài sản lưu động, là người làm nghề cơ khí, kim khí, là võ nghiệp, nếu là bác sĩ thì liên quan đến mổ xẻ, là nghe…\n\tCung Tử thuộc Âm Kim, nhưng nghĩa của Tử thuộc Dương Kim. Độ số là 9. Về phương vị là chính Tây. Về màu sắc là màu trắng. Tử, cũng còn có nghĩa là con cái.`;
            case 'Kinh':
                return `\tKinh nghĩa là: Kinh sợ, đột ngột, sự bất ngờ, là giật gân, là người làm việc táo bạo, mạo hiểm…\n\tCung Kinh thuộc Dương Kim, nhưng nghĩa của Kinh thuộc Âm Kim. Độ số là 4. Về màu sắc là trắng xám.`;
            case 'Khai':
                return `\tKhai nghĩa là dòng nước chảy, là sự khai thông, là trôi đi, là thoát khỏi sự bế tắc, là đi xa thuận lợi,…\n\tCung Khai thuộc Âm Thuỷ, nhưng nghĩa của Khai thuộc Dương Thuỷ. Độ số là 1. Về màu sắc là xanh dương, là đen bóng.`;
            case 'Hưu':
                return `\tHưu nghĩa là: Nghỉ, sự ngưng trệ, sự nghỉ ngơi do bất lực, kiệt sức, là bế tắc.\n\tCung Hưu thuộc Dương Thuỷ, nhưng nghĩa của Hưu thuộc Âm Thuỷ. Độ số là 6. Về màu là màu đen xỉn, xanh đen.`;
            case 'Đại an':
                return `\tĐại an thuộc Dương Thổ, nghĩa là bình yên lớn. Tính chất chậm chạp nhưng chắc chắn, thuộc về tài sản là nhà đất lớn, là miếng đất hoặc vùng đất lớn, là nguồn lợi ổn định, chắc chắn. Về người là bậc quân tử chín chắn, nữ hiền hậu tính cách điềm đạm, là người đầy đặn, béo tốt. Về công việc là sự ổn định, là người làm tại nơi trung tâm, có quyền chức địa vị. Về nơi làm việc là cơ quan hoặc bộ phận quan trọng. Về bệnh liên quan đến dạ dày hoặc tỳ. Về phương vị là nơi trung tâm. Về màu sắc là màu vàng thổ. Độ số là 5.`;
            case 'Lưu niên':
                return `\tLưu niên thuộc Thuỷ, nghĩa là giữ lại thời gian. Có tính hiểm độc, lừa dối, âm mưu, là mưu toan, là sự do dự, lo lắng. Thuộc về tài sản là thất thoát, phá sản. Thuộc về sự việc là trì trệ. Là công việc không chính danh, có tính phiêu lưu mạo hiểm, là phi pháp, phi đạo đức. Là chết chóc tai nạn. Về bệnh thì liên quan đến máu huyết hoặc thận. Về phương vị là phương Bắc hoặc Tây Bắc. Về màu là màu đen hoặc xanh dương. Về độ số là 1 và 6.`;
            case 'Tốc Hỷ':
                return `\tTốc hỷ thuộc Hoả, nghĩa là sự vui vẻ, may mắn, là nhanh chóng, là tốt đẹp sáng sủa. Về người là quí nhân hay giúp đỡ người khác, là người thông minh, tài cao học rộng. Về công việc là chính danh, về học vấn là sự thành đạt, có học vị cao, là những dịch vụ phục vụ cho vẻ đẹp, cho nhu cầu tinh thần. Về hiện tượng là thuộc về văn hóa, giáo dục. Là người mang những giá trị tinh thần cao quí. Về bệnh liên quan đến tim hoặc tinh thần. Về màu sắc là màu đỏ, về phương vị là hướng Nam hoặc Đông Nam. Về độ số là 2 và 7.`;
            case 'Xích Khẩu':
                return `\tXích khẩu thuộc Kim. Nghĩa là sự tranh luận, cãi nhau, tiếng ồn ào, tiếng động. Về sự việc là tranh chấp kiện tụng. Về nghề nghiệp là nghề liên quan đến kim khí, máy móc; liên quan đến miệng như: dạy học, luật sư, quảng cáo, thông tin… Về người là người hay nói, lý luận khúc chiết, là người thấp, đầy đặn, nhiều lý trí. Về bệnh tật là bệnh liên quan đến phổi, tai, xương cốt. Về hướng là hướng Tây hoặc Tây Nam. Về màu sắc là màu trắng hoặc xám trắng. Về độ số là 4 và 9.`;
            case 'Tiểu Cát':
                return `\tTiểu cát thuộc Mộc. Nghĩa là niềm vui nhỏ, là tin tức vui, là tình cảm, tình yêu, sự quí mến. Về sự vật là sách vở, là tri thức, học hành, là cây cối. Về người là người giàu tình cảm, là hôn nhân, tình duyên. Về nghề nghiệp là người buôn bán nhỏ, có tiểu lợi, là người làm ăn liên quan đến gỗ cây, sách vở, tri thức… Về hình thể là người yểu điệu, mình dây, duyên dáng; đàn ông cao gầy có tính hiền, ham học hỏi. Về bệnh liên quan đến gan.Về hướng là hướng Đông hoặc Đông Bắc. Về màu sắc là màu xanh lá cây. Về độ số là 3 và 8.`;
            case 'Vô Vong':
                return `\tVô vong thuộc Âm Thổ. Nghĩa là không được việc gì, hoặc không sao cả; là đất bỏ hoang. Về người là người vô tích sự, thất nghiệp. Gặp hạn thì hoá giải. Về màu sắc là màu vàng đất xỉn. Về phương vị là ở cạnh nơi trung tâm, ở phía dưới, là nền nhà. Về độ số là 10.`;
        }
    }
}