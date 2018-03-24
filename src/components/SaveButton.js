import React from 'react';

function storeExists() {
    return Boolean(window.localStorage.getItem('savedStocks'));
}

function saveStock(stock) {
    const store = window.localStorage;
    if (stockIsSaved()) return;

    if (storeExists()) {
        const savedStocks = store.getItem('savedStocks');
        let stocks = JSON.parse(savedStocks);
        stocks.push(stock);
        store.setItem('savedStocks', JSON.stringify(stocks));
    } else {
        let stocks = [stock,];
        store.setItem('savedStocks', JSON.stringify(stocks));
    }
}

function stockIsSaved(stock) {
    const stocks = JSON.parse(window.localStorage.getItem('savedStocks'));
    if (Array.isArray(stocks) && stocks.includes(stock)) return true;

    return false;
}

const SaveButton = ({ stock }) => (
    <button onClick={() => !stockIsSaved() && saveStock(stock)}>
        {stockIsSaved() ? 'Saved' : 'Save'}
    </button>
);

export default SaveButton;
