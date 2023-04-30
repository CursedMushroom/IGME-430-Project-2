const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let flowers = 0;
let petalpersec = 1;

let buttonMush = 1;
let benMush = 0;
let morelMush = 0;
let inkMush = 0;
let bridalMush = 0;

const flowerTimer = () => {
    flowers += petalpersec;
    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;

};

const updateGameInfo = () => {

    console.log('update game info');
    helper.sendPost('/updateGameInfo', {
        flowers,//currency
        petalpersec,//currencypersec
        buttonMush,//button mushroom amount
        benMush,//ben mushroom amount
        morelMush,//morel mushroom amount
        inkMush,//ink mushroom amount
        bridalMush,//bridal mushroom amount
    });



}

const buyMushroom = (price, mushroom) => {
    if (flowers >= price) {
        document.getElementById('flowerError').classList.add('hidden');
        if (mushroom === 'buttonMush') {
            flowers -= price;
            petalpersec += 1;
            buttonMush++;
        }
        if (mushroom === 'benMush') {
            flowers -= price;
            petalpersec += 2;
            benMush++;
        }
        if (mushroom === 'morelMush') {
            flowers -= price;
            petalpersec += 3;
            morelMush++;
        }
        if (mushroom === 'inkMush') {
            flowers -= price;
            petalpersec += 4;
            inkMush++;
        }
        if (mushroom === 'bridalMush') {
            flowers -= price;
            petalpersec += 5;
            bridalMush++;
        }

        document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;
        document.querySelector('#button-have').innerHTML = `Have: ${buttonMush}`;

    }
    else {
        document.getElementById('flowerError').classList.remove('hidden');
        setTimeout(function () {
            document.getElementById('flowerError').classList.add('hidden');
        }, 2000);
    }
}


const settingPopUp = () => {
    document.querySelector('#settings').classList.toggle('active');

}

const removeAds = () => {
    // helper.sendPost('/updateAds', false);
    document.getElementById('ad-space').style.display = 'none';
    document.querySelector('#shop-area').style.height = '80%';
}

const loadGameData = async () => {
    const response = await fetch('/loadGameData');
    const data = await response.json();
    flowers = data.info.currency;
    console.log(data.info);

    if (data.info.hasAds === false) {
        console.log('remove ads');
        removeAds();
    }


    console.log(flowers);
    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${data.info.currency}`;
}


const init = () => {
    document.querySelector('#setting-button').addEventListener('click', settingPopUp);
    document.querySelector('#closepopup').addEventListener('click', settingPopUp);
    document.querySelector('#buy-mushroom1').addEventListener('click', () => buyMushroom(10, 'buttonMush'));
    document.getElementById('flowerError').classList.add('hidden');
    document.querySelector('#remove-ads').addEventListener('click', removeAds);


    setInterval(flowerTimer, 5000);
    setInterval(updateGameInfo, 6000);

    loadGameData();
}

window.onload = init;