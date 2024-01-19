let bgColorChange = null;
let btnColorChange = null;

const elems = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

elems.btnStop.disabled = true;
elems.btnStart.addEventListener('click', onBtnStartChangeColor);
elems.btnStop.addEventListener('click', onBtnStopChangeColor);


function onBtnStartChangeColor() {
    elems.btnStart.disabled = true;
    elems.btnStop.disabled = false;
    btnColorChange = setInterval(() => {
        elems.btnStop.style.backgroundColor = getRandomHexColor()
    }, 1000);

    bgColorChange = setInterval(() => {
        elems.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
}

function onBtnStopChangeColor() {
    elems.btnStart.disabled = false;
    elems.btnStop.disabled = true;


    clearInterval(bgColorChange);
    clearInterval(btnColorChange);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
