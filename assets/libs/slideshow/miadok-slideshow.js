const blockTimerCount = 1000;
const slideTimerCount = 5000;

document.addEventListener('DOMContentLoaded', init, false);

function init() {

    const slideshows = document.getElementsByClassName("miadok-slideshow-container");

    for (const slideshow of slideshows) {
        const count = slideshow.childElementCount;
        const selected = slideshow.getElementsByClassName("selected")[0];
        const index = Array.prototype.indexOf.call(slideshow.children, selected);

        const pagination = document.createElement("div");
        pagination.classList.add("pagination");

        for (let i = 0; i < count; i ++) {
            const option = document.createElement("div");
            option.classList.add("paginate-option");
            if (i == index) {
                option.classList.add("selected");
            }
            option.addEventListener("click", optionClick);
            pagination.appendChild(option);
        }

        slideshow.appendChild(pagination);

        var timerId = setTimeout(
            function() {
                nextSlide(pagination);
            }, slideTimerCount
        );
        slideshow.setAttribute("timerId", timerId);
    }
}

let block = false;

function optionClick(event) {
    if (block) return;

    const newOption = event.currentTarget;

    if (newOption.classList.contains("selected")) {
        return
    }

    const pagination = newOption.parentNode;
    const count = pagination.childElementCount;
    const slideshow = pagination.parentNode;

    const oldTimerId = slideshow.getAttribute("timerId");
    clearTimeout(oldTimerId);

    const newIndex = Array.prototype.indexOf.call(pagination.children, newOption);
    const newSelected = slideshow.children[newIndex];

    const option = pagination.getElementsByClassName("selected")[0];
    const index = Array.prototype.indexOf.call(pagination.children, option);
    const selected = slideshow.children[index];

    const leftToRightAnim = () => {
        selected.style.animationName = "slideToLeft";
        newSelected.style.animationName = "slideFromRight";
    }

    const rightToLeftAnim = () => {
        selected.style.animationName = "slideToRight";
        newSelected.style.animationName = "slideFromLeft";  
    }

    if (newIndex == 0 && index == count-1) {
        leftToRightAnim();
    } else if (newIndex == count-1 && index == 0) {
        rightToLeftAnim();
    } else if (newIndex > index) {
        leftToRightAnim();
    } else {
        rightToLeftAnim();
    }
    
    selected.classList.remove("selected");
    newSelected.classList.add("selected");
    option.classList.remove("selected");
    newOption.classList.add("selected");

    block = true;
    setTimeout(() => {block = false}, blockTimerCount);

    var timerId = setTimeout(
        function() {
            nextSlide(pagination);
        }, slideTimerCount
    );
    slideshow.setAttribute("timerId", timerId);
}

function nextSlide(pagination) {
    const count = pagination.childElementCount;
    const option = pagination.getElementsByClassName("selected")[0];
    const index = Array.prototype.indexOf.call(pagination.children, option);

    const nextIndex = (index + 1) % count;
    const nextOption = pagination.children[nextIndex];
    nextOption.click();
}