import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elems = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name = delay]'),
  step: document.querySelector('[name = step]'),
  amount: document.querySelector('[name = amount]'),
  submitBtn: document.querySelector
};

elems.form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();

  let valueDelay = Number(elems.delay.value);
  let step = Number(elems.step.value);
  let amount = Number(elems.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    let promiseDelay
    if (i === 1) {
      promiseDelay = valueDelay;
    } else {
      promiseDelay = valueDelay + step * (i - 1);
    }

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        iziToast.info({
          title: '✅',
          message: `Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: '❌',
          message: `Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      });
    e.currentTarget.reset();
  }
}
