let showNavElem;
let hideNavElem;
let navElem;

function init() {
    showNavElem = document.getElementById("show-navigation");
    navElem = document.getElementById("navigation");
    hideNavElem = document.getElementById("hide-navigation");
    showNavElem.addEventListener("click", showNav);
    hideNavElem.addEventListener("click", hideNav);

    if (screen.width < 900) {
        navElem.style.right = "-100%";
    }
}
window.onload = init();

function showNav() {
    navElem.style.right = "0";
}

function hideNav() {
    navElem.style.right = "-100%";
}