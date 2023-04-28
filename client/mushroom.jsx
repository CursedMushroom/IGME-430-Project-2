const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let flowers = 0;
let petalpersec = 1;

let totalMushroom = 1;
// let totalMushroom2 = 0;
// let totalMushroom3 = 0;
// let totalMushroom4 = 0;
// let totalMushroom5 = 0;

const flowerTimer = () => {
    flowers += petalpersec;
    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;

};

const updateGameInfo = () => {
    //update curreny in server
    //update petalpersec in server
    //update totalMushrooms in server
    console.log('update game info');
    helper.sendPost('/updateGameInfo', { flowers, petalpersec, totalMushroom });
    

}

const buyMushroom = (price) => {
    if (flowers >= price) {
        document.getElementById('flowerError').classList.add('hidden');
        flowers -= price;
        petalpersec++;
        totalMushroom++;
        document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;
        document.querySelector('#have').innerHTML = `Have: ${totalMushroom}`;
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
    document.querySelector('#ad-space').classList.add('hidden');
    document.querySelector('#shop-area').style.height = '90%';
}

const loadGameData = async () => {
    const response = await fetch('/loadGameData');
    const data = await response.json();
    flowers = data.info.currency;
    console.log(data.info);

    if(data.info.hasAds === false){
        console.log('remove ads');
        removeAds();
    }


    console.log(flowers);
    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${data.info.currency}`;
}


const init = () => {
    document.querySelector('#setting-button').addEventListener('click', settingPopUp);
    document.querySelector('#closepopup').addEventListener('click', settingPopUp);
    document.querySelector('#buy-mushroom1').addEventListener('click', () => buyMushroom(10));
    document.getElementById('flowerError').classList.add('hidden');
    document.querySelector('#remove-ads').addEventListener('click', removeAds);


    setInterval(flowerTimer, 5000);
    setInterval(updateGameInfo, 6000);

    loadGameData();
}

window.onload = init;