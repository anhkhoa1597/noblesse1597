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
                return '0 Hải Trung Kim';
            case '2|2': case '3|3':
                return '1 Giáng Hạ Thuỷ';
            case '4|4': case '5|5':
                return '0 Đại Lâm Mộc';
            case '6|6': case '7|7':
                return '0 Lộ Bàng Thổ';
            case '8|8': case '9|9':
                return '0 Kiếm Phong Kim';
            case '0|10': case '1|11':
                return '1 Tuyền trung Thuỷ';
            case '2|0': case '3|1':
                return '2 Lư Trung Hoả';
            case '4|2': case '5|3':
                return '0 Thành Đầu Thổ';
            case '6|4': case '7|5':
                return '0 Bạch Lạp Kim';
            case '8|6': case '9|7':
                return '0 Dương Liễu Mộc';
            case '0|8': case '1|9':
                return '2 Sơn Đầu Hoả';
            case '2|10': case '3|11':
                return '0 Ốc Thượng Thổ';
            case '4|0': case '5|1':
                return '1 Trường Lưu thuỷ';
            case '6|2': case '7|3':
                return '0 Tùng Bách Mộc';
            case '8|4': case '9|5':
                return '2 Tích Lịch Hoả';
            case '0|6': case '1|7':
                return '0 Sa Trung Kim';
            case '2|8': case '3|9':
                return '1 Thiên Hà Thuỷ';
            case '4|10': case '5|11':
                return '0 Bình Địa Mộc';
            case '6|0': case '7|1':
                return '0 Bích Thượng Thổ';
            case '8|2': case '9|3':
                return '0 Kim Bạch Kim';
            case '0|4': case '1|5':
                return '1 Đại Khê Thuỷ';
            case '2|6': case '3|7':
                return '2 Sơn Hạ Hoả';
            case '4|8': case '5|9':
                return '0 Đại Dịch Thổ';
            case '6|10': case '7|11':
                return '0 Thoa Xuyến Kim';
            case '8|0': case '9|1':
                return '0 Tang Đố Mộc';
            case '0|2': case '1|3':
                return '2 Phúc Đăng Hoả';
            case '2|4': case '3|5':
                return '0 Sa Trung Thổ';
            case '4|6': case '5|7':
                return '1 Đại Hải Thuỷ';
            case '6|8': case '7|9':
                return '0 Thạch Lựu Mộc';
            case '8|10': case '9|11':
                return '2 Thiên Thượng Hoả';
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
                return '0 Hải Trung Kim';
            case '2|2': case '3|3':
                return '1 Giáng Hạ Thuỷ';
            case '4|4': case '5|5':
                return '0 Đại Lâm Mộc';
            case '6|6': case '7|7':
                return '0 Lộ Bàng Thổ';
            case '8|8': case '9|9':
                return '0 Kiếm Phong Kim';
            case '0|10': case '1|11':
                return '1 Tuyền trung Thuỷ';
            case '2|0': case '3|1':
                return '2 Lư Trung Hoả';
            case '4|2': case '5|3':
                return '0 Thành Đầu Thổ';
            case '6|4': case '7|5':
                return '0 Bạch Lạp Kim';
            case '8|6': case '9|7':
                return '0 Dương Liễu Mộc';
            case '0|8': case '1|9':
                return '2 Sơn Đầu Hoả';
            case '2|10': case '3|11':
                return '0 Ốc Thượng Thổ';
            case '4|0': case '5|1':
                return '1 Trường Lưu thuỷ';
            case '6|2': case '7|3':
                return '0 Tùng Bách Mộc';
            case '8|4': case '9|5':
                return '2 Tích Lịch Hoả';
            case '0|6': case '1|7':
                return '0 Sa Trung Kim';
            case '2|8': case '3|9':
                return '1 Thiên Hà Thuỷ';
            case '4|10': case '5|11':
                return '0 Bình Địa Mộc';
            case '6|0': case '7|1':
                return '0 Bích Thượng Thổ';
            case '8|2': case '9|3':
                return '0 Kim Bạch Kim';
            case '0|4': case '1|5':
                return '1 Đại Khê Thuỷ';
            case '2|6': case '3|7':
                return '2 Sơn Hạ Hoả';
            case '4|8': case '5|9':
                return '0 Đại Dịch Thổ';
            case '6|10': case '7|11':
                return '0 Thoa Xuyến Kim';
            case '8|0': case '9|1':
                return '0 Tang Đố Mộc';
            case '0|2': case '1|3':
                return '2 Phúc Đăng Hoả';
            case '2|4': case '3|5':
                return '0 Sa Trung Thổ';
            case '4|6': case '5|7':
                return '1 Đại Hải Thuỷ';
            case '6|8': case '7|9':
                return '0 Thạch Lựu Mộc';
            case '8|10': case '9|11':
                return '2 Thiên Thượng Hoả';
        }
    }

    static getLacThuHoaGiapFromYear(lunarYear) {
        let can, chi;
        can = (lunarYear + 6) % 10;
        chi = (lunarYear + 8) % 12;
        switch (can+'|'+chi) {
            case '0|0': case '1|1':
                return '0 Hải Trung Kim';
            case '2|2': case '3|3':
                return '1 Giáng Hạ Thuỷ';
            case '4|4': case '5|5':
                return '0 Đại Lâm Mộc';
            case '6|6': case '7|7':
                return '0 Lộ Bàng Thổ';
            case '8|8': case '9|9':
                return '0 Kiếm Phong Kim';
            case '0|10': case '1|11':
                return '1 Tuyền trung Thuỷ';
            case '2|0': case '3|1':
                return '2 Lư Trung Hoả';
            case '4|2': case '5|3':
                return '0 Thành Đầu Thổ';
            case '6|4': case '7|5':
                return '0 Bạch Lạp Kim';
            case '8|6': case '9|7':
                return '0 Dương Liễu Mộc';
            case '0|8': case '1|9':
                return '2 Sơn Đầu Hoả';
            case '2|10': case '3|11':
                return '0 Ốc Thượng Thổ';
            case '4|0': case '5|1':
                return '1 Trường Lưu thuỷ';
            case '6|2': case '7|3':
                return '0 Tùng Bách Mộc';
            case '8|4': case '9|5':
                return '2 Tích Lịch Hoả';
            case '0|6': case '1|7':
                return '0 Sa Trung Kim';
            case '2|8': case '3|9':
                return '1 Thiên Hà Thuỷ';
            case '4|10': case '5|11':
                return '0 Bình Địa Mộc';
            case '6|0': case '7|1':
                return '0 Bích Thượng Thổ';
            case '8|2': case '9|3':
                return '0 Kim Bạch Kim';
            case '0|4': case '1|5':
                return '1 Đại Khê Thuỷ';
            case '2|6': case '3|7':
                return '2 Sơn Hạ Hoả';
            case '4|8': case '5|9':
                return '0 Đại Dịch Thổ';
            case '6|10': case '7|11':
                return '0 Thoa Xuyến Kim';
            case '8|0': case '9|1':
                return '0 Tang Đố Mộc';
            case '0|2': case '1|3':
                return '2 Phúc Đăng Hoả';
            case '2|4': case '3|5':
                return '0 Sa Trung Thổ';
            case '4|6': case '5|7':
                return '1 Đại Hải Thuỷ';
            case '6|8': case '7|9':
                return '0 Thạch Lựu Mộc';
            case '8|10': case '9|11':
                return '2 Thiên Thượng Hoả';
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
}