

const { toJalaali, toGregorian } = require('./shamsi');
const { gregorian_to_jalali, jalali_to_gregorian } = require('./jalali');

/* es6: */
// import { toJalaali, toGregorian } from './shamsi.js';
// import { gregorian_to_jalali, jalali_to_gregorian } from'./jalali.js';


function bench(func, convertType, title = "", range = 3000, loop = 5) {
    let yearsRange, mDays, time = 0, count = 0;
    if (convertType === "g2j") {
        yearsRange = { start: 623, end: range + 622 };
        mDays = [0, 31, 28/**/, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
        yearsRange = { start: 1, end: range };
        mDays = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29/**/];
    }

    for (let i = 0; i < loop; i++) {
        let t = Date.now();
        for (let y = yearsRange.start; y <= yearsRange.end; y++) {
            for (let m = 1; m <= 12; m++) {
                for (let d = 1; d <= mDays[m]; d++) {
                    count++;
                    func(y, m, d);
                }
            }
        }
        time += Date.now() - t;
    }
    
    console.log(time, ':' + title + ', ' + count);
}

bench(toJalaali, 'g2j', "toJalaali(), Shamsi Algorithm");
bench(gregorian_to_jalali, 'g2j', "gregorian_to_jalali(), Jalali/33y Algorithm");
console.log('--------------------');
bench(toGregorian, 'j2g', "toGregorian(), Shamsi Algorithm");
bench(jalali_to_gregorian, 'j2g', "jalali_to_gregorian(), Jalali/33y Algorithm");


