window.onload = function load() {
    const timezone_indicator = document.getElementById('timezone-indicator');
    updateTimezone(timezone_indicator)
}

function getLastSunday(year, month) {
    const lastDay = new Date(year, month + 1, 0); // Last day of the month
    const dayOfWeek = lastDay.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
    const lastSunday = lastDay.getDate() - dayOfWeek; // Calculate the last Sunday
    return new Date(year, month, lastSunday);
}

function isDST(date) {
    const year = date.getFullYear();
    const startDST = getLastSunday(year, 2); // March
    const endDST = getLastSunday(year, 9); // October
    return date >= startDST && date < endDST;
}

function updateTimezone(timezone_indicator) {
    const now = new Date();
    const offset = isDST(now) ? 2 : 1;
    const timezone = `GMT+${offset}`;
    timezone_indicator.innerHTML = timezone + " (Amsterdam)";
}

// function update_timezone(timezone_indicator) {
//     fetch('https://www.timeapi.io/api/TimeZone/zone?timeZone=Europe/Amsterdam')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// }