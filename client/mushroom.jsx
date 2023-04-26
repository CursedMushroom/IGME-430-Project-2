const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let flowers = 0;
let petalpersec = 1;
let totalMushroom = 1;

const flowerTimer = () => {
    flowers += petalpersec;
    document.querySelector('#total-current-flowers').innerHTML = `Total Flowers: ${flowers}`;

};

const updateGameInfo = () => {
    //update curreny in server
    console.log('update game info');
    helper.sendPost('/updateGameInfo', { flowers, petalpersec, totalMushroom });
    //update petalpersec in server

    //update totalMushrooms in server

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
    document.querySelector('#ad-space').classList.add('hidden');
    document.querySelector('#shop-area').style.height = '90%';
}

const loadGameData=async()=>{
    const response= await fetch('/loadGameData');
    const data= await response.json();
    flowers=data.flowers;
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