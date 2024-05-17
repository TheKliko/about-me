document.addEventListener("DOMContentLoaded", function() {
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

    function updateTimezone() {
        const now = new Date();
        const offset = isDST(now) ? 2 : 1;
        const timezone = `GMT+${offset}`;
        document.getElementById('timezone').textContent = timezone + " (Amsterdam)";
    }

    updateTimezone();
});
