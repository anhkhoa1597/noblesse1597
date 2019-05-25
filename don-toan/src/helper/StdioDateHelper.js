import moment from 'moment';
import StdioDate from './StdioDate'
import StdioMonthYear from './StdioMonthYear'
import StdioLunarDate from './StdioLunarDate'

class StdioDateHelper {
    initMoment() {
        require('moment/locale/vi');
        moment.locale();
    }

    getCurrentMoment() {
        return moment().clone();
    }

    getNextMonthMoment() {
        let today = StdioDate;
        return today.getCurrentMoment().clone().add('1', 'M')
    }

    getCurrentDate() {
        let today = StdioDate;
        today.setToday();
        return today;
    }

    getCurrentMonth() {
        return getCurrentDate().month;
    }

    getCurrentMonthYear() {
        let today = this.getCurrentDate();
        let monthYear = StdioMonthYear;
        monthYear.setMonthYear(today.month, today.year);
        return monthYear;
    }

    getMomentFromMonthYear(monthYear) {
        return moment(monthYear.month+'/'+monthYear.year,'M/YYYY');
    }
    
    getNextMonthYear(monthYear) {
        let nextMonthYearMoment = this.getMomentFromMonthYear(monthYear).clone().add('1', 'M');
        let nextMonthYear = StdioMonthYear;
        nextMonthYear.setMonthYear(nextMonthYearMoment.format('M'), nextMonthYearMoment.format('YYYY'));
        return nextMonthYear;
    }

    getPreviousMonthYear(monthYear) {
        let previousMonthYearMoment = this.getMomentFromMonthYear(monthYear).clone().subtract('1', 'M');
        let previousMonthYear = StdioMonthYear;
        previousMonthYear.setMonthYear(previousMonthYearMoment.format('M'), previousMonthYearMoment.format('YYYY'));
        return previousMonthYear;
    }

    getFirstDateOfMonthYear(monthYear) {
        let date = StdioDate;
        date.setDate(
            1,
            monthYear.month,
            monthYear.year
        );
        return date;
    }

    getLastDateOfMonthYear(monthYear) {
        let date = StdioDate;
        date.setDate(
            this.getMomentFromMonthYear(monthYear).endOf('month').format('Do'),
            monthYear.month,
            monthYear.year
        );
        return date;
    }

    isLastDateOfMonth(date) {
        let monthYear = StdioMonthYear;
        monthYear.setMonthYear(date.month, date.year);
        lastDateOfMonthYear = this.getLastDateOfMonthYear(monthYear);
        return date.day == lastDateOfMonthYear.day;
    }

    isLastLunarDateOfMonth (lunarDate) {
        let date = this.convertLunarToSolar(lunarDate, 7.0);
        let nextDate = StdioDate;
        nextDate.setDate(
            moment(date.day+'/'+date.month+'/'+date.year, 'Do/M/YYYY').clone().add(1, 'days').format('Do'),
            moment(date.day+'/'+date.month+'/'+date.year, 'Do/M/YYYY').clone().add(1, 'days').format('M'),
            moment(date.day+'/'+date.month+'/'+date.year, 'Do/M/YYYY').clone().add(1, 'days').format('YYYY')
        );
        let nextLunarDate = this.convertSolarToLunar(nextDate, 7.0);
        return lunarDate.lunarDay - nextLunarDate.lunarDay > 1
    }

    getFirstDayOfWeekOfMonthYear(monthYear) {
        return this.getFirstDateOfMonthYear(monthYear).format('e');
    }

    jdFromDate(date) {
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

    jdToDate(jd){
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

        let date = StdioDate;
        date.setDate(day, month, year);
        return date
    }

    getNewMoonDay(k, timeZone){
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

    getSunLongitude(jdn, timeZone) {
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

    getLunarMonth11(yy, timeZone) {
        let k, off, nm, sunLong;
        let date = StdioDate;
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

    getLeapMonthOffset(a11, timeZone) {
        let k, last, arc, i;
        k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        last = 0;
        i = 1; // We start with the month following lunar month 11
        arc = this.getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
        do {
            last = arc;
            i++;
            arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
        } while (arc != last && i < 14);
        return i - 1;
    }

    convertSolarToLunar(date, timeZone){
        let k, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap;
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
        let lunarDate = StdioLunarDate;
        lunarDate.setLunarDate(lunarDay, lunarMonth, lunarYear, lunarLeap);
        return lunarDate
    }

    convertLunarToSolar(lunarDate, timeZone) {
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
}

export default (StdioDateHelper = new StdioDateHelper())