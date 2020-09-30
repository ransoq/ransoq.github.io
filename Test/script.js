const btn = document.querySelector('.btn'),
      elem = document.querySelector('.box');

let pos = 0;
let secPos = 300;

function myAnimation() {
    pos++;
    elem.style.top = pos + "px";
    elem.style.left = pos + "px";

    if (pos < 300) {
        requestAnimationFrame(myAnimation);
    }
}

function mySecAnimation() {
    secPos--;
    elem.style.top = secPos - "px";
    elem.style.left = secPos - "px";

    if (pos === 300) {
        requestAnimationFrame(mySecAnimation);   
    }
}

btn.addEventListener('click', () => requestAnimationFrame(myAnimation));
btn.addEventListener('click', () => requestAnimationFrame(mySecAnimation));