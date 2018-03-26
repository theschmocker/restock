import React from 'react';

const stockIsSaved = (stock, savedStocks) => {
    const stringified = JSON.stringify(stock);
    for (let s of savedStocks) {
        if (stringified === JSON.stringify(s)) return true;
    }

    return false;
}

const SaveButton = ({ stock, savedStocks, stockMethods }) => (
    <button onClick={() => !stockIsSaved(stock, savedStocks) && stockMethods.addStock(stock)}>
        {stockIsSaved(stock, savedStocks) ? 'Saved' : 'Save'}
    </button>
);

export default SaveButton;
