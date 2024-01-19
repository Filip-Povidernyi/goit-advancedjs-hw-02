import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elems = {
    dateInput: document.querySelector('input#datetime-picker'),
    btnStartTimer: document.querySelector('button[data-start]'),
    timerDelay: 1000,
};

let intervalId = null;
let selectedDate = null;
let currentDate = null;

const calendar = elems.dateInput;
const startBtn = elems.btnStartTimer;
startBtn.disabled = true;

iziToast.info({
    title: 'Hello!',
    message: 'Choose a date and click on start',
    timeout: 8000,
    position: 'topRight',
});

flatpickr(calendar, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            iziToast.error({
                title: 'Error',
                message: 'Ooops...Please, choose a date in the future',
                timeout: 8000,
                position: 'topRight',
            });
        } else {
            iziToast.success({
                title: 'Next',
                message: 'Click on start!',
                timeout: 8000,
                position: 'topRight',
            });
            startBtn.disabled = false;
            const setTimer = () => {
                selectedDate = selectedDates[0].getTime();
                timer.start();
            };

            startBtn.addEventListener('click', setTimer);
        }
    },
});
const timer = {
    rootSelector: document.querySelector('.timer'),
    start() {
        intervalId = setInterval(() => {
            startBtn.disabled = true;
            calendar.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;

            if (delta <= 0) {
                this.stop();
                iziToast.success({
                    title: 'Congratulation!',
                    message: 'Timer stopped! If you want to start timer, choose a date and click on start or reload this page',
                    timeout: 8000,
                    position: 'center',
                });
                return;
            }
            const { days, hours, minutes, seconds } = this.convertMs(delta);
            this.rootSelector.querySelector('[data-days]').textContent =
                this.addLeadingZero(days);
            this.rootSelector.querySelector('[data-hours]').textContent =
                this.addLeadingZero(hours);
            this.rootSelector.querySelector('[data-minutes]').textContent =
                this.addLeadingZero(minutes);
            this.rootSelector.querySelector('[data-seconds]').textContent =
                this.addLeadingZero(seconds);
        }, elems.timerDelay);
    },

    stop() {
        clearInterval(intervalId);
        this.intervalId = null;
        startBtn.disabled = true;
        calendar.disabled = false;
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(
            Math.floor(((ms % day) % hour) / minute)
        );
        const seconds = this.addLeadingZero(
            Math.floor((((ms % day) % hour) % minute) / second)
        );

        return { days, hours, minutes, seconds };
    },

    addLeadingZero(value) {
        return String(value).padStart(2, 0);
    },
};