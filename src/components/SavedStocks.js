import React from 'react';

import BasicStock from './BasicStock';

const SavedStocks = ({ savedStocks }) => (
    <div>
        <h2>Saved stocks</h2>
        {savedStocks.length > 0 
                ? savedStocks.map(stock => <BasicStock key={stock.iexId} stock={stock} />)
                : <p>You haven't saved any stocks!</p>
        }
    </div>
)

export default SavedStocks;
