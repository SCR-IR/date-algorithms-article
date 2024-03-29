# date-algorithms-article
## مقاله‌ی بررسی و مقایسه‌ی الگوریتم‌های تبدیل تاریخ با ۲ روش متفاوت کبیسه‌بندی
***
در اینجا قصد داریم ۲ نوع روش محاسبه‌ی «کبیسه‌بندی» تاریخ هجری‌شمسی را بررسی و از نظر سرعت الگوریتم، مقایسه‌ی عملی کنیم.

+ یکی الگوریتمی که کبیسه‌بندی‌ها را طبق لحظه‌ی «اعتدال بهاری» محاسبه می‌کند. این روش، از نتایج محاسبات نجومی برای محاسبه‌ی لحظه‌ی اعتدال بهاری بهره می‌گیرد
و داده‌های
[ -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178 ]
را برای کبیسه‌بندی اِعمال می‌کند. البته داده‌های بالا قبلاً از نتایج تحقبقات، محاسبات و الگوریتم‌های نجومی به‌دست آمده‌اند.

+ و دیگری الگوریتم «جلالی»، که از فرمول ۳۳ ساله‌ی ثابت استفاده می‌کند. این روش، بسیار سریع و آسان است و باعث افزایش چندین‌برابری سرعت اجرای نرم‌افزار می‌شود. 

نکته‌ی مهم: الگوریتم‌های «جلالی» و «اعتدالی»، هر دو در بازه‌ی زمانی بین سال‌های ۱۱۷۸ تا ۱۶۳۳ هجری‌شمسی، نتایج دقیقاً برابر دارند. امّا در خارج از این محدوده، امکان عدم تطابق در بعضی سال‌ها وجود دارد.
پس توجّه داشته‌باشیم که نسبت به کاربرد نرم‌افزارها، می‌توانیم الگوریتم دلخواه را انتخاب و استفاده نماییم. اگر نرم‌افزار ما فقط با تاریخ‌های درون بازه‌ی زمانی بین سال‌های ۱۱۷۸ تا ۱۶۳۳ هجری‌شمسی کاربرد دارد، قطعاً الگوریتم «۳۳ ساله‌ی ثابت جلالی» بهتر است و سرعت اجرای بسیار بالاتری دارد. اما در خارج از بازه‌ی زمانی مذکور، باید نسبت به نوع نرم‌افزارمان، یکی از الگوریتم‌ها را انتخاب کنیم.
***
نتایج آزمایش و مقایسه‌ی عملی:
[https://github.com/SCR-IR/date-algorithms-article/tree/main/JavaScript/performance](https://github.com/SCR-IR/date-algorithms-article/tree/main/JavaScript/performance)
***
```javascript

// کبیسه‌بندی جلالی
function isLeap1(year) {
    return ((((year + 12) % 33) % 4) === 1);
}


// کبیسه‌بندی اعتدالی
function isLeap2(jy) {
    var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210
        , 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    var bl = breaks.length
        , jp = breaks[0]
        , jm
        , jump
        , leap
        , n
        , i

    if (jy < jp || jy >= breaks[bl - 1])
        throw new Error('Invalid Jalaali year ' + jy)

    for (i = 1; i < bl; i += 1) {
        jm = breaks[i]
        jump = jm - jp
        if (jy < jm)
            break
        jp = jm
    }
    n = jy - jp

    if (jump - n < 6)
        n = n - jump + div(jump + 4, 33) * 33
    leap = mod(mod(n + 1, 33) - 1, 4)
    if (leap === -1) {
        leap = 4
    }

    return (leap === 0);
}

```
