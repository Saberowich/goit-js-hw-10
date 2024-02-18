import flatpickr from "flatpickr";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('input');
const btn = document.querySelector('button');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');



let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        title: 'Please',
        message: 'choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  },
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


flatpickr(input, options);



const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = userSelectedDate;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);
      spanDays.textContent = time.days;
      spanHours.textContent = time.hours;
      spanMinutes.textContent = time.minutes;
      spanSeconds.textContent = time.seconds;
    }, 1000);
  },
  stop() {
    if (deltaTime <= 0) {
      clearInterval(this.intervalId);
    this.isActive = false;
    }
  }
};




btn.addEventListener('click', () => {
  timer.start();
});