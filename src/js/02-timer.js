import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker")
const btnStart = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");



const date = new Date;
let timerId = null;

//btnStart.setAttribute("disabled", true);

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < date) {
            Notiflix.Notify.warning("Please choose a date in the future")
        }

        if (selectedDates[0] > date) {
            btnStart.removeAttribute("disabled", true);
        }

        let timeLeft = selectedDates[0].getTime()

        function onClick() {
            timerId = setInterval(() => {
                const { days, hours, minutes, seconds } = convertMs(timeLeft - Date.now())
                daysValue.textContent = days;
                hoursValue.textContent = hours;
                minutesValue.textContent = minutes;
                secondsValue.textContent = seconds;

                if (Number(daysValue.textContent) === 0 && Number(hoursValue.textContent) === 0 && Number(minutesValue.textContent) === 0 && Number(secondsValue.textContent) === 0) {
                    clearInterval(timerId)
                }
            }, 1000)


        }

        btnStart.addEventListener('click', onClick)
    }
})







function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}