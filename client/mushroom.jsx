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
    let gameScreen = document.querySelector('#game-screen');
    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;

    if (flowers < 20) {

        gameScreen.src = "/assets/img/background.jpg";

    }
    if (flowers >= 20 && flowers < 120) {
        gameScreen.src = "/assets/img/80fl.jpg";

    }
    if (flowers >= 120 && flowers < 180) {
        gameScreen.src = "/assets/img/120fl.jpg";
    }
    if (flowers >= 180 && flowers < 210) {
        gameScreen.src = "/assets/img/180fl.jpg";
    }
    if (flowers >= 210 && flowers < 280) {

        gameScreen.src = "/assets/img/210.jpg";
    }
    if (flowers >= 280 && flowers < 320) {

        gameScreen.src = "/assets/img/280fl.jpg";
    }
    if (flowers >= 320 && flowers < 400) {

        gameScreen.src = "/assets/img/320fl.jpg";
    }
    if (flowers >= 400 && flowers < 450) {

        gameScreen.src = "/assets/img/400fl.jpg";
    }
    if (flowers >= 450 && flowers < 480) {

        gameScreen.src = "/assets/img/450fl.jpg";
    }
    if (flowers >= 480 && flowers < 500) {

        gameScreen.src = "/assets/img/480fl.jpg";
    }
    if (flowers >= 500 && flowers < 520) {

        gameScreen.src = "/assets/img/500fl.jpg";
    }
    if (flowers >= 520 && flowers < 580) {

        gameScreen.src = "/assets/img/520fl.jpg";
    }
    if (flowers >= 580 && flowers < 620) {

        gameScreen.src = "/assets/img/580fl.jpg";
    }
    if (flowers >= 620 && flowers < 680) {

        gameScreen.src = "/assets/img/620fl.jpg";
    }
    if (flowers >= 680 && flowers < 800) {

        gameScreen.src = "/assets/img/680fl.jpg";
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
};
const passChange = () => {
    document.querySelector('#change-pass').classList.toggle('active');
}

const changePass = (e) => {
    let newPass = document.querySelector('#confirm-password').value;
    if (document.querySelector('#new-password').value === document.querySelector('#confirm-password').value) {
        console.log('passwords match');
        helper.sendPost('/changePassword', { newPass });
    }
}

const removeAds = () => {
    helper.sendPost('/updateAds', { ads: false });
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

    flowerTimer();




}

const init = () => {
    document.querySelector('#setting-button').addEventListener('click', settingsPopup);
    document.querySelector('#closepopup').addEventListener('click', settingsPopup);

    document.querySelector('#change-password-pop').addEventListener('click', passChange);
    document.querySelector('#settings-closepopup').addEventListener('click', passChange);

    document.querySelector('#change-password').addEventListener('click', changePass);

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










