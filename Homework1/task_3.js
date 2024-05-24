/*Create a function drawCalendar , which gets two parameters - year, month and
returns a string with real calendar month for the year, example (use template
strings ``, spaces and symbol "\n" to beautify view):*/

function daysInMonth(month, year)
{
    let d = new Date(year, month, 0);
    return d.getDate();
}

const drawCalendar = (year, month) => {
    console.log('Mo Tu We Th Fr Sa Su');

    let d = new Date(year, month-1, 0);
    let days = daysInMonth(month, year);
    let dayOfWeek = d.getDay();
    let str = "";
    for(let i = 0; i < dayOfWeek; i++) str += "   ";
    for(let i = 1; i < 10; i++, dayOfWeek++){
        if(dayOfWeek === 7){
            console.log(str);
            dayOfWeek = 0;
            str = "";
        }
        str += `${i}  `;
    }
    for(let i = 10; i <= days; i++, dayOfWeek++){
        if(dayOfWeek === 7){
            console.log(str);
            dayOfWeek = 0;
            str = "";
        }
        str += `${i} `;
    }
    console.log(str);
}

drawCalendar(2024, 5); //May 2024
drawCalendar(2024, 2); //February 2024