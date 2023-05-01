const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');


const returntoHome = () => {
    console.log('button clicked')
    window.location.href = '/login';
}

const init = () => {
    const returnButton = document.querySelector('#return');
    returnButton.addEventListener('click', returntoHome);
};

window.onload = init;