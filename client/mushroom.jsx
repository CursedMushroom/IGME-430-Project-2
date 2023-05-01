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



    //change game-screen background image depeneding on amount of flowers
    if (flowers < 80) {
        document.querySelector("#game-screen").style.background = "url('img/background.jpg') no-repeat cover";

    }
    if (flowers >= 80 && flowers < 120) {
        document.querySelector("#game-screen").style.background = "url('img/80fl.jpg') no-repeat cover";
     
    }
    if (flowers >= 120 && flowers < 180) {
        document.querySelector("#game-screen").style.background = "url('img/120fl.jpg') no-repeat cover";
    }
    if (flowers >= 180 && flowers < 210) {
        document.querySelector("#game-screen").style.background = "url('img/180fl.jpg') no-repeat cover";
    }
    if (flowers >= 210 && flowers < 280) {

        document.querySelector("#game-screen").style.background = "url('img/210.jpg') no-repeat cover";
    }
    if (flowers >= 280 && flowers < 320) {

        document.querySelector("#game-screen").style.background = "url('img/280fl.jpg') no-repeat cover";
    }
    if (flowers >= 320 && flowers < 400) {

        document.querySelector("#game-screen").style.background = "url('img/320fl.jpg') no-repeat cover";
    }
    if (flowers >= 400 && flowers < 450) {

        document.querySelector("#game-screen").style.background = "url('img/400fl.jpg') no-repeat cover";
    }
    if (flowers >= 450 && flowers < 480) {

        document.querySelector("#game-screen").style.background = "url('img/450fl.jpg') no-repeat cover";
    }
    if (flowers >= 480 && flowers < 500) {

        document.querySelector("#game-screen").style.background = "url('img/480fl.jpg') no-repeat cover";
    }
    if (flowers >= 500 && flowers < 520) {

        document.querySelector("#game-screen").style.background = "url('img/500fl.jpg') no-repeat cover";
    }
    if (flowers >= 520 && flowers < 580) {

        document.querySelector("#game-screen").style.background = "url('img/520fl.jpg') no-repeat cover";
    }
    if (flowers >= 580 && flowers < 620) {

        document.querySelector("#game-screen").style.background = "url('img/580fl.jpg') no-repeat cover";
    }
    if (flowers >= 620 && flowers < 680) {

        document.querySelector("#game-screen").style.background = "url('img/620fl.jpg') no-repeat cover";
    }
    if (flowers >= 680 && flowers < 800) {

        document.querySelector("#game-screen").style.background = "url('img/680fl.jpg') no-repeat cover";
    }
    if (flowers >= 800) {

        document.querySelector("#game-screen").style.background = "url(img/800fl.jpg) no-repeat cover";
    }



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
            document.querySelector('#button-have').innerHTML = `Have: ${buttonMush}`;

        }
        if (mushroom === 'benMush') {
            flowers -= price;
            petalpersec += 100;
            benMush++;
            document.querySelector('#ben-have').innerHTML = `Have: ${benMush}`;
        }
        if (mushroom === 'morelMush') {
            flowers -= price;
            petalpersec += 15;
            morelMush++;
            document.querySelector('#marelle-have').innerHTML = `Have: ${morelMush}`;
        }
        if (mushroom === 'inkMush') {
            flowers -= price;
            petalpersec += 8;
            inkMush++;
            document.querySelector('#myco-have').innerHTML = `Have: ${inkMush}`;
        }
        if (mushroom === 'bridalMush') {
            flowers -= price;
            petalpersec += 30;
            bridalMush++;
            document.querySelector('#bridei-have').innerHTML = `Have: ${bridalMush}`;
        }

        document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;


    }
    else {
        document.getElementById('flowerError').classList.remove('hidden');
        setTimeout(function () {
            document.getElementById('flowerError').classList.add('hidden');
        }, 2000);
    }
}

const settingsPopup = () => {
    document.querySelector('#settings').classList.toggle('active');
    clearAddFields();
};
const passChange = () => {
    document.querySelector('#change-pass').classList.toggle('active');
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
    };
    petalpersec = data.info.currencyPerSecond;

    buttonMush = data.info.buttonMushrooms;
    benMush = data.info.benMushrooms;
    morelMush = data.info.marelleMushrooms;
    inkMush = data.info.mycoMushrooms;
    bridalMush = data.info.brideiMushrooms;

    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${data.info.currency}`;

    document.querySelector('#button-have').innerHTML = `Have: ${buttonMush}`;
    document.querySelector('#ben-have').innerHTML = `Have: ${benMush}`;
    document.querySelector('#marelle-have').innerHTML = `Have: ${morelMush}`;
    document.querySelector('#myco-have').innerHTML = `Have: ${inkMush}`;
    document.querySelector('#bridei-have').innerHTML = `Have: ${bridalMush}`;




}









const init = () => {
    document.querySelector('#setting-button').addEventListener('click', settingsPopup);
    document.querySelector('#closepopup').addEventListener('click', settingsPopup);

    // document.querySelector('#change-password').addEventListener('click', passChange);
    document.querySelector('#settings-closepopup').addEventListener('click', passChange);

    document.querySelector('#buy-mushroom1').addEventListener('click', () => buyMushroom(10, 'buttonMush'));
    document.querySelector('#buy-mushroom2').addEventListener('click', () => buyMushroom(80, 'inkMush'));
    document.querySelector('#buy-mushroom3').addEventListener('click', () => buyMushroom(300, 'morelMush'));
    document.querySelector('#buy-mushroom4').addEventListener('click', () => buyMushroom(500, 'bridalMush'));
    document.querySelector('#buy-mushroom5').addEventListener('click', () => buyMushroom(1000, 'benMush'));


    document.querySelector('#save-game').addEventListener('click', () => updateGameInfo());
    document.getElementById('flowerError').classList.add('hidden');
    document.querySelector('#remove-ads').addEventListener('click', removeAds);



    setInterval(flowerTimer, 5000);
    setInterval(updateGameInfo, 6000);

    loadGameData();




}

window.onload = init;










