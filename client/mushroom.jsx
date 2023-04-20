const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const shopWindow = (props) => {
    return (
        <div id="shopItems">
            <h3>Shop Items</h3>
        </div>
    );
};

const init = () => {
    console.log('mushroom.jsx')
}

window.onload = init;