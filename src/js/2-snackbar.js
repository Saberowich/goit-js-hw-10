import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(evt) {
    evt.preventDefault();

    const delay = form.delay.value;
    const state = form.state.value;

    const promise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
            setTimeout(() => resolve(delay), delay);
        } else if (state === 'rejected') {
            setTimeout(() => reject(delay), delay);
        }
    }); 

    promise.then((delay) => {
    iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
    });
})
    .catch((delay) => {
    iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
    });
    })
}
    form.addEventListener('submit', createPromise);