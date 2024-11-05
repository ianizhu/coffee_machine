let money = document.getElementById('money');
let display = document.getElementById('display');
let banknotes = document.querySelectorAll("img[src$='rub.jpg']");
let slot = document.querySelector("img[src$='acc.png']");
let displayInfo = document.getElementById('displayInfo');
let balance = document.getElementById('balance');
let changeBtn = document.getElementById('changeBtn');
let changeBox = document.getElementById('changeBox');
let changeCoins = document.getElementById('changeBox').children;
let liquidAnimation = document.getElementById('liquidAnimation');

for(let banknote of banknotes){
    banknote.onmousedown = function(event) {

    banknote.style.position = 'absolute';
    banknote.style.zIndex = 1000;
    banknote.style.width = '15rem'
    banknote.style.transform = "rotate(90deg)";
    banknote = event.currentTarget;
    document.body.appendChild(banknote);

    document.addEventListener('mousemove', moveElement);
    banknote.onmouseup = function() {
        document.removeEventListener('mousemove', moveElement);
        banknote.style.zIndex = 1;

        let banknote_top = banknote.getBoundingClientRect().top;
        let banknote_left = banknote.getBoundingClientRect().left;
        let banknote_right = banknote.getBoundingClientRect().right;

        let slot_top = slot.getBoundingClientRect().top + 20;
        let slot_left = slot.getBoundingClientRect().left + 10;
        let slot_right = slot.getBoundingClientRect().right;
        let slot_bottom = slot.getBoundingClientRect().bottom - - (slot.getBoundingClientRect().height / 3) * 2;

        if (banknote_top > slot_top && 
            banknote_left > slot_left && 
            banknote_right < slot_right &&
            banknote_top < slot_bottom) {
                money.value = +money.value + +banknote.dataset.banknoteValue;
                balance.innerHTML = `Баланс: ${money.value} <i class="fa-solid fa-ruble-sign"></i>`;
                changeBtn.removeAttribute('disabled');
                banknote.classList.add('animated');
                    setTimeout(function() {
                        banknote.hidden = true;
                    }, 290);
        }
    };

    function moveElement(e) {
        let x = e.clientX - 120;
        let y = e.clientY - 40;
        banknote.style.top = y + "px";
        banknote.style.left = x + "px"
        };

    }
    banknote.ondragstart = function() {
        return false;
    };
};

function getCoffee(price, name) {
    if(money.value >= price){
        money.value -= price;
        balance.innerHTML = `Баланс: ${money.value} <i class="fa-solid fa-ruble-sign"></i>`
        changeBtn.removeAttribute('disabled');
        startProgressBar(name);
        liquidAnimation.classList.add('liquid_animation');
    } else {
        displayInfo.innerHTML = `<i class="fa-regular fa-face-frown"></i> Не хватает денег на ${name}`;
    }
}

function startProgressBar(coffeeName) {
    let i = 0;
    let progressBar = document.querySelector('.progress-bar');
    progressBar.parentElement.hidden = false;

function progress() {
    i++;
    progressBar.style.width = i + '%';

    if (i == 100) {
        clearInterval(timerId);
        displayInfo.innerHTML =`Ваш ${coffeeName} готов <i class="fa-regular fa-face-smile-beam"></i>`;
        liquidAnimation.classList.remove('liquid_animation');
        progressBar.parentElement.hidden = true;
        progressBar.style.width = 0 + '%';
    }
}
    let timerId = setInterval(progress, 100);
    displayInfo.innerHTML =`Подождите, ${coffeeName} готовится <i class="fa-regular fa-hourglass-half"></i>`
}

function getChange(num) {
    let coin;
    let top = getRandom(0, changeBox.getBoundingClientRect().height - 35);
    let left = getRandom(0, changeBox.getBoundingClientRect().width - 35);
    if (num >= 10) coin = 10;
    else if (num >= 5) coin = 5;
    else if (num >= 2) coin = 2;
    else if (num >= 1) coin = 1;
    console.log(coin);
    changeBox.innerHTML += `<img src="images/${coin}rub.png" style="top:${top}px; left:${left}px">`;
    balance.innerHTML = `Баланс: ${money.value = 0} <i class="fa-solid fa-ruble-sign"></i>`; 
    if (num - coin !== 0) {
        getChange(num - coin);
        for (let i = 0; i <= changeCoins.length; i++) {
            changeCoins[i].onclick = function() { 
                this.style.display = 'none';
            }
        }
    } else {
        changeBtn.setAttribute('disabled', '');
    }
    
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
