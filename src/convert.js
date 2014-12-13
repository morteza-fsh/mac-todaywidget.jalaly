var grgSumOfDays=Array(Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365),Array(0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366));
var hshSumOfDays=Array(Array(0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 365), Array(0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366));

function toShamsi(grgYear,grgMonth,grgDay,Format) {

  var hshYear = grgYear-621;
  var hshMonth,hshDay;
  
  var grgLeap=grgIsLeap (grgYear);
  var hshLeap=hshIsLeap (hshYear-1);
  
  var hshElapsed;
  var grgElapsed = grgSumOfDays[(grgLeap ? 1:0)][grgMonth-1]+grgDay;

  var XmasToNorooz = (hshLeap && grgLeap) ? 80 : 79;

  if (grgElapsed <= XmasToNorooz) {
    hshElapsed = grgElapsed+286;
    hshYear--;
    if (hshLeap && !grgLeap)
      hshElapsed++;
  } else {
    hshElapsed = grgElapsed - XmasToNorooz;
    hshLeap = hshIsLeap (hshYear);
  }

  for (var i=1; i <= 12 ; i++) {

    if (hshSumOfDays [(hshLeap ? 1:0)][i] >= hshElapsed){
      hshMonth = i;
      hshDay = hshElapsed - hshSumOfDays [(hshLeap ? 1:0)][i-1];
      break;
    }
  }

  if ( Format=="Long" ){
    return hshDayName (hshDayOfWeek(hshYear,hshMonth,hshDay)) + "  " + hshDay + " " + calNames("hf", hshMonth-1) + " " + hshYear;
  } else {
    return {jy:hshYear, jm:hshMonth, jd:hshDay};
  }
}


function toGregorian (hshYear, hshMonth, hshDay) {

  var grgYear = hshYear+621;
  var grgMonth,grgDay;

  var hshLeap=hshIsLeap (hshYear);
  var grgLeap=grgIsLeap (grgYear);

  var hshElapsed=hshSumOfDays [hshLeap ? 1:0][hshMonth-1]+hshDay;
  var grgElapsed;

  if (hshMonth > 10 || (hshMonth == 10 && hshElapsed > 286+(grgLeap ? 1:0))) {
    grgElapsed = hshElapsed - (286 + (grgLeap ? 1:0));
    grgLeap = grgIsLeap (++grgYear);
  } else {
    hshLeap = hshIsLeap (hshYear-1);
    grgElapsed = hshElapsed + 79 + (hshLeap ? 1:0) - (grgIsLeap(grgYear-1) ? 1:0);
  }

  for (var i=1; i <= 12; i++) {
    if (grgSumOfDays [grgLeap ? 1:0][i] >= grgElapsed) {
      grgMonth = i;
      grgDay = grgElapsed - grgSumOfDays [grgLeap ? 1:0][i-1];
      break;
    }
  }

  return {gy:grgYear,gm:grgMonth, gd:grgDay};
}

function grgIsLeap (Year) {
  return ((Year%4) == 0 && ((Year%100) != 0 || (Year%400) == 0));
}

function hshIsLeap (Year) {
  Year = (Year - 474) % 128;
  Year = ((Year >= 30) ? 0 : 29) + Year;
  Year = Year - Math.floor(Year/33) - 1;
  return ((Year % 4) == 0);
}


function hshDayOfWeek(hshYear, hshMonth, hshDay) {
  var value;
  value = hshYear - 1376 + hshSumOfDays[0][hshMonth-1] + hshDay - 1;

  for (var i=1380; i<hshYear; i++)
    if (hshIsLeap(i)) value++;
  for (var i=hshYear; i<1380; i++)
    if (hshIsLeap(i)) value--;

  value=value%7;
  if (value<0) value=value+7;

  return (value);
}

function hshDayName(DayOfWeek) {
  return calNames("df", DayOfWeek%7);
}

function calNames(calendarName, monthNo) {
  switch (calendarName){
    case "hf": return Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند")[monthNo];
    case "ge": return Array(" January ", " February ", " March ", " April ", " May ", " June ", " July ", " August ", " September ", " October ", " November ", " December ")[monthNo];
    case "gf": return Array("ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوثن", "ژوییه", "اوت", "سپتامبر", "اكتبر", "نوامبر", "دسامبر")[monthNo];
    case "df": return Array("شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه")[monthNo];
    case "de": return Array("Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday")[monthNo];
  }
}
