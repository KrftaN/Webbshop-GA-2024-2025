let buttonDecreaseElem;
let amountCounterElem;
let buttonIncreaseElem;

let productButtonDecreaseElem;
let productButtonIncreaseElem;
let productAmounCounterElem;

function init() {
    buttonDecreaseElem = document.getElementsByClassName("sc-button--");
    buttonIncreaseElem = document.getElementsByClassName("sc-button-+");
    amountCounterElem = document.getElementsByClassName("sc-amount-counter");

    productAmounCounterElem = document.getElementById("amount-counter");
    productButtonDecreaseElem = document.getElementById("button--");
    productButtonIncreaseElem = document.getElementById("button-+");

    Array.from(buttonDecreaseElem).forEach(elem => { elem.addEventListener("click", changeAmount) });
    Array.from(buttonIncreaseElem).forEach(elem => { elem.addEventListener("click", changeAmount) });

    productButtonDecreaseElem.addEventListener("click", productChangeAmount);
    productButtonIncreaseElem.addEventListener("click", productChangeAmount);
}
window.onload = init();

function changeAmount() {
    let form = this.form.className;
    let name = this.innerHTML;
    let amountCounter = document.querySelectorAll(`.${form} .sc-amount-counter`);
    let value = +amountCounter[0].innerHTML;

    value = (name == "+") ? value+= 1 : value-= 1;
    
    if(value == 0) return;

    amountCounter.forEach(elem => { elem.innerHTML = value });
}

function productChangeAmount() {
    let name = this.innerHTML;
    let value = +productAmounCounterElem.innerHTML;

    value = (name == "+") ? value+= 1 : value-= 1;

    if(value == 0) return;

    productAmounCounterElem.innerHTML = value;
}