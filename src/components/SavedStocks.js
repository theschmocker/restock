import React, { Component } from 'react';

import BasicStock from './BasicStock';

class SavedStocks extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stocks: this.getSavedStocks(),
        }
    }

    getSavedStocks = () => {
        return window.localStorage.getItem('savedStocks');
    }

    renderStocks = () => {
        console.log('woopee');
    }

    render() {
        return (
            <div>
                <h2>Saved stocks</h2>
                {this.state.stocks 
                        ? this.renderStocks()
                        : <p>You haven't saved any stocks!</p>}
            </div>
        );
    }
}

export default SavedStocks;
