var numberOfDaysInMonth = [31,31,31,31,31,31, 
						   30,30,30,30,30,29];
function generateMonthTable (jy, jm, jd) {

	var firstDayOfMonth = hshDayOfWeek(jy,jm,1);

	// number of days in month
	var days = ( jm === 12 && hshIsLeap(jy) ? 30 : numberOfDaysInMonth[jm - 1]),
		i = 0,
		table = [];

	for ( var row = 0; row < 5; row++ ) {
		table[row] = [];
		for ( var col = (row === 0 ? firstDayOfMonth : 0); col < 7; col++ ) {
			table[row][col] = ++i;
			if (i >= days) {
				break;
			}
		}
	}

	return table;
}

function renderTable(table, today) {
	var str = '', d, sp = '  ';

	console.log('\x1b[1m');
	console.log('Sh'+sp+'Ye'+sp+'Do'+sp+'Se'+sp+'Ch'+sp+'Pa'+sp+'Jo');
	console.log('──────────────────────────');

	for ( var r = 0; r < 5; r++ ) {
		str = '';
		for (var c = 0; c < 7; c++){
			d = table[r][c];

			if ( d ) {
				if ( d === today ) {
					d = '\x1b[34m' + d + '\x1b[0m\x1b[1m';
				}
				str += (c === 0 ? '' : sp )+ (d < 10 ? ' '+d : d ) ;
			} else {
				str += (c === 0 ? '  ' : sp+'  ' );
			}

		}
		console.log(str);
		console.log(' ');
	}

	console.log('\x1b[0m');
}


var today = new Date(),
	y = today.getFullYear(),
	m = today.getMonth() + 1,
	d = today.getDate(),
	j = toShamsi(y,m,d),
	jy = j.jy,
	jm = j.jm,
	jd = j.jd;

var jmonths = ['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'];
console.log(String(' \n'+jd + ' ' + jmonths[jm-1] + ' ' + jy + '\n'));
renderTable(generateMonthTable(jy,jm,jd), jd)